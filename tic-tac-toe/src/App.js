import React, { Component } from 'react';
import './App.css';

import Announcement from './Announcement';
import ResetButton from './ResetButton';
import Tile from './Tile'

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [
        ' x',' o',' ',
        ' ',' ',' ',
        ' ',' ',' '
      ],
      turn: "X",
      winner: null
    }
  }

  updateBoard(loc, player) {

  }

  resetBoard(){
    this.setState({
      gameBoard: [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' '
      ],
      turn: "X",
      winner: null
    })
  }

  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1>Tic-Tac-Toe</h1>
          <Announcement winner={this.state.winner}/>
          <ResetButton reset={this.resetBoard.bind(this)}/>
        </div>
        {this.state.gameBoard.map(function(value, i){
          return (
            <Tile
              key={i}
              loc={i}
              value={value}
              updateBoard={this.updateBoard.bind(this)}
              turn={this.state.turn}
            />
          )
        }.bind(this))};
      </div>
    );
  }
}

export default App;
