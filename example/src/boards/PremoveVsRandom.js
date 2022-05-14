import { useRef, useState } from 'react'
import Chess from 'chess.js'

import { Chessboard } from 'react-chessboard'

export default function PremoveVsRandom({ boardWidth }) {
  const [game, setGame] = useState(new Chess())
  const [currentTimeout, setCurrentTimeout] = useState(undefined)
  const chessboardRef = useRef()

  function safeGameMutate(modify) {
    setGame(g => {
      const update = { ...g }
      modify(update)
      return update
    })
  }

  function makeRandomMove() {
    const possibleMoves = game.moves()

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return

    const randomIndex = Math.floor(Math.random() * possibleMoves.length)
    safeGameMutate(game => {
      game.move(possibleMoves[randomIndex])
    })
  }

  return (
    <div>
      <Chessboard
        animationDuration={200}
        arePremovesAllowed={true}
        boardWidth={boardWidth}
        position={game.fen()}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
        }}
        ref={chessboardRef}
      />
      <button
        className='rc-button'
        onClick={() => {
          safeGameMutate(game => {
            game.reset()
          })
          // clear premove queue
          chessboardRef.current.clearPremoves()
          // stop any current timeouts
          clearTimeout(currentTimeout)
        }}
      >
        reset
      </button>
      <button
        className='rc-button'
        onClick={() => {
          // undo twice to undo computer move too
          safeGameMutate(game => {
            game.undo()
            game.undo()
          })
          // clear premove queue
          chessboardRef.current.clearPremoves()
          // stop any current timeouts
          clearTimeout(currentTimeout)
        }}
      >
        undo
      </button>
    </div>
  )
}
