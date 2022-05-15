export const COLUMNS = 'abcdefgh'.split('');

export const chessboardDefaultProps = {
  animationDuration: 300,
  areArrowsAllowed: true,
  boardOrientation: 'white',
  boardWidth: 560,
  customArrows: [],
  customArrowColor: 'rgb(255,170,0)',
  customBoardStyle: {},
  customDarkSquareStyle: { backgroundColor: '#B58863' },
  customLightSquareStyle: { backgroundColor: '#F0D9B5' },
  customPieces: {},
  customSquareStyles: {},
  getPositionObject: () => {},
  onMouseOutSquare: () => {},
  onMouseOverSquare: () => {},
  onPieceClick: () => {},
  onSquareClick: () => {},
  onSquareRightClick: () => {},
  position: 'start',
  showBoardNotation: true,
  // showSparePieces: false,
  snapToCursor: true
};
