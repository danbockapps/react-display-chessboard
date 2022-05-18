import { Chessboard } from 'react-chessboard'
import { useState } from 'react'

export default function BasicBoard({ boardWidth }) {
  const [currentArrow, setCurrentArrow] = useState()
  const [selectedSquare, setSelectedSquare] = useState()

  return (
    <div>
      <Chessboard
        {...{ boardWidth, selectedSquare }}
        onTouchEnd={s => setCurrentArrow([currentArrow[0], s])}
        onTouchMove={s => setCurrentArrow([currentArrow[0], s])}
        onTouchStart={s => setCurrentArrow([s, ''])}
        onSquareClick={setSelectedSquare}
        customArrows={currentArrow?.[0] && currentArrow?.[1] ? [currentArrow] : undefined}
        customSquareStyles={{ [selectedSquare]: { backgroundColor: 'mintcream' } }}
      />
    </div>
  )
}
