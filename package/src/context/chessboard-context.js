import React, { forwardRef, useContext, useEffect, useRef, useState } from 'react';

import { defaultPieces } from '../media/pieces';
import { convertPositionToObject, getPositionDifferences, isDifferentFromStart } from '../functions';

// add arrows - https://stackoverflow.com/questions/25527902/drawing-arrows-on-a-chess-board-in-javascript
// add other things from chessground
// change board orientation to 'w' or 'b'? like used in chess.js?

// keep onSquareClick, but add onPieceClick to send both square and piece
// this is because in the current ClickToMove example, if blacks turn to move, you can click on a White piece and then on a black piece thats out of reach, and it will try to make the move and then reset firstClick

// try DisplayBoard again

export const ChessboardContext = React.createContext();

export const useChessboard = () => useContext(ChessboardContext);

export const ChessboardProvider = forwardRef(
  (
    {
      animationDuration,
      areArrowsAllowed,
      boardOrientation,
      boardWidth,
      customArrows,
      customArrowColor,
      customBoardStyle,
      customDarkSquareStyle,
      customLightSquareStyle,
      customPieces,
      customSquareStyles,
      getPositionObject,
      onMouseOutSquare,
      onMouseOverSquare,
      onPieceClick,
      onSquareClick,
      onSquareRightClick,
      position,
      showBoardNotation,
      showSparePieces,
      snapToCursor,
      children
    },
    ref
  ) => {
    // position stored and displayed on board
    const [currentPosition, setCurrentPosition] = useState(convertPositionToObject(position));

    // calculated differences between current and incoming positions
    const [positionDifferences, setPositionDifferences] = useState({});

    // colour of last piece moved to determine if premoving
    const [lastPieceColour, setLastPieceColour] = useState(undefined);

    // current right mouse down square
    const [currentRightClickDown, setCurrentRightClickDown] = useState();
    // current arrows
    const [arrows, setArrows] = useState([]);

    // chess pieces/styling
    const [chessPieces, setChessPieces] = useState({ ...defaultPieces, ...customPieces });

    // the most recent timeout whilst waiting for animation to complete
    const [previousTimeout, setPreviousTimeout] = useState(undefined);

    // if currently waiting for an animation to finish
    const [waitingForAnimation, setWaitingForAnimation] = useState(false);

    // handle custom pieces change
    useEffect(() => {
      setChessPieces({ ...defaultPieces, ...customPieces });
    }, [customPieces]);

    // handle external position change
    useEffect(() => {
      const newPosition = convertPositionToObject(position);
      const differences = getPositionDifferences(currentPosition, newPosition);
      const newPieceColour =
        Object.keys(differences.added)?.length <= 2 ? Object.entries(differences.added)?.[0]?.[1][0] : undefined;

      // external move has come in before animation is over
      // cancel animation and immediately update position
      if (waitingForAnimation) {
        setCurrentPosition(newPosition);
        setWaitingForAnimation(false);
        if (previousTimeout) {
          clearTimeout(previousTimeout);
        }
      } else {
        // move was made using drag and drop
      }

      // inform latest position information
      getPositionObject(newPosition);
      // clear arrows
      clearArrows();

      // clear timeout on unmount
      return () => {
        clearTimeout(previousTimeout);
      };
    }, [position]);

    // handle external arrows change
    useEffect(() => {
      setArrows(customArrows);
    }, [customArrows]);

    function onRightClickDown(square) {
      setCurrentRightClickDown(square);
    }

    function onRightClickUp(square) {
      if (!areArrowsAllowed) return;
      if (currentRightClickDown) {
        // same square, don't draw an arrow
        if (currentRightClickDown === square) {
          setCurrentRightClickDown(null);
          onSquareRightClick(square);
          return;
        }

        // if arrow already exists then it needs to be removed
        for (const i in arrows) {
          if (arrows[i][0] === currentRightClickDown && arrows[i][1] === square) {
            setArrows((oldArrows) => {
              const newArrows = [...oldArrows];
              newArrows.splice(i, 1);
              return newArrows;
            });
            return;
          }
        }

        // different square, draw an arrow
        setArrows((oldArrows) => [...oldArrows, [currentRightClickDown, square]]);
      } else setCurrentRightClickDown(null);
    }

    function clearCurrentRightClickDown() {
      setCurrentRightClickDown(null);
    }

    function clearArrows() {
      setArrows([]);
    }

    return (
      <ChessboardContext.Provider
        value={{
          animationDuration,
          boardOrientation,
          boardWidth,
          customArrowColor,
          customBoardStyle,
          customDarkSquareStyle,
          customLightSquareStyle,
          customSquareStyles,
          getPositionObject,
          onMouseOutSquare,
          onMouseOverSquare,
          onPieceClick,
          onSquareClick,
          onSquareRightClick,
          showBoardNotation,
          showSparePieces,
          snapToCursor,

          arrows,
          chessPieces,
          clearArrows,
          clearCurrentRightClickDown,
          currentPosition,
          lastPieceColour,
          onRightClickDown,
          onRightClickUp,
          positionDifferences,
          setChessPieces,
          setCurrentPosition,
          waitingForAnimation
        }}
      >
        {children}
      </ChessboardContext.Provider>
    );
  }
);
