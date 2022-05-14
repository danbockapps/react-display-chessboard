import { useRef, useState } from 'react'
import Chess from 'chess.js'

import { Chessboard } from 'react-chessboard'

export default function PlayVsPlay({ boardWidth }) {
  const [game, setGame] = useState(new Chess())

  function safeGameMutate(modify) {
    setGame(g => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  return (
    <div>
      <Chessboard
        animationDuration={200}
        boardWidth={boardWidth}
        position={game.fen()}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
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
