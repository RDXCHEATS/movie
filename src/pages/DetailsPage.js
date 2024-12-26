import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailsPage = () => {
  const { mediaType, id } = useParams(); // Extract mediaType (movie/tv) and id
  const [details, setDetails] = useState(null); // Details of the movie
  const [downloadLinks, setDownloadLinks] = useState([]); // Download links
  const [loading, setLoading] = useState(true); // Loading state

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
        `/details.php?type=${mediaType}&id=${id}` // Adjust API endpoint if necessary
      );
      setDetails(response.data.details);
      setDownloadLinks(response.data.download_links || []);
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false); // Turn off loading
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [mediaType, id]);

  if (loading) return <div>Loading...</div>; // Display loading spinner
  if (!details) return <div>No details available.</div>; // Handle missing details

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thumbnail */}
        <div>
          <img
            src={
              details.thumbnail_path.startsWith("https")
                ? details.thumbnail_path
                : `${details.thumbnail_path}` // Handle relative paths
            }
            alt={details.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{details.name}</h1>
          <p className="mb-2"><strong>Stars:</strong> {details.stars}</p>
          <p className="mb-2"><strong>Genres:</strong> {details.genres}</p>
          <p className="mb-2"><strong>Language:</strong> {details.language}</p>
          <p className="mb-2"><strong>Quality:</strong> {details.quality}</p>
          <p className="mb-4"><strong>Description:</strong> {details.description}</p>

          {/* Download Links */}
          <h2 className="text-xl font-bold mb-4">Download Links</h2>
          <div className="download-buttons" >
            {downloadLinks.length > 0 ? (
              downloadLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-2 text-blue-500 hover:underline"
                >
                  {link.quality} - Download
                </a>
              ))
            ) : (
              <p>No download links available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
