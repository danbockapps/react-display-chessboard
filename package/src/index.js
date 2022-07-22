import React, { forwardRef } from 'react';
import { Board } from './components/Board';
import { ErrorBoundary } from './components/ErrorBoundary';
import { chessboardDefaultProps } from './consts';
import { ChessboardProvider } from './context/chessboard-context';

export const Chessboard = forwardRef((props, ref) => {
  return (
    <ErrorBoundary>
      <ChessboardProvider ref={ref} {...props}>
        <div className="react-display-chessboard">
          <Board />
        </div>
      </ChessboardProvider>
    </ErrorBoundary>
  );
});

Chessboard.defaultProps = chessboardDefaultProps;
