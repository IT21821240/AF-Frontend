import { useState } from "react";
import { motion } from "framer-motion";

import planets from "../assets/planets.jpeg";
import moon from "../assets/moon.jpeg";
import Mars from "../assets/Mars.jpeg";
import climate from "../assets/climate.jpeg";
import sky from "../assets/sky.jpeg";
import space from "../assets/space.jpeg";
import Universe from "../assets/Universe.jpeg";
import bg from "../assets/homeBg.jpeg"

const Home = () => {
    const [positionIndexes, setPositionIndexes] = useState([0, 1, 2, 3, 4, 5, 6]);

    const handleNext = () => {
      setPositionIndexes((prevIndexes) => {
        const updatedIndexes = prevIndexes.map(
          (prevIndex) => (prevIndex + 1) % positions.length
        );
        return updatedIndexes;
      });
    };
  
    const handleBack = () => {
      setPositionIndexes((prevIndexes) => {
        const updatedIndexes = prevIndexes.map(
          (prevIndex) => (prevIndex + 6) % positions.length
        );
  
        return updatedIndexes;
      });
    };
  
    const images = [planets, moon, Mars, climate, sky, space, Universe];
  
    const positions = ["center", "left1", "left2","left2", "right1", "right2", "right2"];
  
    const imageVariants = {
      center: { x: "0%", scale: 1, zIndex: 5 },
      left1: { x: "-40%", scale: 0.7, zIndex: 4 },
      left2: { x: "-80%", scale: 0.5, zIndex: 3 },
      left3: { x: "-100%", scale: 0.3, zIndex: 2 },
      right3: { x: "100%", scale: 0.3, zIndex: 1 },
      right2: { x: "80%", scale: 0.5, zIndex: 3 },
      right1: { x: "40%", scale: 0.7, zIndex: 4 },
    };
    
    return (
      <div className="flex items-center flex-col items-center justify-center h-screen relative" style={{ backgroundImage: `url(${bg})` }}>
       <h1 className="text-orange-300 text-6xl font-extrabold mb-8 absolute z-10 top-10 left-0 right-0 text-center tracking-wide">
  <span className="text-yellow-200">Space Voyage</span> !!!
      </h1>
       <div><br/><br/><br/></div>
        {images.map((image, index) => (
          <motion.img
            key={index}
            src={image}
            alt={image}
            className="rounded-[12px]"
            initial="center"
            animate={positions[positionIndexes[index]]}
            variants={imageVariants}
            transition={{ duration: 0.5 }}
            style={{ width: "40%", height: "50%", position: "absolute", zIndex: 1 }}
          />
        ))}
         <div className="absolute bottom-10 flex flex-row gap-3">
          <button
            className="text-white bg-orange-500 rounded-md py-2 px-4"
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="text-white bg-orange-500 rounded-md py-2 px-4"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

export default Home;
