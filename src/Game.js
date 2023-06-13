import React, { useState, useEffect } from "react";
import Bird from "./Bird";
import birdBlue from "./images/aveAzul.png";
import birdPink from "./images/aveRosa.png";

const Game = () => {
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [newBirds, setNewBirds] = useState([]);
  const [scoreRosas, setScoreRosas] = useState(0);
  const [scoreAzules, setScoreAzules] = useState(0);
  const [hiddenBird, setHiddenBird] = useState(null);

  const aveAzul = birdBlue;
  const aveRosa = birdPink;

  useEffect(() => {
    if (time > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setGameOver(true);
    }
  }, [time, gameOver]);

  useEffect(() => {
    const birds = [
      { id: 1, color: "azul", image: aveAzul },
      { id: 2, color: "rosa", image: aveRosa },
    ];

    const newBirdsArray = [];
    for (let i = 0; i < 9; i++) {
      const randomIndex = Math.floor(Math.random() * birds.length);
      const selectedBird = birds[randomIndex];

      newBirdsArray.push({
        id: i + 1,
        color: selectedBird.color,
        image: selectedBird.image,
      });
    }

    setNewBirds(newBirdsArray);
  }, [time]);

  useEffect(() => {
    setScore(scoreRosas - scoreAzules);
  }, [scoreRosas, scoreAzules]);

  const handleClick = (id, birdColor) => {
    if (!gameOver) {
      if (birdColor === "rosa") {
        setScoreRosas((prevScore) => prevScore + 1);
      } else if (birdColor === "azul") {
        setScoreAzules((prevScore) => prevScore + 1);
      }
      setHiddenBird(id);
      setTimeout(() => {
        setHiddenBird(null);
      }, 2000);
    }
  };

  const renderBirds = () => {
    return newBirds?.map((bird, index) => {
      return (
        <Bird
          key={index}
          id={bird.id}
          color={bird.color}
          image={bird.image}
          onClick={handleClick}
          hiddenBird={hiddenBird}
        />
      );
    });
  };

  return (
    <div className="game-container">
      <h1 className="title">
        Dont touch bird <span className="span-blue">BLUE</span>
      </h1>
      <div className="head-score">
        <div className="score">
          Aves Rosas
          <span className={`score-rosas ${scoreRosas >= 10 ? "large" : ""}`}>
            {scoreRosas}
          </span>
        </div>
        <div className="score">
          Aves Azules
          <span className={`score-azules ${scoreAzules >= 10 ? "large" : ""}`}>
            {scoreAzules}
          </span>
        </div>
      </div>
      <div>
        <div className={`timer ${time <= 10 ? "red" : ""}`}>
          Tiempo restante:
        </div>
        <span className={`timer ${time <= 10 ? "red" : ""}`}>{time}</span>
      </div>
      {gameOver ? (
        <div className="game-over">
          <h1>Juego Terminado</h1>
          <p>Puntaje final: {score}</p>
          <button onClick={() => window.location.reload()}>
            Jugar de nuevo
          </button>
        </div>
      ) : (
        <div className="bird-container">{renderBirds()}</div>
      )}
    </div>
  );
};

export default Game;
