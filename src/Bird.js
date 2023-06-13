import React from "react";
import houseBird from "./images/casaPajaros.png";

const Bird = ({ id, color, image, onClick, hiddenBird }) => {
  const casaPajaros = houseBird;
  const birdImage = hiddenBird === id ? casaPajaros : image;
  return (
    <div className={`bird ${color}`} onClick={() => onClick(id, color)}>
      <img src={birdImage} alt={`Bird (${color})`} />
    </div>
  );
};

export default Bird;
