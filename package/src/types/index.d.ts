import { CSSProperties, ReactElement, RefObject } from 'react';

export type Square =
  | 'a8'
  | 'b8'
  | 'c8'
  | 'd8'
  | 'e8'
  | 'f8'
  | 'g8'
  | 'h8'
  | 'a7'
  | 'b7'
  | 'c7'
  | 'd7'
  | 'e7'
  | 'f7'
  | 'g7'
  | 'h7'
  | 'a6'
  | 'b6'
  | 'c6'
  | 'd6'
  | 'e6'
  | 'f6'
  | 'g6'
  | 'h6'
  | 'a5'
  | 'b5'
  | 'c5'
  | 'd5'
  | 'e5'
  | 'f5'
  | 'g5'
  | 'h5'
  | 'a4'
  | 'b4'
  | 'c4'
  | 'd4'
  | 'e4'
  | 'f4'
  | 'g4'
  | 'h4'
  | 'a3'
  | 'b3'
  | 'c3'
  | 'd3'
  | 'e3'
  | 'f3'
  | 'g3'
  | 'h3'
  | 'a2'
  | 'b2'
  | 'c2'
  | 'd2'
  | 'e2'
  | 'f2'
  | 'g2'
  | 'h2'
  | 'a1'
  | 'b1'
  | 'c1'
  | 'd1'
  | 'e1'
  | 'f1'
  | 'g1'
  | 'h1';

export type Pieces = 'wP' | 'wB' | 'wN' | 'wR' | 'wQ' | 'wK' | 'bP' | 'bB' | 'bN' | 'bR' | 'bQ' | 'bK';

export interface CustomPieceFnArgs {
  squareWidth: number;
  targetSquare: Square;
  sourceSquare: Square;
}

export type CustomPieceFn = (args: CustomPieceFnArgs) => ReactElement;

export type CustomPieces = {
  [key in Pieces]?: CustomPieceFn;
};

export type CustomSquareStyles = {
  [key in Square]?: CSSProperties;
};

export type CurrentPosition = {
  [key in Square]: Pieces;
};

export interface ChessBoardProps {
  /**
   * Time in milliseconds for piece to slide to target square. Only used when the position is programmatically changed. If a new position is set before the animation is complete, the board will cancel the current animation and snap to the new position.
   */
  animationDuration?: number;
  /**
   * Whether or not arrows can be drawn with right click and dragging.
   */
  areArrowsAllowed?: boolean;
  /**
   * The orientation of the board, the chosen colour will be at the bottom of the board.
   */
  boardOrientation?: 'white' | 'black';
  /**
   * The width of the board in pixels.
   */
  boardWidth?: number;
  /**
   * Array of custom arrows to draw on the board. Each arrow within the array must be an array of length 2 with strings denoting the from and to square to draw the arrow e.g. [ ['a3', 'a5'], ['g1', 'f3'] ].
   */
  customArrows?: string[][];
  /**
   * String with rgb or hex value to colour drawn arrows.
   */
  customArrowColor?: string;
  /**
   * Custom board style object e.g. { borderRadius: '5px', boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5 '}.
   */
  customBoardStyle?: CSSProperties;
  /**
   * Custom dark square style object.
   */
  customDarkSquareStyle?: CSSProperties;
  /**
   * Custom light square style object.
   */
  customLightSquareStyle?: CSSProperties;
  /**
   * Custom pieces object where each key must match a corresponding chess piece (wP, wB, wN, wR, wQ, wK, bP, bB, bN, bR, bQ, bK). The value of each piece is a function that takes in some optional arguments to use and must return JSX to render. e.g. { wK: ({ squareWidth: number, targetSquare: string, sourceSquare: string }) => jsx }.
   */
  customPieces?: CustomPieces;
  /**
   * Custom styles for all squares.
   */
  customSquareStyles?: CustomSquareStyles;
  /**
   * User function that receives current position object when position changes.
   */
  getPositionObject?: (currentPosition: CurrentPosition) => any;

  /**
   * User function that is run when mouse leaves a square.
   */
  onMouseOutSquare?: (square: Square) => any;
  /**
   * User function that is run when mouse is over a square.
   */
  onMouseOverSquare?: (square: Square) => any;
  /**
   * User function that is run when piece is clicked.
   */
  onPieceClick?: (piece: Pieces) => any;
  /**
   * User function that is run when a square is clicked.
   */
  onSquareClick?: (square: Square) => any;
  /**
   * User function that is run when a square is right clicked.
   */
  onSquareRightClick?: (square: Square) => any;
  /**
   * FEN string or position object notating where the chess pieces are on the board. Start position can also be notated with the string: 'start'.
   */
  position?: string;
  /**
   * RefObject that is sent as forwardRef to chessboard
   */
  ref?: RefObject<HTMLDivElement>;
  /**
   * Whether or not to show the file and rank co-ordinates (a..h, 1..8).
   */
  showBoardNotation?: boolean;
}
export function Chessboard(props: ChessBoardProps): ReactElement;
