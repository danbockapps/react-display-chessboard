import { Chessboard } from 'react-chessboard'

export default function BasicBoard({ boardWidth }) {
  return (
    <div>
      <Chessboard
        boardWidth={boardWidth}
        onTouchEnd={s => console.log('onTouchEnd', s)}
        onTouchStart={s => console.log('onTouchStart', s)}
      />
    </div>
  )
}
