import React, { useEffect, useState } from "react";
import socket from "./socket";

function App() {
  const [hand, setHand] = useState([]);
  const [gameState, setGameState] = useState(null);

  useEffect(() => {
    socket.emit("joinGame", { room: "room1" });

    socket.on("gameUpdate", (state) => {
      setGameState(state);
    });

    socket.on("yourHand", (cards) => {
      setHand(cards);
    });

    return () => {
      socket.off("gameUpdate");
      socket.off("yourHand");
    };
  }, []);

  const playCard = (card) => {
    socket.emit("playCard", { card });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>UNO</h1>
      <h2>Your Hand</h2>
      <div style={{ display: "flex", gap: 10 }}>
        {hand.map((card, idx) => (
          <button
            key={idx}
            onClick={() => playCard(card)}
            style={{
              padding: "10px",
              border: "1px solid black",
              backgroundColor: card.color,
              color: "white",
              borderRadius: "5px",
            }}
          >
            {card.value}
          </button>
        ))}
      </div>
      {gameState && <p>Total Players: {Object.keys(gameState.players).length}</p>}
    </div>
  );
}

export default App;
