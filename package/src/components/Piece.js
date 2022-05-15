import React, { useEffect, useState } from 'react';
import { useChessboard } from '../context/chessboard-context';

export function Piece({ piece, square, squares }) {
  const {
    animationDuration,
    boardWidth,
    onPieceClick,
    chessPieces,
    positionDifferences,
    waitingForAnimation,
    currentPosition
  } = useChessboard();

  const [pieceStyle, setPieceStyle] = useState({
    opacity: 1,
    zIndex: 5,
    touchAction: 'none'
  });

  // new move has come in
  // if waiting for animation, then animation has started and we can perform animation
  // we need to head towards where we need to go, we are the source, we are heading towards the target
  useEffect(() => {
    const removedPiece = positionDifferences.removed?.[square];
    // return as null and not loaded yet
    if (!positionDifferences.added) return;
    // check if piece matches or if removed piece was a pawn and new square is on 1st or 8th rank (promotion)
    const newSquare = Object.entries(positionDifferences.added).find(
      ([s, p]) => p === removedPiece || (removedPiece?.[1] === 'P' && (s[1] === '1' || s[1] === '8'))
    );
    // we can perform animation if our square was in removed, AND the matching piece is in added
    if (waitingForAnimation && removedPiece && newSquare) {
      const { sourceSq, targetSq } = getSquareCoordinates(square, newSquare[0]);
      if (sourceSq && targetSq) {
        setPieceStyle((oldPieceStyle) => ({
          ...oldPieceStyle,
          transform: `translate(${targetSq.x - sourceSq.x}px, ${targetSq.y - sourceSq.y}px)`,
          transition: `transform ${animationDuration}ms`,
          zIndex: 6
        }));
      }
    }
  }, [positionDifferences]);

  // translate to their own positions (repaint on undo)
  useEffect(() => {
    const { sourceSq } = getSingleSquareCoordinates(square);
    if (sourceSq) {
      setPieceStyle((oldPieceStyle) => ({
        ...oldPieceStyle,
        transform: `translate(${0}px, ${0}px)`,
        transition: `transform ${0}ms`
      }));
    }
  }, [currentPosition]);

  function getSingleSquareCoordinates(square) {
    return { sourceSq: squares[square] };
  }

  function getSquareCoordinates(sourceSquare, targetSquare) {
    return {
      sourceSq: squares[sourceSquare],
      targetSq: squares[targetSquare]
    };
  }

  return (
    <div onClick={() => onPieceClick(piece)} style={pieceStyle}>
      {typeof chessPieces[piece] === 'function' ? (
        chessPieces[piece]({
          squareWidth: boardWidth / 8,
          droppedPiece: dropTarget?.piece,
          targetSquare: dropTarget?.target,
          sourceSquare: dropTarget?.source
        })
      ) : (
        <svg viewBox={'1 1 43 43'} width={boardWidth / 8} height={boardWidth / 8}>
          <g>{chessPieces[piece]}</g>
        </svg>
      )}
    </div>
  );
}
