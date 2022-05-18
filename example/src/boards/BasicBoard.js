import { Chessboard } from 'react-chessboard'
import { useState } from 'react'

export default function BasicBoard({ boardWidth }) {
  const [currentArrow, setCurrentArrow] = useState()

  return (
    <div>
      <Chessboard
        boardWidth={boardWidth}
        onTouchEnd={s => setCurrentArrow([currentArrow[0], s])}
        onTouchMove={s => setCurrentArrow([currentArrow[0], s])}
        onTouchStart={s => setCurrentArrow([s, ''])}
        customArrows={currentArrow?.[0] && currentArrow?.[1] ? [currentArrow] : undefined}
      />
    </div>
  )
}
