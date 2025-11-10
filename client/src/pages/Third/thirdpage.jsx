import React from 'react';
import './thirdpage.css';

const Thirdpage = () => {
  return (
    <div className="third-main">
      <header className="page-header">
        <h1 className="main-heading">Every Drop is a Diamond</h1>
      </header>

      <section className="gallery-section">
        <div className="gallery-grid">
          <div className="gallery-item large">
            <img 
              src="black.png"
              alt="Black floral dress"
              className="gallery-image"
            />
          </div>

    
          <div className="gallery-right">
            <div className="gallery-item medium">
              <img  src="white.png" alt="Pink elegant dress" className="gallery-image"
              />
            </div>
            <div className="gallery-item medium">
              <img src="gold.png" alt="Gold vintage dress" className="gallery-image"
              />
            </div>
            <div className="gallery-item medium wide">
              <img src= "blue.png" alt="Blue embroidered dress"className="gallery-image"
              />
            </div>
          </div>
        </div>
      </section>


   
    </div>
  )
};

export default Thirdpage;