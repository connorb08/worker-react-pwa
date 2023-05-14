import React from "react";

const Hero = () => {
  return (
    <div
      className="text-center min-h-screen flex flex-col justify-center"
      style={{
        backgroundImage:
          "url('https://content.connorbray.net/heroBackground/avif.avif')",
      }}
    >
      <div className="text-white" >
        <h1 className="text-2xl text-blue-300">connorbray.net</h1>
        <h2 className="text-lg">subtitle</h2>
        <p>Caption</p>
      </div>
    </div>
  );
};

export default Hero;
