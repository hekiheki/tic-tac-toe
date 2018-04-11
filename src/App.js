import React, { Component } from 'react';
import Square from './Square';
import { calculateNextPos, calculateWinner } from './units'

class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(3).fill(Array(3).fill('e')),
      xIsNext: true,
      howToWin: [],
      isWin: false
    }
  }
  handleClick(i,j){
    const squares = this.state.squares.slice()
    const xIsNext = this.state.xIsNext ? 'x' : 'o'
    const newSquares = squares.map((items,x) => {
      return x===i ? items.map((item,y) => y===j ? xIsNext : item) : items
    })
    const isWin = calculateWinner(newSquares.reduce((prev,next) => prev.concat(next)))
    if(this.state.isWin || squares[i][j] !== 'e') return
    this.setState({
      squares: newSquares,
      xIsNext: !this.state.xIsNext,
      howToWin: calculateNextPos(xIsNext,newSquares),
      isWin: isWin
    })
  }
  render() {
    const { squares, xIsNext, howToWin, isWin } = this.state
    const nextPlayer = xIsNext ? 'x' : 'o'
    const winner = !xIsNext ? 'x' : 'o'
    const text = isWin ? `Winner: ${winner} ` : `Next Player: ${nextPlayer}, My Next Position: [${howToWin}]`
    return (
      <div className="App">
        <div>{text}</div>
        <div>
        {
          squares.map((row,i) => 
            <div key={i}>
              {
                row.map((item,j) => <Square key={j} onClick={this.handleClick.bind(this,i,j)} value={item} />)
              }
            </div>
          )
        }
        </div>
      </div>
    );
  }
}

export default App;
