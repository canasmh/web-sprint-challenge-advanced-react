import React, { useState } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {

  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [steps, setSteps] = useState(0)
  const [index, setIndex] = useState(4) 
  const [coord, setCoord] = useState({x: 2, y: 2})

  function getXYMessage() {
    return `Coordinates (${coord.x}, ${coord.y})`
  }

  function reset() {
    setIndex(4);
    setSteps(0);
    setCoord({x: 2, y: 2})
    setMessage("");
    setEmail("");
  }

  function getNextIndex(direction) {
    const x = coord.x;
    const y = coord.y;

    if (direction === "up") {
      if (y === 1) {
        setMessage("You can't go up");
      } else {
        setCoord({...coord, "y": y - 1})
        setMessage("");
        setIndex(index - 3);
        setSteps(steps + 1);
      }
    } else if (direction === "left") {
      if (x === 1) {
        setMessage("You can't go left");
      } else {
        setCoord({...coord, "x": x - 1});
        setMessage("");
        setIndex(index - 1);
        setSteps(steps + 1);
      }
    } else if (direction === "down") {
      if (y === 3) {
        setMessage("You can't go down");
      } else {
        setCoord({...coord, "y": y + 1});
        setMessage("");
        setIndex(index + 3);
        setSteps(steps + 1);
      }
    } else {
      if (x === 3) {
        setMessage("You can't go right");
      } else {
        setCoord({...coord, "x": x + 1})
        setMessage("");
        setIndex(index + 1);
        setSteps(steps + 1);
      }
    }
  }

  function onChange(evt) {
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => getNextIndex("left")}>LEFT</button>
        <button id="up" onClick={() => getNextIndex("up")}>UP</button>
        <button id="right" onClick={() => getNextIndex("right")}>RIGHT</button>
        <button id="down" onClick={() => getNextIndex("down")}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
