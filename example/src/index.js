import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import BasicBoard from './boards/BasicBoard'
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
      </div>
      {getSelectedBoard()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
