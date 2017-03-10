import React, {Component} from 'react';
import './Tile.css';

export default class Tile extends Component {
  tileClick(props) {
    console.log("click: ", props.loc, props.turn);
    props.updateBoard(props.loc, props.turn);
  }
  render() {
    return (
      <div className="parent">
        <div className={"tile " + this.props.loc} onClick={() => this.tileClick(this.props)}>
          <p>{this.props.value}</p>
        </div>
      </div>
    )
  }
}
