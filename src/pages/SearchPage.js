import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
  const location = useLocation(); // To get the current URL query
  const navigate = useNavigate(); // For updating the URL when the search input changes
  const [data, setData] = useState([]); // Search results
  const [page, setPage] = useState(1); // Current page for infinite scroll
  const [loading, setLoading] = useState(false); // Loading state

  const query = new URLSearchParams(location.search).get("q"); // Extract 'q' query parameter

  // Fetch data from the API
  const fetchData = async () => {
    if (!query) return;

    try {
      setLoading(true); // Start loading
      const response = await axios.get(`/search.php`, {
        params: {
          search: query,
          page: page,
        },
      });
      if (response.data) {
        // Append new results to the existing ones
        setData((prev) => [...prev, ...response.data]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Reset data and fetch new results when query changes
  useEffect(() => {
    if (query) {
      setData([]); // Clear previous results
      setPage(1); // Reset to the first page
      fetchData();
    }
  }, [query]);

  // Fetch additional data when the page number changes
  useEffect(() => {
    if (query && page > 1) {
      fetchData();
    }
  }, [page]);

  // Infinite scroll handler
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !loading
    ) {
      setPage((prev) => prev + 1); // Increment page number
    }
  };

  // Attach infinite scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle input changes for the search box
  const handleInputChange = (e) => {
    const value = e.target.value;
    navigate(`/search?q=${value}`);
  };

  return (
    <div className="py-16">
      {/* Search Input */}
      <div className="lg:hidden my-2 mx-1 sticky top-[70px] z-30">
        <input
          type="text"
          placeholder="Search here..."
          onChange={handleInputChange}
          value={query || ""}
          className="px-4 py-1 text-lg w-full bg-white rounded-full text-neutral-900"
        />
      </div>

      {/* Search Results */}
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3">
          Search Results for "{query}"
        </h3>

        {data.length === 0 && !loading ? (
          <p>No results found.</p>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
            {data.map((item) => (
              <Card
                data={item}
                key={`${item.id}-${item.media_type}`}
                media_type={item.media_type}
              />
            ))}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && <p className="text-center">Loading...</p>}
      </div>
    </div>
  );
};

export default SearchPage;
