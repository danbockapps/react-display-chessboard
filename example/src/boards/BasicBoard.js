import { Chessboard } from 'react-chessboard'

export default function BasicBoard({ boardWidth }) {
  return (
    <div>
      <Chessboard boardWidth={boardWidth} />
    </div>
  )
}
