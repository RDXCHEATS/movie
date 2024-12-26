import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import Loading from "../components/Loading"; // Import the Loading component

const Home = () => {
  const [categories, setCategories] = useState([]); // Categories data from the API
  const [loading, setLoading] = useState(true); // Loading state

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/fetch.php"); // API endpoint
      setCategories(response.data); // Set categories from API response
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  if (loading) return <Loading />; // Show the loading spinner while fetching data

  if (categories.length === 0)
    return <div className="text-center text-white">No categories available.</div>; // Handle empty state

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {categories.map((category, index) => (
        <div key={index} className="mb-8">
          {/* Display Category Title */}
          <h2 className="text-2xl font-bold text-white mb-4">
            {category.category_name}
          </h2>

          {/* Horizontal Scroll for Movies */}
          {category.movies && category.movies.length > 0 && (
            <Slider {...sliderSettings} className="movie-slider">
              {category.movies.map((movie) => (
                <div key={movie.id}>
                  <HorizontalScrollCard
                    data={[movie]}
                    // heading={`${category.category_name}`}
                    mediaType="movie"
                  />
                </div>
              ))}
            </Slider>
          )}

          {/* Horizontal Scroll for TV Shows */}
          {category.tv_shows && category.tv_shows.length > 0 && (
            <Slider {...sliderSettings} className="tv-slider">
              {category.tv_shows.map((show) => (
                <div key={show.id}>
                  <HorizontalScrollCard
                    data={[show]}
                    // heading={`${category.category_name}`}
                    mediaType="tv"
                  />
                </div>
              ))}
              
            </Slider>
             
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "movie" },
  { label: "TV Shows", href: "/tv" },
];
