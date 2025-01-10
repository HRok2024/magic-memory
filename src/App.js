import React, { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard.jsx";

//카드 이미지(public 폴더에 있음)
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

//리액트 컴포넌트
function App() {
  //useState를 사용하여 카드 상태를 관리
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0); //턴 수
  const [choiceOne, setChoiceOne] = useState(null); //첫번째 선택한 카드
  const [choiceTwo, setChoiceTwo] = useState(null); //두번째 선택한 카드
  const [disabled, setDisabled] = useState(false);
  //새 게임 시작(카드 섞기)
  const shuffleCards = () => {
    //...은 카드 배열의 모든 요소를 새 배열에 복사(총 2번 12개 카드), 속성을 풀어헤치는건가?
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  function handleChoice(card) {
    //카드 선택(이미 첫번째 선택했으면 두번째 선택에 저장)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }
  //카드 선택 후 비교하기(두 카드가 같은지 확인), [카드 선택이 변경되면]
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        console.log("틀림");
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //처음 화면이 로딩이 됐을 때 처음 게임은 자동으로 시작되도록 하는 useEffect
  useEffect(() => {
    shuffleCards();
  }, []);

  //선택한 카드를 리셋
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            key={card.id}
            card={card}
          />
        ))}
      </div>
      <p>턴수: {turns}</p>
    </div>
  );
}

export default App;
