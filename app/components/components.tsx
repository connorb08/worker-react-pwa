import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div>
          <p>Home Page</p>
          <br />
          <Link to="/about">
            <button>About</button>
          </Link>
        </div>
      );
};

export const About = () => {
  return (
    <div>
      <p>About Page</p>
      <br />
      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
};
