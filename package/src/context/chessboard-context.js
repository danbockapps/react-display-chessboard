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
      onTouchStart,
      onTouchMove,
      onTouchEnd,
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
        // move was made by external position change

        // if position === start then don't override newPieceColour
        // needs isDifferentFromStart in scenario where premoves have been cleared upon board reset but first move is made by computer, the last move colour would need to be updated
        if (isDifferentFromStart(newPosition) && lastPieceColour !== undefined) {
          setLastPieceColour(newPieceColour);
        } else {
          // position === start, likely a board reset
          setLastPieceColour(undefined);
        }
        setPositionDifferences(differences);

        // animate external move
        setWaitingForAnimation(true);
        const newTimeout = setTimeout(() => {
          setCurrentPosition(newPosition);
          setWaitingForAnimation(false);
        }, animationDuration);
        setPreviousTimeout(newTimeout);
      }

      // inform latest position information
      getPositionObject(newPosition);

      // clear timeout on unmount
      return () => {
        clearTimeout(previousTimeout);
      };
    }, [position]);

    return (
      <ChessboardContext.Provider
        value={{
          animationDuration,
          boardOrientation,
          boardWidth,
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
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          showBoardNotation,
          showSparePieces,
          snapToCursor,

          customArrows,
          chessPieces,
          currentPosition,
          lastPieceColour,
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
