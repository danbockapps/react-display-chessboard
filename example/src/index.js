import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import BasicBoard from './boards/BasicBoard'
import ClickToMove from './boards/ClickToMove'
import PlayVsPlay from './boards/PlayVsPlay'
import RandomVsRandom from './boards/RandomVsRandom'
import SquareStyles from './boards/SquareStyles'
import StyledBoard from './boards/StyledBoard'

import './index.css'

function App() {
  const [chessboardSize, setChessboardSize] = useState(undefined)
  const [selectedBoard, setSelectedBoard] = useState('BasicBoard')

  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName('container')[0]
      setChessboardSize(display.offsetWidth - 20)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function getSelectedBoard() {
    switch (selectedBoard) {
      case 'BasicBoard':
        return (
          <>
            <h2>Basic Board</h2>
            <BasicBoard boardWidth={chessboardSize} />
            <br />
          </>
        )
      case 'ClickToMove':
        return (
          <>
            <h2>Click to Move</h2>
            <ClickToMove boardWidth={chessboardSize} />
            <br />
          </>
        )
      case 'RandomVsRandom':
        return (
          <>
            <h2>Random vs Random</h2>
            <RandomVsRandom boardWidth={chessboardSize} />
            <br />
          </>
        )
      case 'PlayVsPlay':
        return (
          <>
            <h2>Play vs Play</h2>
            <PlayVsPlay boardWidth={chessboardSize} />
            <br />
          </>
        )
      case 'SquareStyles':
        return (
          <>
            <h2>Move Options, Highlight Moves, and Right Click</h2>
            <SquareStyles boardWidth={chessboardSize} />
            <br />
          </>
        )
      case 'StyledBoard':
        return (
          <>
            <h2>Styled Board</h2>
            <StyledBoard boardWidth={chessboardSize} />
            <br />
          </>
        )
    }
  }

  return (
    <div className='container'>
      <h1>react-chessboard examples</h1>
      <div className='button-container'>
        <button
          className={`rc-button ${selectedBoard === 'BasicBoard' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedBoard(null)
            setTimeout(() => setSelectedBoard('BasicBoard'), 10)
          }}
        >
          Basic Board
        </button>
        <button
          className={`rc-button ${selectedBoard === 'ClickToMove' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedBoard(null)
            setTimeout(() => setSelectedBoard('ClickToMove'), 10)
          }}
        >
          Click to Move
        </button>
        <button
          className={`rc-button ${selectedBoard === 'RandomVsRandom' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedBoard(null)
            setTimeout(() => setSelectedBoard('RandomVsRandom'), 10)
          }}
        >
          Random Vs Random
        </button>
        <button
          className={`rc-button ${selectedBoard === 'PlayVsPlay' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedBoard(null)
            setTimeout(() => setSelectedBoard('PlayVsPlay'), 10)
          }}
        >
          Play Vs Play
        </button>
        <button
          className={`rc-button ${selectedBoard === 'SquareStyles' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedBoard(null)
            setTimeout(() => setSelectedBoard('SquareStyles'), 10)
          }}
        >
          Styled Squares
        </button>
        <button
          className={`rc-button ${selectedBoard === 'StyledBoard' ? 'selected' : ''}`}
          onClick={() => {
            setSelectedBoard(null)
            setTimeout(() => setSelectedBoard('StyledBoard'), 10)
          }}
        >
          Styled Board
        </button>
      </div>
      {getSelectedBoard()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
