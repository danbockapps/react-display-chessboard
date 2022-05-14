import { useRef, useState } from 'react'
import Chess from 'chess.js'

import { Chessboard } from 'react-chessboard'

export default function StyledBoard({ boardWidth }) {
  const chessboardRef = useRef()
  const [game, setGame] = useState(new Chess())

  function safeGameMutate(modify) {
    setGame(g => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  const pieces = ['wP', 'wN', 'wB', 'wR', 'wQ', 'wK', 'bP', 'bN', 'bB', 'bR', 'bQ', 'bK']
  const customPieces = () => {
    const returnPieces = {}
    pieces.map(p => {
      returnPieces[p] = ({ squareWidth }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(/media/${p}.png)`,
            backgroundSize: '100%',
          }}
        />
      )
      return null
    })
    return returnPieces
  }

  return (
    <div>
      <Chessboard
        animationDuration={200}
        boardOrientation='black'
        boardWidth={boardWidth}
        position={game.fen()}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
        customDarkSquareStyle={{ backgroundColor: '#779952' }}
        customLightSquareStyle={{ backgroundColor: '#edeed1' }}
        customPieces={customPieces()}
        ref={chessboardRef}
      />
      <button
        className='rc-button'
        onClick={() => {
          safeGameMutate(game => {
            game.reset()
          })
        }}
      >
        reset
      </button>
      <button
        className='rc-button'
        onClick={() => {
          safeGameMutate(game => {
            game.undo()
          })
        }}
      >
        undo
      </button>
    </div>
  )
}
