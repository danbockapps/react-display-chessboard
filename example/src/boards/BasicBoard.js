import { Chessboard } from 'react-chessboard'
import { useEffect, useState } from 'react'

export default function BasicBoard({ boardWidth }) {
  const [currentArrows, setCurrentArrows] = useState([])
  const [selectedSquare, setSelectedSquare] = useState()

  const [position, setPosition] = useState(
    '1r4k1/4bp2/bqp1p1p1/p1n1P1P1/P3PB1Q/1p3BP1/5PK1/3R4 b - - 0 29',
  )

  useEffect(() => {
    setTimeout(() => {
      console.log('setting position')
      setPosition('r1b4k/p3b3/np1p1n2/1NpPp2q/QPP1Pp2/P2B1Pp1/1R2N1P1/1R4K1 b - - 5 30')
    }, 2000)
  }, [])

  return (
    <div>
      <Chessboard
        {...{ boardWidth, selectedSquare, position }}
        onTouchEnd={end => {
          const { start, color } = currentArrows[currentArrows.length - 1]
          return setCurrentArrows([
            ...currentArrows.filter((c, i) => i !== currentArrows.length - 1),
            { start, end, color },
          ])
        }}
        onTouchStart={start =>
          setCurrentArrows([...currentArrows, { start, end: '', color: getRandomColor() }])
        }
        onSquareClick={setSelectedSquare}
        customArrows={currentArrows.filter(c => c.start && c.end && c.color)}
        customSquareStyles={{ [selectedSquare]: { backgroundColor: 'mintcream' } }}
      />
    </div>
  )
}

const random0255 = () => `${Math.floor(Math.random() * 256)}`
const getRandomColor = () => `rgb(${random0255()},${random0255()},${random0255()})`
