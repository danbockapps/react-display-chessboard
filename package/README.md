<div align="center" markdown="1">

# [react-chessboard](https://react-chessboard.com)

<img src="./media/chessboard.png" alt="react chessboard" width="300">

## The React Chessboard Library used at [ChessOpenings.co.uk](https://chessopenings.co.uk)

### Inspired and adapted from the unmaintained [chessboardjsx](https://github.com/willb335/chessboardjsx)

[![Pull Requests][prs-badge]][prs] [![Version][version-badge]][version] [![MIT License][license-badge]][license]

</div>

## What is react-chessboard?

react-chessboard is a React component that provides chessboard functionality to your application. The Chess game logic that controls the board should be independent to the board, using a library such as [Chess.js](https://github.com/jhlywa/chess.js). An example of these two working together is shown [in the example below](#basic-example). For interactive examples visit [react-chessboard.com](https://react-chessboard.com).

[ChessOpenings.co.uk](https://chessopenings.co.uk) was originally built utilising the [chessboardjsx](https://github.com/willb335/chessboardjsx) library. With [chessboardjsx](https://github.com/willb335/chessboardjsx) being unmaintained, it made it difficult to add functionality or optimise performance, so react-chessboard was made.

## Installation

```
npm i react-chessboard
```

## Features

### Current

- Accessible Functions
- Board Orientation Choice
- Custom Actions
  - getPositionObject
  - onMouseOutSquare
  - onMouseOverSquare
  - onPieceClick
  - onSquareClick
  - onSquareRightClick
- Customisable Board Styles
- Customisable Pieces
- Customisable Square Styles
- Draw Arrows with Drag or Props
- Mobile Compatibility
- Moving Piece Animations
- Optional Square Coordinates Notation
- Position Control
- Responsive Board Width
- TypeScript Support

### Planned

- Promotion Piece Select
- Spare Pieces

## Usage

### Bare Minimum

```jsx
import { Chessboard } from 'react-chessboard';

export default function App() {
  return (
    <div>
      <Chessboard />
    </div>
  );
}
```

### Basic Example

```jsx
import { useState } from 'react';
import Chess from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  return <Chessboard position={game.fen()} />;
}
```

### Advanced Examples

For more advanced code usage examples, please see example boards shown in [`example/src/boards`](https://github.com/Clariity/react-chessboard/tree/main/example/src/boards).

### Props

| Prop                   | Default Value                          | Options                                            | Description                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | -------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| animationDuration      | number: 300                            |                                                    | Time in milliseconds for piece to slide to target square. Only used when the position is programmatically changed. If a new position is set before the animation is complete, the board will cancel the current animation and snap to the new position.                                                                                                         |
| areArrowsAllowed       | boolean: true                          | [true, false]                                      | Whether or not arrows can be drawn with right click and dragging.                                                                                                                                                                                                                                                                                               |
| arePiecesDraggable     | boolean: true                          | [true, false]                                      | Whether or not all pieces are draggable.                                                                                                                                                                                                                                                                                                                        |
| boardOrientation       | string: 'white'                        | ['white', 'black']                                 | The orientation of the board, the chosen colour will be at the bottom of the board.                                                                                                                                                                                                                                                                             |
| boardWidth             | number: 560                            |                                                    | The width of the board in pixels.                                                                                                                                                                                                                                                                                                                               |
| customArrowColor       | string: 'rgb(255,170,0)'               | rgb or hex string                                  | String with rgb or hex value to colour drawn arrows.                                                                                                                                                                                                                                                                                                            |
| customArrows           | string[][]: []                         | array of string arrays                             | Array of custom arrows to draw on the board. Each arrow within the array must be an array of length 2 with strings denoting the from and to square to draw the arrow e.g. [ ['a3', 'a5'], ['g1', 'f3'] ].                                                                                                                                                       |
| customBoardStyle       | object: {}                             | inline CSS styling                                 | Custom board style object e.g. { borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 '}.                                                                                                                                                                                                                                                              |
| customDarkSquareStyle  | object: { backgroundColor: '#B58863' } | inline CSS styling                                 | Custom dark square style object.                                                                                                                                                                                                                                                                                                                                |
| customLightSquareStyle | object: { backgroundColor: '#F0D9B5' } | inline CSS styling                                 | Custom light square style object.                                                                                                                                                                                                                                                                                                                               |
| customPieces           | object: {}                             |                                                    | Custom pieces object where each key must match a corresponding chess piece (wP, wB, wN, wR, wQ, wK, bP, bB, bN, bR, bQ, bK). The value of each piece is a function that takes in some optional arguments to use and must return JSX to render. e.g. { wK: ({ squareWidth: number, droppedPiece: string, targetSquare: string, sourceSquare: string }) => jsx }. |
| customSquareStyles     | object: {}                             | inline CSS styling                                 | Custom styles for all squares.                                                                                                                                                                                                                                                                                                                                  |
| getPositionObject      | function: (currentPosition) => {}      |                                                    | User function that receives current position object when position changes.                                                                                                                                                                                                                                                                                      |
| onDragOverSquare       | function: (square) => {}               |                                                    | User function that is run when piece is dragged over a square.                                                                                                                                                                                                                                                                                                  |
| onMouseOverSquare      | function: (square) => {}               |                                                    | User function that is run when mouse is over a square.                                                                                                                                                                                                                                                                                                          |
| onPieceClick           | function: (piece) => {}                |                                                    | User function that is run when piece is clicked.                                                                                                                                                                                                                                                                                                                |
| onSquareClick          | function: (square) => {}               |                                                    | User function that is run when a square is clicked.                                                                                                                                                                                                                                                                                                             |
| onSquareRightClick     | function: (square) => {}               |                                                    | User function that is run when a square is right clicked.                                                                                                                                                                                                                                                                                                       |
| position               | string: 'start'                        | ['start', FEN string, { e5: 'wK', e4: 'wP', ... }] | FEN string or position object notating where the chess pieces are on the board. Start position can also be notated with the string: 'start'.                                                                                                                                                                                                                    |
| showBoardNotation      | boolean: true                          | [true, false]                                      | Whether or not to show the file and rank co-ordinates (a..h, 1..8).                                                                                                                                                                                                                                                                                             |
| snapToCursor           | boolean: true                          | [true, false]                                      | Whether or not to center dragged pieces on the mouse cursor.                                                                                                                                                                                                                                                                                                    |

## Contributing

1. Fork this repository
2. Clone your forked repository onto your development machine
   `git clone https://github.com/yourUsernameHere/react-chessboard.git`
   `cd react-chessboard`
3. Create a branch for your PR
   `git checkout -b your-branch-name`
4. Set upstream remote
   `git remote add upstream https://github.com/Clariity/react-chessboard.git`
5. Make your changes
6. Test your changes using the example folder
   `npm run build`
   `cd example`
   `npm start`
7. Push your changes
   `git add .`
   `git commit -m "feature/cool-new-feature"`
   `git push --set-upstream origin your-branch-name`
8. Create pull request on GitHub
9. Contribute again
   `git checkout main`
   `git pull upstream main`
   `git checkout -b your-new-branch-name`

## LICENSE

MIT

[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[version-badge]: https://img.shields.io/npm/v/react-chessboard.svg?style=flat-square
[license-badge]: https://img.shields.io/npm/l/react-chessboard.svg?style=flat-square
[prs]: https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github
[version]: https://www.npmjs.com/package/react-chessboard
[license]: https://github.com/Clariity/react-chessboard/blob/main/LICENSE
