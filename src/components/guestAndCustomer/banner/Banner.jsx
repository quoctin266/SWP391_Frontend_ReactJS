import React, { useState } from "react";
import styles from "./Banner.module.css";
import { useEffect } from "react";

const Carousel = ({ Images }) => {
  const images = Images;
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const nextImage = () => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImage((currentImage + 1) % images.length);
          setIsTransitioning(false);
        }, 300); // Adjust the delay time as needed
      }
    };

    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentImage, images.length, isTransitioning]);

  return (
    <div className={styles.carousel}>
      <div className={styles["image-container"]}>
        <div
          className={styles["image-slider"]}
          style={{
            transform: `translateX(-${currentImage * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={image.id} className={styles["image-wrapper"]}>
              <img
                src={`${image.src}`}
                alt={`${image.id}`}
                className={
                  parseInt(index) === parseInt(currentImage)
                    ? `${styles.active}`
                    : ""
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
