import React, { useEffect, useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';


function App() {

  const [newDice, setNewDice] = useState(allNewDice())
  const [tenzies, setIsTenzies] = useState(false)

  useEffect(() => {
    const holdDice = newDice.every(die => die.isHeld)
    const firstDice = newDice[0].value
    const allSameDice = newDice.every(die => die.value === firstDice)
    if (holdDice && allSameDice) {
      setIsTenzies(true)
      console.log('Tenzies!')
    }
  }, [newDice])

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    }
  }
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
   }
    return newDice
  }

  function rollAllDice() {
    setNewDice(oldDice => oldDice.map((die) => {
      if (die.isHeld) {
        return die
      } else {
        return generateNewDie()
      }}
    ))
  }

  function holdDice(id) {
    const updatedDice = newDice.map((die) => {
      if (die.id === id) {
        return {
          ...die,
          isHeld: !die.isHeld
        }
      }
      return die
    })
    setNewDice(updatedDice)
  }

  const diceElements = newDice.map((die) =>  (
    <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))

  function newPartie() {
    return (
    setIsTenzies(false),
    setNewDice(allNewDice)
    )
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
       {tenzies && <Confetti />}
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
       {diceElements}
      </div>
      <button onClick={tenzies ? newPartie : rollAllDice}>{tenzies ? "New partie" : "Roll dice"}</button>
    </main>
  );
}

export default App;
