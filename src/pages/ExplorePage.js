import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ExplorePage = () => {
  const { explore } = useParams(); // Get the dynamic parameter ('movie' or 'tv')
  const navigate = useNavigate(); // For navigation to detail page
  const [data, setData] = useState({}); // Fetched data grouped by sections
  const [loading, setLoading] = useState(false); // Loading state

  // Predefined genre sections
  const sections = {
    actionAdventure: "Action & Adventure",
    thrillerDrama: "Thriller & Drama",
    comedySciFi: "Comedy & Sci-Fi",
    horrorMystery: "Horror & Mystery",
    dramaRomance: "Drama & Romance",
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/gen.php`, {
        params: {
          type: explore, // Pass 'movie' or 'tv' to the backend
        },
      });

      setData(response.data); // Store grouped data
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [explore]);

  const scrollLeft = (id) => {
    const slider = document.getElementById(id);
    slider.scrollLeft -= 300;
  };

  const scrollRight = (id) => {
    const slider = document.getElementById(id);
    slider.scrollLeft += 300;
  };

  const handleCardClick = (id, mediaType) => {
    navigate(`/details/${mediaType}/${id}`); // Navigate to the detail page
  };

  return (
    <div className="py-16">
      <div className="container mx-auto">
        {loading ? (
          <p className="text-center text-white">Loading...</p>
        ) : (
          Object.entries(sections).map(([key, sectionTitle]) => (
            <div key={key} className="section-container relative">
              {data[key]?.length > 0 && (
                <>
                  <h3 className="section-title">{sectionTitle}</h3>

                  {/* Left Scroll Button */}
                  <button
                    className="scroll-btn left"
                    onClick={() => scrollLeft(`slider-${key}`)}
                  >
                    <IoIosArrowBack />
                  </button>

                  <div id={`slider-${key}`} className="slider-container">
                    {data[key]?.map((item) => (
                      <div
                        className="slider-card cursor-pointer"
                        key={`${item.id}-${key}`}
                        onClick={() => handleCardClick(item.id, explore)} // Navigate on click
                      >
                        <img
                          src={item.thumbnail_path}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded"
                        />
                        <div className="slider-card-title">{item.name}</div>
                      </div>
                    ))}
                  </div>

                  {/* Right Scroll Button */}
                  <button
                    className="scroll-btn right"
                    onClick={() => scrollRight(`slider-${key}`)}
                  >
                    <IoIosArrowForward />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
