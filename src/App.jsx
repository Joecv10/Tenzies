import "./App.css";
import { generateRandomNumber } from "./utils/functions";
import Die from "./components/Die/Die";
import { useState } from "react";
import ConfettiComponent from "./components/Confetti/Confetti";

function App() {
  const allNewDice = () =>
    [...Array(10)].map((_, index) => ({
      id: index + 1,
      number: generateRandomNumber(1, 7),
      isHeld: false,
    }));

  const [arrayNumbers, setArrayNumbers] = useState(() => allNewDice());
  const [gameWon, setGameWon] = useState(false);

  const allHeldValues = arrayNumbers.every((die) => die.isHeld);
  const setNumbers = new Set(arrayNumbers.map((die) => die.number));

  if (allHeldValues && setNumbers.size === 1 && !gameWon) {
    setGameWon(true);
  } else {
    console.log("Keep playing!");
  }

  const rollDice = (gameWon) => {
    if (!gameWon) {
      const diceHeld = arrayNumbers.filter((die) => die.isHeld);
      const arrayUpdated = arrayNumbers.map((die) => {
        const findDie = diceHeld.find((dieHeld) => dieHeld.id === die.id);
        if (findDie) {
          return { ...die };
        }
        return { ...die, number: generateRandomNumber(1, 7) };
      });
      setArrayNumbers(arrayUpdated);
    } else {
      setGameWon(false);
      setArrayNumbers(allNewDice());
    }
  };

  const holdDice = (id) => {
    // map through the array and find the one that matches the id
    const diceFound = arrayNumbers.find((die) => die.id === id);
    // map through the array and update the isHeld property of the found die
    const arrayUpdated = arrayNumbers.map((die) => {
      if (die.id === diceFound.id) {
        return { ...die, isHeld: !die.isHeld };
      }
      return die;
    });
    setArrayNumbers(arrayUpdated);
  };

  return (
    <>
      {gameWon && <ConfettiComponent />}
      <main className="container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">
          {arrayNumbers.map((die) => (
            <Die key={die.id} die={die} holdDice={holdDice} />
          ))}
        </div>
        <button className="roll-dice-button" onClick={() => rollDice(gameWon)}>
          {gameWon ? "New Game" : "Roll Dice"}
        </button>
      </main>
    </>
  );
}

export default App;
