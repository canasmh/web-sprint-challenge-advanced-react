import React from 'react'
import axios from 'axios';

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      email: '',
      steps: 0,
      index: 4,
      coord: {x: 2, y: 2}
    }
  }

  getXYMessage = () => {
    return `Coordinates (${this.state.coord.x}, ${this.state.coord.y})`
  }

  reset = () => {
    this.setState({
      message: '',
      email: '',
      steps: 0,
      index: 4,
      coord: {x: 2, y: 2}
    })
  }

  getNextIndex = (direction) => {
    const x = this.state.coord.x;
    const y = this.state.coord.y;
    const steps = this.state.steps;
    const index = this.state.index;

    if (direction === "up") {
      if (y === 1) {
        this.setState({message: "You can't go up"});
      } else {
        this.setState({
          coord: {"x": x, "y": y - 1},
          message: "",
          index: index - 3,
          steps: steps + 1
        })
      }
    } else if (direction === "left") {
      if (x === 1) {
        this.setState({message: "You can't go left"})
      } else {
        this.setState({
          coord: {"x": x - 1, "y": y},
          message: "",
          index: index - 1,
          steps: steps + 1
        })
      }
    } else if (direction === "down") {
      if (y === 3) {
        this.setState({message: "You can't go down"})
      } else {
        this.setState({
          coord: {"x": x, "y": y + 1},
          message: "",
          index: index + 3,
          steps: steps + 1
        })
      }
    } else {
      if (x === 3) {
        this.setState({message: "You can't go right"})
      } else {
        this.setState({
          coord: {"x": x + 1, "y": y},
          message: "",
          index: index + 1,
          steps: steps + 1
        })
      }
    }
  }

  onChange = (evt) => {
    this.setState({email: evt.target.value});
  }

  onSubmit = async (evt) => {
    evt.preventDefault();
    const postData = {
      "x": this.state.coord.x,
      "y": this.state.coord.y,
      "steps": this.state.steps,
      "email": this.state.email
    }

    const postURL = "http://localhost:9000/api/result"
    try {
      const res = await axios.post(postURL, postData);
      this.setState({"message": res.data.message, "email": ""})
    } catch (err) {
      this.setState({"message": err.response.data.message, "email": ""})
    }
    
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage()}</h3>
          <h3 id="steps">You moved {this.state.steps} {this.state.steps === 1 ? "time" : "times"}</h3>
        </div>
        <div id="grid">
          {
            [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
              <div key={idx} className={`square${idx === this.state.index ? ' active' : ''}`}>
                {idx === this.state.index ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.getNextIndex("left")}>LEFT</button>
          <button id="up" onClick={() => this.getNextIndex("up")}>UP</button>
          <button id="right" onClick={() => this.getNextIndex("right")}>RIGHT</button>
          <button id="down" onClick={() => this.getNextIndex("down")}>DOWN</button>
          <button id="reset" onClick={() => this.reset()}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={this.onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
