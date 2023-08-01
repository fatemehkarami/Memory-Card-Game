import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Card.css";

const Card = () => {
  const cardData = [
    {
      name: "helmet",
      src: "/images/helmet.png",
    },
    {
      name: "potion",
      src: "/images/potion.png",
    },
    {
      name: "ring",
      src: "/images/ring.png",
    },
    {
      name: "scroll",
      src: "/images/scroll.png",
    },
    {
      name: "shield",
      src: "/images/shield.png",
    },
    {
      name: "sword",
      src: "/images/sword.png",
    },
  ];

  const shuffleCards = (cardData) => {
    const duplicatedCards = [...cardData, ...cardData];
    duplicatedCards.sort(() => Math.random() - 0.5);
    return duplicatedCards.map((card) => ({
      ...card,
      rotated: false,
      id: uuidv4(),
    }));
  };

  const [cards, setCards] = useState(shuffleCards(cardData));
  const [selectedcards, setSelectedcards] = useState([]);
  const [moves, setMoves] = useState(0);

  const handleSelectCard = (index) => {
    if (selectedcards.length === 0) {
      rotateCard(index);
      setSelectedcards([index]);
      setMoves((prevMoves) => prevMoves + 1);
    } else if (selectedcards.length === 1) {
      rotateCard(index);
      setSelectedcards((prevSelectedCards) => [...prevSelectedCards, index]);
      if (cards[selectedcards[0]].name === cards[index].name) {
        setMoves((prevMoves) => prevMoves + 1);
        setSelectedcards([]);
      } else {
        setMoves((prevMoves) => prevMoves + 1);
        setTimeout(() => {
          rotateCard(selectedcards[0]);
          rotateCard(index);
          setSelectedcards([]);
        }, 1000);
      }
    } else {
      setSelectedcards([]);
      return;
    }

    console.log(moves);
  };

  const rotateCard = (index) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      updatedCards[index] = {
        ...updatedCards[index],
        rotated: !updatedCards[index].rotated,
      };
      return updatedCards;
    });
  };

  const handleShuffleClick = () => {
    setCards(shuffleCards(cardData));
    setSelectedcards([]);
    setMoves(0);
  };

  return (
    <div>
      <div className="header">
        <div className="title">Memory Game</div>
        <button onClick={handleShuffleClick}>Shuffle Cards</button>
      </div>

      <div className="cards-container">
        <div className="cards">
          {cards.map((card, index) => (
            <div
              className={`card ${card.rotated ? "rotated" : ""}`}
              key={card.id}
              onClick={() => handleSelectCard(index)}
            >
              {card.rotated ? (
                <img src={card.src} />
              ) : (
                <img src="/images/cover.png" />
              )}
            </div>
          ))}
        </div>
        <div className="moves">moves: {moves}</div>
      </div>
    </div>
  );
};

export default Card;
