import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
