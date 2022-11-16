import React from 'react'

export default class AppClass extends React.Component {
  constructor() {
    super(props);
    this.state = {
      message: '',
      email: '',
      steps: '',
      index: '',
      coord: {x: 2, y: 2}
    }
  }

  getXYMessage = () => {
    return `Coordinates (${coord.x}, ${coord.y})`
  }

  reset = () => {
    this.setState({
      message: '',
      email: '',
      steps: '',
      index: '',
      coord: {x: 2, y: 2}
    })
  }

  getNextIndex = (direction) => {
    const x = this.state.coord.x;
    const y = this.state.coord.y;

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

  move = (evt) => {
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  onChange = (evt) => {
    this.setState({email: evt.target.value});
  }

  onSubmit = (evt) => {
    // Use a POST request to send a payload to the server.
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXY()}</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
                {idx === 4 ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.getNextIndex("left")}>LEFT</button>
          <button id="up" onClick={() => this.getNextIndex("up")}>UP</button>
          <button id="right" onClick={() => this.getNextIndex("right")}>RIGHT</button>
          <button id="down" onClick={() => this.getNextIndex("down")}>DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email" onChange={onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
