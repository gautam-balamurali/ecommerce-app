import React, { useEffect, useRef } from "react";
import "./SlideshowImages.css";
import { Link } from "react-router-dom";

const SlideshowImages = ({ images }) => {
  const imgContainerRef = useRef(null);

  useEffect(() => {
    const imgContainer = imgContainerRef.current;
    let currentIndex = 0;

    const transitionImages = () => {
      imgContainer.style.backgroundImage = `url(${images[currentIndex]})`;
      currentIndex = (currentIndex + 1) % images.length;
    };

    transitionImages();
    const interval = setInterval(transitionImages, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);

  return (
    <div className="overlay">
      <div className="slideshow-container">
        <div className="img-container" ref={imgContainerRef}></div>
        <div className="slideshow-text-content-wrapper">
          <div className="slideshow-text-content">
            <h2>Get 25% off on your first order!</h2>
            <p>Unleash Your Cricket Craze with Cricify!</p>
            <Link className="nav-link" to={"/products"}>
              <button className="shop-now-btn">Shop Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowImages;
