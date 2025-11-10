import React from 'react'
import './homepage.css'
import Navbar from "../Navbar/navbar.jsx";



const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="homepage-main">
        <div className="text">
          <h1>Every Day Is A New Drop</h1>
          <p>
            Slow fashion. Unique style. Discover our curated collection of quality clothes,
            giving the most beautiful pieces a second life.
          </p>
        </div>
      </div>
    </>
  );
};

export default Homepage;
