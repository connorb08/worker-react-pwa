import React from "react";
import { createRoot } from "react-dom/client";
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <div>
          <p>Home Page</p>
          <br />
          <Link to="/about" reloadDocument={false}>
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
      <Link to="/home" reloadDocument={false}>
        <button>Home</button>
      </Link>
    </div>
  );
};
