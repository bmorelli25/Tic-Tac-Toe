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
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' '
      ],
      turn: "x",
      winner: null
    }
  }

  updateBoard(loc, player) {
    if(this.state.gameBoard[loc] === 'x' || this.state.gameBoard[loc] === 'o' || this.state.winner){
      //box already taken, so just return.
      return;
    }

    let currentGameBoard = this.state.gameBoard;
    currentGameBoard.splice(loc,1,this.state.turn);
    this.setState({gameBoard: currentGameBoard});

    if (
      (currentGameBoard[0] === this.state.turn && currentGameBoard[1] === this.state.turn && currentGameBoard[2] === this.state.turn) ||
      (currentGameBoard[3] === this.state.turn && currentGameBoard[4] === this.state.turn && currentGameBoard[5] === this.state.turn) ||
      (currentGameBoard[6] === this.state.turn && currentGameBoard[7] === this.state.turn && currentGameBoard[8] === this.state.turn) ||
      (currentGameBoard[0] === this.state.turn && currentGameBoard[3] === this.state.turn && currentGameBoard[6] === this.state.turn) ||
      (currentGameBoard[1] === this.state.turn && currentGameBoard[4] === this.state.turn && currentGameBoard[7] === this.state.turn) ||
      (currentGameBoard[2] === this.state.turn && currentGameBoard[5] === this.state.turn && currentGameBoard[8] === this.state.turn) ||
      (currentGameBoard[0] === this.state.turn && currentGameBoard[4] === this.state.turn && currentGameBoard[8] === this.state.turn) ||
      (currentGameBoard[2] === this.state.turn && currentGameBoard[4] === this.state.turn && currentGameBoard[6] === this.state.turn)
      ) {
        this.setState({winner: this.state.turn});
        return;
      }

      let moves = this.state.gameBoard.join('').replace(/ /g,'');
      if(moves.length === 9){
        this.setState({winner: 'd'});
      }
      this.setState({turn: (this.state.turn === 'x') ? 'o' : 'x'});
  }

  resetBoard(){
    this.setState({
      gameBoard: [
        ' ',' ',' ',
        ' ',' ',' ',
        ' ',' ',' '
      ],
      turn: "x",
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
