import React, { useState } from 'react';
import './App.css';
import Die from './Die';
import { nanoid } from 'nanoid';


function App() {
  const [newDice, setNewDice] = useState(allNewDice())
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      })
   }
    return newDice
  }
const diceElements = newDice.map((die) =>  (
  <Die key={die.id} value={die.value}/>
  ))

function rollAllDice() {
  setNewDice(allNewDice())
}


  return (
    <main>
      <div className="dice-container">
       {diceElements}
      </div>
      <button onClick={rollAllDice}>Roll Dice</button>
    </main>
  );
}

export default App;
