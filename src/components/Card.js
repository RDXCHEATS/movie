import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data, media_type }) => {
  return (
    <div className="card">
      <Link to={`/details/${media_type}/${data.id}`}>
        <img
          src={
            data.thumbnail_path.startsWith("http")
              ? data.thumbnail_path
              : `http://localhost${data.thumbnail_path.replace("..", "")}`
          }
          alt={data.name}
          className="w-full h-60 object-cover rounded"
          onError={(e) => {
            e.target.src = "http://localhost/uploads/default.jpg"; // Fallback image
          }}
        />
        <h3 className="text-white mt-2 text-center text-sm">{data.name}</h3>
        <p className="text-gray-400 text-sm text-center">
          {media_type === "movie" ? "Movie" : "TV Show"}
        </p>
      </Link>
    </div>
  );
};

export default Card;
