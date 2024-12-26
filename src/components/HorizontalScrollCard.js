import React from "react";
import { Link } from "react-router-dom";

const HorizontalScrollCard = ({ data, heading, mediaType }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="horizontal-scroll-section my-8">
      <h2 className="text-xl font-bold text-white mb-4">{heading}</h2>
      <div className="horizontal-scroll flex overflow-x-auto gap-4">
        {data.map((item) => (
          <Link
          to={`/details/${mediaType}/${item.id}`} // Correct route
          key={item.id}
          className="card flex-shrink-0 w-36"
        >
          <img
            src={
              item.thumbnail_path.startsWith("http")
                ? item.thumbnail_path
                : `http://localhost${item.thumbnail_path}`
            }
            alt={item.name}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h3 className="text-white mt-2 text-center text-sm">{item.name}</h3>
        </Link>
        
        ))}
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
