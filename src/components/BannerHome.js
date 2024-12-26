import React from 'react';

const BannerHome = ({ data }) => {
  if (!data) return null;

  return (
    <div className="banner" style={{ backgroundImage: `url(${data.thumbnail_path})` }}>
      <div className="banner-content">
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <button>Watch Now</button>
      </div>
    </div>
  );
};

export default BannerHome;
