import React, { Fragment, useState, useRef, useEffect } from 'react';

import { getRelativeCoords } from '../functions';
import { Notation } from './Notation';
import { Piece } from './Piece';
import { Square } from './Square';
import { Squares } from './Squares';
import { useChessboard } from '../context/chessboard-context';
import { WhiteKing } from './ErrorBoundary';
import { COLUMNS } from '../consts';

export function Board() {
  const boardRef = useRef();
  const [squares, setSquares] = useState({});
  const [rect, setRect] = useState();

  const {
    arrows,
    boardOrientation,
    boardWidth,
    clearCurrentRightClickDown,
    customArrowColor,
    showBoardNotation,
    currentPosition,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  } = useChessboard();

  //TODO see if this is doing anything
  useEffect(() => {
    function handleClickOutside(event) {
      if (boardRef.current && !boardRef.current.contains(event.target)) {
        clearCurrentRightClickDown();
      }
    }

    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  const getSquare = (e) => {
    const relativeX = e.changedTouches[0].clientX - rect.left;
    const relativeY = e.changedTouches[0].clientY - rect.top;
    const col = Math.floor((relativeX * 8) / boardWidth);
    const row = Math.floor((relativeY * 8) / boardWidth);
    return boardOrientation === 'black' ? `${COLUMNS[7 - col]}${row + 1}` : `${COLUMNS[col]}${8 - row}`;
  };

  return boardWidth ? (
    <div
      ref={(r) => {
        const newRect = r?.getBoundingClientRect();
        if (
          newRect?.top !== rect?.top ||
          newRect?.bottom !== rect?.bottom ||
          newRect?.left !== rect?.left ||
          newRect?.right !== rect?.right
        )
          setRect(r?.getBoundingClientRect());
      }}
      style={{ position: 'relative' }}
      onTouchStart={(e) => onTouchStart?.(getSquare(e))}
      onTouchMove={(e) => onTouchMove?.(getSquare(e))}
      onTouchEnd={(e) => onTouchEnd?.(getSquare(e))}
    >
      <Squares>
        {({ square, squareColor, col, row }) => {
          return (
            <Square key={`${col}${row}`} square={square} squareColor={squareColor} setSquares={setSquares}>
              {currentPosition[square] && <Piece piece={currentPosition[square]} square={square} squares={squares} />}
              {showBoardNotation && <Notation row={row} col={col} />}
            </Square>
          );
        }}
      </Squares>
      <svg
        width={boardWidth}
        height={boardWidth}
        style={{ position: 'absolute', top: '0', left: '0', pointerEvents: 'none', zIndex: '10' }}
      >
        {arrows.map((arrow) => {
          const from = getRelativeCoords(boardOrientation, boardWidth, arrow[0]);
          const to = getRelativeCoords(boardOrientation, boardWidth, arrow[1]);

          return (
            <Fragment key={`${arrow[0]}-${arrow[1]}`}>
              <defs>
                <marker id="arrowhead" markerWidth="2" markerHeight="2.5" refX="1.25" refY="1.25" orient="auto">
                  <polygon points="0 0, 2 1.25, 0 2.5" style={{ fill: customArrowColor }} />
                </marker>
              </defs>
              <line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{ stroke: customArrowColor, strokeWidth: boardWidth / 36 }}
                markerEnd="url(#arrowhead)"
              />
            </Fragment>
          );
        })}
      </svg>
    </div>
  ) : (
    <WhiteKing />
  );
}
