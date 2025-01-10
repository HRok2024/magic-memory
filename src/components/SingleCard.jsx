//rapce+Tab 화살표함수로 컴포넌트 생성
import React from "react";
import "./SingleCard.css";

const SingleCard = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          onClick={handleClick}
          className="back"
          src="/img/cover.png"
          alt="card-back"
        />
      </div>
    </div>
  );
};

export default SingleCard;
