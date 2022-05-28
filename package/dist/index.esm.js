import require$$0, { forwardRef, useState, useEffect, useContext, useRef, Fragment } from 'react';

const COLUMNS = 'abcdefgh'.split('');
const chessboardDefaultProps = {
  animationDuration: 300,
  areArrowsAllowed: true,
  boardOrientation: 'white',
  boardWidth: 560,
  customArrows: [],
  customArrowColor: 'rgb(255,170,0)',
  customBoardStyle: {},
  customDarkSquareStyle: {
    backgroundColor: '#B58863'
  },
  customLightSquareStyle: {
    backgroundColor: '#F0D9B5'
  },
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

const startPositionObject = {
  a8: 'bR',
  b8: 'bN',
  c8: 'bB',
  d8: 'bQ',
  e8: 'bK',
  f8: 'bB',
  g8: 'bN',
  h8: 'bR',
  a7: 'bP',
  b7: 'bP',
  c7: 'bP',
  d7: 'bP',
  e7: 'bP',
  f7: 'bP',
  g7: 'bP',
  h7: 'bP',
  a2: 'wP',
  b2: 'wP',
  c2: 'wP',
  d2: 'wP',
  e2: 'wP',
  f2: 'wP',
  g2: 'wP',
  h2: 'wP',
  a1: 'wR',
  b1: 'wN',
  c1: 'wB',
  d1: 'wQ',
  e1: 'wK',
  f1: 'wB',
  g1: 'wN',
  h1: 'wR'
};
const whiteColumnValues = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
};
const blackColumnValues = {
  a: 7,
  b: 6,
  c: 5,
  d: 4,
  e: 3,
  f: 2,
  g: 1,
  h: 0
};
const whiteRows = [7, 6, 5, 4, 3, 2, 1, 0];
const blackRows = [0, 1, 2, 3, 4, 5, 6, 7];
const getRelativeCoords = (boardOrientation, boardWidth, square) => {
  const squareWidth = boardWidth / 8;
  const columns = boardOrientation === 'white' ? whiteColumnValues : blackColumnValues;
  const rows = boardOrientation === 'white' ? whiteRows : blackRows;
  const x = columns[square[0]] * squareWidth + squareWidth / 2;
  const y = rows[square[1] - 1] * squareWidth + squareWidth / 2;
  return {
    x,
    y
  };
};
const isDifferentFromStart = newPosition => {
  let isDifferent = false;
  Object.keys(startPositionObject).forEach(square => {
    if (newPosition[square] !== startPositionObject[square]) isDifferent = true;
  });
  Object.keys(newPosition).forEach(square => {
    if (startPositionObject[square] !== newPosition[square]) isDifferent = true;
  });
  return isDifferent;
};
const getPositionDifferences = (currentPosition, newPosition) => {
  const difference = {
    removed: {},
    added: {}
  }; // removed from current

  Object.keys(currentPosition).forEach(square => {
    if (newPosition[square] !== currentPosition[square]) difference.removed[square] = currentPosition[square];
  }); // added from new

  Object.keys(newPosition).forEach(square => {
    if (currentPosition[square] !== newPosition[square]) difference.added[square] = newPosition[square];
  });
  return difference;
};

function isString(s) {
  return typeof s === 'string';
}

function convertPositionToObject(position) {
  if (position === 'start') return fenToObj('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  if (validFen(position)) return fenToObj(position);
  if (validPositionObject(position)) return position;
  return {};
}
function fenToObj(fen) {
  if (!validFen(fen)) return false; // cut off any move, castling, etc info from the end. we're only interested in position information

  fen = fen.replace(/ .+$/, '');
  const rows = fen.split('/');
  const position = {};
  let currentRow = 8;

  for (let i = 0; i < 8; i++) {
    const row = rows[i].split('');
    let colIdx = 0; // loop through each character in the FEN section

    for (let j = 0; j < row.length; j++) {
      // number / empty squares
      if (row[j].search(/[1-8]/) !== -1) {
        const numEmptySquares = parseInt(row[j], 10);
        colIdx = colIdx + numEmptySquares;
      } else {
        // piece
        const square = COLUMNS[colIdx] + currentRow;
        position[square] = fenToPieceCode(row[j]);
        colIdx = colIdx + 1;
      }
    }

    currentRow = currentRow - 1;
  }

  return position;
}

function expandFenEmptySquares(fen) {
  return fen.replace(/8/g, '11111111').replace(/7/g, '1111111').replace(/6/g, '111111').replace(/5/g, '11111').replace(/4/g, '1111').replace(/3/g, '111').replace(/2/g, '11');
}

function validFen(fen) {
  if (!isString(fen)) return false; // cut off any move, castling, etc info from the end. we're only interested in position information

  fen = fen.replace(/ .+$/, ''); // expand the empty square numbers to just 1s

  fen = expandFenEmptySquares(fen); // FEN should be 8 sections separated by slashes

  const chunks = fen.split('/');
  if (chunks.length !== 8) return false; // check each section

  for (let i = 0; i < 8; i++) {
    if (chunks[i].length !== 8 || chunks[i].search(/[^kqrnbpKQRNBP1]/) !== -1) {
      return false;
    }
  }

  return true;
} // convert FEN piece code to bP, wK, etc

function fenToPieceCode(piece) {
  // black piece
  if (piece.toLowerCase() === piece) {
    return 'b' + piece.toUpperCase();
  } // white piece


  return 'w' + piece.toUpperCase();
}

function validSquare(square) {
  return isString(square) && square.search(/^[a-h][1-8]$/) !== -1;
}

function validPieceCode(code) {
  return isString(code) && code.search(/^[bw][KQRNBP]$/) !== -1;
}

function validPositionObject(pos) {
  if (pos === null || typeof pos !== 'object') return false;

  for (const i in pos) {
    if (!pos[i]) continue;

    if (!validSquare(i) || !validPieceCode(pos[i])) {
      return false;
    }
  }

  return true;
}

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var f = require$$0,
    k = Symbol.for("react.element"),
    l = Symbol.for("react.fragment"),
    m = Object.prototype.hasOwnProperty,
    n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    p = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function q(c, a, g) {
  var b,
      d = {},
      e = null,
      h = null;
  void 0 !== g && (e = "" + g);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);

  for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);

  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return {
    $$typeof: k,
    type: c,
    key: e,
    ref: h,
    props: d,
    _owner: n.current
  };
}

reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q;
reactJsxRuntime_production_min.jsxs = q;

var reactJsxRuntime_development = {};

/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
  (function () {

    var React = require$$0; // -----------------------------------------------------------------------------


    var enableScopeAPI = false; // Experimental Create Event Handle API.

    var enableCacheElement = false;
    var enableTransitionTracing = false; // No known bugs, but needs performance testing

    var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
    // stuff. Intended to enable React core members to more easily debug scheduling
    // issues in DEV builds.

    var enableDebugTracing = false; // Track which Fiber(s) schedule render work.
    // ATTENTION

    var REACT_ELEMENT_TYPE = Symbol.for('react.element');
    var REACT_PORTAL_TYPE = Symbol.for('react.portal');
    var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
    var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
    var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
    var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
    var REACT_CONTEXT_TYPE = Symbol.for('react.context');
    var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
    var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
    var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
    var REACT_MEMO_TYPE = Symbol.for('react.memo');
    var REACT_LAZY_TYPE = Symbol.for('react.lazy');
    var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
    var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== 'object') {
        return null;
      }

      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }

      return null;
    }

    var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    function error(format) {
      {
        {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          printWarning('error', format, args);
        }
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        } // eslint-disable-next-line react-internal/safe-string-coercion


        var argsWithFormat = args.map(function (item) {
          return String(item);
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);
      }
    }

    var REACT_MODULE_REFERENCE;
    {
      REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
    }

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
        return true;
      }

      if (typeof type === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
          return true;
        }
      }

      return false;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var displayName = outerType.displayName;

      if (displayName) {
        return displayName;
      }

      var functionName = innerType.displayName || innerType.name || '';
      return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
    } // Keep in sync with react-reconciler/getComponentNameFromFiber


    function getContextName(type) {
      return type.displayName || 'Context';
    } // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


    function getComponentNameFromType(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return 'Profiler';

        case REACT_STRICT_MODE_TYPE:
          return 'StrictMode';

        case REACT_SUSPENSE_TYPE:
          return 'Suspense';

        case REACT_SUSPENSE_LIST_TYPE:
          return 'SuspenseList';
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_CONTEXT_TYPE:
            var context = type;
            return getContextName(context) + '.Consumer';

          case REACT_PROVIDER_TYPE:
            var provider = type;
            return getContextName(provider._context) + '.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            var outerName = type.displayName || null;

            if (outerName !== null) {
              return outerName;
            }

            return getComponentNameFromType(type.type) || 'Memo';

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                return getComponentNameFromType(init(payload));
              } catch (x) {
                return null;
              }
            }
          // eslint-disable-next-line no-fallthrough
        }
      }

      return null;
    }

    var assign = Object.assign; // Helpers to patch console.logs to avoid logging during side-effect free
    // replaying on render function. This currently only patches the object
    // lazily which won't cover if the log function was extracted eagerly.
    // We could also eagerly patch the method.

    var disabledDepth = 0;
    var prevLog;
    var prevInfo;
    var prevWarn;
    var prevError;
    var prevGroup;
    var prevGroupCollapsed;
    var prevGroupEnd;

    function disabledLog() {}

    disabledLog.__reactDisabledLog = true;

    function disableLogs() {
      {
        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          prevLog = console.log;
          prevInfo = console.info;
          prevWarn = console.warn;
          prevError = console.error;
          prevGroup = console.group;
          prevGroupCollapsed = console.groupCollapsed;
          prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

          var props = {
            configurable: true,
            enumerable: true,
            value: disabledLog,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            info: props,
            log: props,
            warn: props,
            error: props,
            group: props,
            groupCollapsed: props,
            groupEnd: props
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        disabledDepth++;
      }
    }

    function reenableLogs() {
      {
        disabledDepth--;

        if (disabledDepth === 0) {
          /* eslint-disable react-internal/no-production-logging */
          var props = {
            configurable: true,
            enumerable: true,
            writable: true
          }; // $FlowFixMe Flow thinks console is immutable.

          Object.defineProperties(console, {
            log: assign({}, props, {
              value: prevLog
            }),
            info: assign({}, props, {
              value: prevInfo
            }),
            warn: assign({}, props, {
              value: prevWarn
            }),
            error: assign({}, props, {
              value: prevError
            }),
            group: assign({}, props, {
              value: prevGroup
            }),
            groupCollapsed: assign({}, props, {
              value: prevGroupCollapsed
            }),
            groupEnd: assign({}, props, {
              value: prevGroupEnd
            })
          });
          /* eslint-enable react-internal/no-production-logging */
        }

        if (disabledDepth < 0) {
          error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
        }
      }
    }

    var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
    var prefix;

    function describeBuiltInComponentFrame(name, source, ownerFn) {
      {
        if (prefix === undefined) {
          // Extract the VM specific prefix used by each line.
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || '';
          }
        } // We use the prefix to ensure our stacks line up with native stack frames.


        return '\n' + prefix + name;
      }
    }

    var reentry = false;
    var componentFrameCache;
    {
      var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
      componentFrameCache = new PossiblyWeakMap();
    }

    function describeNativeComponentFrame(fn, construct) {
      // If something asked for a stack inside a fake render, it should get ignored.
      if (!fn || reentry) {
        return '';
      }

      {
        var frame = componentFrameCache.get(fn);

        if (frame !== undefined) {
          return frame;
        }
      }
      var control;
      reentry = true;
      var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

      Error.prepareStackTrace = undefined;
      var previousDispatcher;
      {
        previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
        // for warnings.

        ReactCurrentDispatcher.current = null;
        disableLogs();
      }

      try {
        // This should throw.
        if (construct) {
          // Something should be setting the props in the constructor.
          var Fake = function () {
            throw Error();
          }; // $FlowFixMe


          Object.defineProperty(Fake.prototype, 'props', {
            set: function () {
              // We use a throwing setter instead of frozen or non-writable props
              // because that won't throw in a non-strict mode function.
              throw Error();
            }
          });

          if (typeof Reflect === 'object' && Reflect.construct) {
            // We construct a different control for this case to include any extra
            // frames added by the construct call.
            try {
              Reflect.construct(Fake, []);
            } catch (x) {
              control = x;
            }

            Reflect.construct(fn, [], Fake);
          } else {
            try {
              Fake.call();
            } catch (x) {
              control = x;
            }

            fn.call(Fake.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (x) {
            control = x;
          }

          fn();
        }
      } catch (sample) {
        // This is inlined manually because closure doesn't do it for us.
        if (sample && control && typeof sample.stack === 'string') {
          // This extracts the first frame from the sample that isn't also in the control.
          // Skipping one frame that we assume is the frame that calls the two.
          var sampleLines = sample.stack.split('\n');
          var controlLines = control.stack.split('\n');
          var s = sampleLines.length - 1;
          var c = controlLines.length - 1;

          while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
            // We expect at least one stack frame to be shared.
            // Typically this will be the root most one. However, stack frames may be
            // cut off due to maximum stack limits. In this case, one maybe cut off
            // earlier than the other. We assume that the sample is longer or the same
            // and there for cut off earlier. So we should find the root most frame in
            // the sample somewhere in the control.
            c--;
          }

          for (; s >= 1 && c >= 0; s--, c--) {
            // Next we find the first one that isn't the same which should be the
            // frame that called our sample function and the control.
            if (sampleLines[s] !== controlLines[c]) {
              // In V8, the first line is describing the message but other VMs don't.
              // If we're about to return the first line, and the control is also on the same
              // line, that's a pretty good indicator that our sample threw at same line as
              // the control. I.e. before we entered the sample frame. So we ignore this result.
              // This can happen if you passed a class to function component, or non-function.
              if (s !== 1 || c !== 1) {
                do {
                  s--;
                  c--; // We may still have similar intermediate frames from the construct call.
                  // The next one that isn't the same should be our match though.

                  if (c < 0 || sampleLines[s] !== controlLines[c]) {
                    // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                    var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                    // but we have a user-provided "displayName"
                    // splice it in to make the stack more readable.


                    if (fn.displayName && _frame.includes('<anonymous>')) {
                      _frame = _frame.replace('<anonymous>', fn.displayName);
                    }

                    {
                      if (typeof fn === 'function') {
                        componentFrameCache.set(fn, _frame);
                      }
                    } // Return the line we found.

                    return _frame;
                  }
                } while (s >= 1 && c >= 0);
              }

              break;
            }
          }
        }
      } finally {
        reentry = false;
        {
          ReactCurrentDispatcher.current = previousDispatcher;
          reenableLogs();
        }
        Error.prepareStackTrace = previousPrepareStackTrace;
      } // Fallback to just using the name if we couldn't make it throw.


      var name = fn ? fn.displayName || fn.name : '';
      var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';
      {
        if (typeof fn === 'function') {
          componentFrameCache.set(fn, syntheticFrame);
        }
      }
      return syntheticFrame;
    }

    function describeFunctionComponentFrame(fn, source, ownerFn) {
      {
        return describeNativeComponentFrame(fn, false);
      }
    }

    function shouldConstruct(Component) {
      var prototype = Component.prototype;
      return !!(prototype && prototype.isReactComponent);
    }

    function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
      if (type == null) {
        return '';
      }

      if (typeof type === 'function') {
        {
          return describeNativeComponentFrame(type, shouldConstruct(type));
        }
      }

      if (typeof type === 'string') {
        return describeBuiltInComponentFrame(type);
      }

      switch (type) {
        case REACT_SUSPENSE_TYPE:
          return describeBuiltInComponentFrame('Suspense');

        case REACT_SUSPENSE_LIST_TYPE:
          return describeBuiltInComponentFrame('SuspenseList');
      }

      if (typeof type === 'object') {
        switch (type.$$typeof) {
          case REACT_FORWARD_REF_TYPE:
            return describeFunctionComponentFrame(type.render);

          case REACT_MEMO_TYPE:
            // Memo may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

          case REACT_LAZY_TYPE:
            {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;

              try {
                // Lazy may contain any component type so we recursively resolve it.
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x) {}
            }
        }
      }

      return '';
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var loggedTypeFailures = {};
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame.setExtraStackFrame(null);
        }
      }
    }

    function checkPropTypes(typeSpecs, values, location, componentName, element) {
      {
        // $FlowFixMe This is okay but Flow doesn't know it.
        var has = Function.call.bind(hasOwnProperty);

        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.

            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
                // eslint-disable-next-line react-internal/prod-error-codes
                var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
                err.name = 'Invariant Violation';
                throw err;
              }

              error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
            } catch (ex) {
              error$1 = ex;
            }

            if (error$1 && !(error$1 instanceof Error)) {
              setCurrentlyValidatingElement(element);
              error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);
              setCurrentlyValidatingElement(null);
            }

            if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
              // Only monitor this failure once because there tends to be a lot of the
              // same error.
              loggedTypeFailures[error$1.message] = true;
              setCurrentlyValidatingElement(element);
              error('Failed %s type: %s', location, error$1.message);
              setCurrentlyValidatingElement(null);
            }
          }
        }
      }
    }

    var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

    function isArray(a) {
      return isArrayImpl(a);
    }
    /*
     * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
     * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
     *
     * The functions in this module will throw an easier-to-understand,
     * easier-to-debug exception with a clear errors message message explaining the
     * problem. (Instead of a confusing exception thrown inside the implementation
     * of the `value` object).
     */
    // $FlowFixMe only called in DEV, so void return is not possible.


    function typeName(value) {
      {
        // toStringTag is needed for namespaced types like Temporal.Instant
        var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
        var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
        return type;
      }
    } // $FlowFixMe only called in DEV, so void return is not possible.


    function willCoercionThrow(value) {
      {
        try {
          testStringCoercion(value);
          return false;
        } catch (e) {
          return true;
        }
      }
    }

    function testStringCoercion(value) {
      // If you ended up here by following an exception call stack, here's what's
      // happened: you supplied an object or symbol value to React (as a prop, key,
      // DOM attribute, CSS property, string ref, etc.) and when React tried to
      // coerce it to a string using `'' + value`, an exception was thrown.
      //
      // The most common types that will cause this exception are `Symbol` instances
      // and Temporal objects like `Temporal.Instant`. But any object that has a
      // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
      // exception. (Library authors do this to prevent users from using built-in
      // numeric operators like `+` or comparison operators like `>=` because custom
      // methods are needed to perform accurate arithmetic or comparison.)
      //
      // To fix the problem, coerce this object or symbol value to a string before
      // passing it to React. The most reliable way is usually `String(value)`.
      //
      // To find which value is throwing, check the browser or debugger console.
      // Before this exception was thrown, there should be `console.error` output
      // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
      // problem and how that type was used: key, atrribute, input value prop, etc.
      // In most cases, this console output also shows the component and its
      // ancestor components where the exception happened.
      //
      // eslint-disable-next-line react-internal/safe-string-coercion
      return '' + value;
    }

    function checkKeyStringCoercion(value) {
      {
        if (willCoercionThrow(value)) {
          error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));
          return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
        }
      }
    }

    var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };
    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;
    var didWarnAboutStringRefs;
    {
      didWarnAboutStringRefs = {};
    }

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function warnIfStringRefCannotBeAutoConverted(config, self) {
      {
        if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
          var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
            didWarnAboutStringRefs[componentName] = true;
          }
        }
      }
    }

    function defineKeyPropWarningGetter(props, displayName) {
      {
        var warnAboutAccessingKey = function () {
          if (!specialPropKeyWarningShown) {
            specialPropKeyWarningShown = true;
            error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        };

        warnAboutAccessingKey.isReactWarning = true;
        Object.defineProperty(props, 'key', {
          get: warnAboutAccessingKey,
          configurable: true
        });
      }
    }

    function defineRefPropWarningGetter(props, displayName) {
      {
        var warnAboutAccessingRef = function () {
          if (!specialPropRefWarningShown) {
            specialPropRefWarningShown = true;
            error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
          }
        };

        warnAboutAccessingRef.isReactWarning = true;
        Object.defineProperty(props, 'ref', {
          get: warnAboutAccessingRef,
          configurable: true
        });
      }
    }
    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, instanceof check
     * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} props
     * @param {*} key
     * @param {string|object} ref
     * @param {*} owner
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @internal
     */


    var ReactElement = function (type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,
        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,
        // Record the component responsible for creating this element.
        _owner: owner
      };
      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.

        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        }); // self and source are DEV only properties.

        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        }); // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.

        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });

        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }
      return element;
    };
    /**
     * https://github.com/reactjs/rfcs/pull/107
     * @param {*} type
     * @param {object} props
     * @param {string} key
     */


    function jsxDEV(type, config, maybeKey, source, self) {
      {
        var propName; // Reserved names are extracted

        var props = {};
        var key = null;
        var ref = null; // Currently, key can be spread in as a prop. This causes a potential
        // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
        // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
        // but as an intermediary step, we will use jsxDEV for everything except
        // <div {...props} key="Hi" />, because we aren't currently able to tell if
        // key is explicitly declared to be undefined or not.

        if (maybeKey !== undefined) {
          {
            checkKeyStringCoercion(maybeKey);
          }
          key = '' + maybeKey;
        }

        if (hasValidKey(config)) {
          {
            checkKeyStringCoercion(config.key);
          }
          key = '' + config.key;
        }

        if (hasValidRef(config)) {
          ref = config.ref;
          warnIfStringRefCannotBeAutoConverted(config, self);
        } // Remaining properties are added to a new props object


        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        } // Resolve default props


        if (type && type.defaultProps) {
          var defaultProps = type.defaultProps;

          for (propName in defaultProps) {
            if (props[propName] === undefined) {
              props[propName] = defaultProps[propName];
            }
          }
        }

        if (key || ref) {
          var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

          if (key) {
            defineKeyPropWarningGetter(props, displayName);
          }

          if (ref) {
            defineRefPropWarningGetter(props, displayName);
          }
        }

        return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
      }
    }

    var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
    var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement$1(element) {
      {
        if (element) {
          var owner = element._owner;
          var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
          ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
        } else {
          ReactDebugCurrentFrame$1.setExtraStackFrame(null);
        }
      }
    }

    var propTypesMisspellWarningShown;
    {
      propTypesMisspellWarningShown = false;
    }
    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a ReactElement.
     * @final
     */

    function isValidElement(object) {
      {
        return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
    }

    function getDeclarationErrorAddendum() {
      {
        if (ReactCurrentOwner$1.current) {
          var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

          if (name) {
            return '\n\nCheck the render method of `' + name + '`.';
          }
        }

        return '';
      }
    }

    function getSourceInfoErrorAddendum(source) {
      {
        if (source !== undefined) {
          var fileName = source.fileName.replace(/^.*[\\\/]/, '');
          var lineNumber = source.lineNumber;
          return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
        }

        return '';
      }
    }
    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */


    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      {
        var info = getDeclarationErrorAddendum();

        if (!info) {
          var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

          if (parentName) {
            info = "\n\nCheck the top-level render call using <" + parentName + ">.";
          }
        }

        return info;
      }
    }
    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */


    function validateExplicitKey(element, parentType) {
      {
        if (!element._store || element._store.validated || element.key != null) {
          return;
        }

        element._store.validated = true;
        var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

        if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
          return;
        }

        ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
        // property, it may be the creator of the child that's responsible for
        // assigning it a key.

        var childOwner = '';

        if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
          // Give the component that originally created this child.
          childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
        }

        setCurrentlyValidatingElement$1(element);
        error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
        setCurrentlyValidatingElement$1(null);
      }
    }
    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */


    function validateChildKeys(node, parentType) {
      {
        if (typeof node !== 'object') {
          return;
        }

        if (isArray(node)) {
          for (var i = 0; i < node.length; i++) {
            var child = node[i];

            if (isValidElement(child)) {
              validateExplicitKey(child, parentType);
            }
          }
        } else if (isValidElement(node)) {
          // This element was passed in a valid location.
          if (node._store) {
            node._store.validated = true;
          }
        } else if (node) {
          var iteratorFn = getIteratorFn(node);

          if (typeof iteratorFn === 'function') {
            // Entry iterators used to provide implicit keys,
            // but now we print a separate warning for them later.
            if (iteratorFn !== node.entries) {
              var iterator = iteratorFn.call(node);
              var step;

              while (!(step = iterator.next()).done) {
                if (isValidElement(step.value)) {
                  validateExplicitKey(step.value, parentType);
                }
              }
            }
          }
        }
      }
    }
    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */


    function validatePropTypes(element) {
      {
        var type = element.type;

        if (type === null || type === undefined || typeof type === 'string') {
          return;
        }

        var propTypes;

        if (typeof type === 'function') {
          propTypes = type.propTypes;
        } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        type.$$typeof === REACT_MEMO_TYPE)) {
          propTypes = type.propTypes;
        } else {
          return;
        }

        if (propTypes) {
          // Intentionally inside to avoid triggering lazy initializers:
          var name = getComponentNameFromType(type);
          checkPropTypes(propTypes, element.props, 'prop', name, element);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

          var _name = getComponentNameFromType(type);

          error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
        }

        if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
          error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
        }
      }
    }
    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */


    function validateFragmentProps(fragment) {
      {
        var keys = Object.keys(fragment.props);

        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];

          if (key !== 'children' && key !== 'key') {
            setCurrentlyValidatingElement$1(fragment);
            error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
            setCurrentlyValidatingElement$1(null);
            break;
          }
        }

        if (fragment.ref !== null) {
          setCurrentlyValidatingElement$1(fragment);
          error('Invalid attribute `ref` supplied to `React.Fragment`.');
          setCurrentlyValidatingElement$1(null);
        }
      }
    }

    function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
      {
        var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
        // succeed and there will likely be errors in render.

        if (!validType) {
          var info = '';

          if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
            info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
          }

          var sourceInfo = getSourceInfoErrorAddendum(source);

          if (sourceInfo) {
            info += sourceInfo;
          } else {
            info += getDeclarationErrorAddendum();
          }

          var typeString;

          if (type === null) {
            typeString = 'null';
          } else if (isArray(type)) {
            typeString = 'array';
          } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
            typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
            info = ' Did you accidentally export a JSX literal instead of a component?';
          } else {
            typeString = typeof type;
          }

          error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
        }

        var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
        // TODO: Drop this when these are no longer allowed as the type argument.

        if (element == null) {
          return element;
        } // Skip key warning if the type isn't valid since our key validation logic
        // doesn't expect a non-string/function type and can throw confusing errors.
        // We don't want exception behavior to differ between dev and prod.
        // (Rendering will throw with a helpful message and as soon as the type is
        // fixed, the key warnings will appear.)


        if (validType) {
          var children = props.children;

          if (children !== undefined) {
            if (isStaticChildren) {
              if (isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                  validateChildKeys(children[i], type);
                }

                if (Object.freeze) {
                  Object.freeze(children);
                }
              } else {
                error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
              }
            } else {
              validateChildKeys(children, type);
            }
          }
        }

        if (type === REACT_FRAGMENT_TYPE) {
          validateFragmentProps(element);
        } else {
          validatePropTypes(element);
        }

        return element;
      }
    } // These two functions exist to still get child warnings in dev
    // even with the prod transform. This means that jsxDEV is purely
    // opt-in behavior for better messages but that we won't stop
    // giving you warnings if you use production apis.


    function jsxWithValidationStatic(type, props, key) {
      {
        return jsxWithValidation(type, props, key, true);
      }
    }

    function jsxWithValidationDynamic(type, props, key) {
      {
        return jsxWithValidation(type, props, key, false);
      }
    }

    var jsx = jsxWithValidationDynamic; // we may want to special case jsxs internally to take advantage of static children.
    // for now we can ship identical prod functions

    var jsxs = jsxWithValidationStatic;
    reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
    reactJsxRuntime_development.jsx = jsx;
    reactJsxRuntime_development.jsxs = jsxs;
  })();
}

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = reactJsxRuntime_production_min;
} else {
  jsxRuntime.exports = reactJsxRuntime_development;
}

const defaultPieces = {
  wP: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsx("path", {
      d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z",
      style: {
        opacity: '1',
        fill: '#ffffff',
        fillOpacity: '1',
        fillRule: 'nonzero',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'miter',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      }
    })
  }),
  wR: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        opacity: '1',
        fill: '#ffffff',
        fillOpacity: '1',
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 34,14 L 31,17 L 14,17 L 11,14"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 31,17 L 31,29.5 L 14,29.5 L 14,17",
        style: {
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11,14 L 34,14",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinejoin: 'miter'
        }
      })]
    })
  }),
  wN: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        opacity: '1',
        fill: 'none',
        fillOpacity: '1',
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",
        style: {
          fill: '#ffffff',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",
        style: {
          fill: '#ffffff',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",
        style: {
          fill: '#000000',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",
        transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",
        style: {
          fill: '#000000',
          stroke: '#000000'
        }
      })]
    })
  }),
  wB: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        opacity: '1',
        fill: 'none',
        fillRule: 'evenodd',
        fillOpacity: '1',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsxs("g", {
        style: {
          fill: '#ffffff',
          stroke: '#000000',
          strokeLinecap: 'butt'
        },
        children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"
        })]
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinejoin: 'miter'
        }
      })]
    })
  }),
  wQ: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        fill: '#ffffff',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinejoin: 'round'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 11,36 11,36 C 9.5,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11.5,30 C 15,29 30,29 33.5,30",
        style: {
          fill: 'none'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12,33.5 C 18,32.5 27,32.5 33,33.5",
        style: {
          fill: 'none'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "6",
        cy: "12",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "14",
        cy: "9",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "22.5",
        cy: "8",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "31",
        cy: "9",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "39",
        cy: "12",
        r: "2"
      })]
    })
  }),
  wK: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        fill: 'none',
        fillOpacity: '1',
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 22.5,11.63 L 22.5,6",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 20,8 L 25,8",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",
        style: {
          fill: '#ffffff',
          stroke: '#000000',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37",
        style: {
          fill: '#ffffff',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,30 C 18,27 27,27 32.5,30",
        style: {
          fill: 'none',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5",
        style: {
          fill: 'none',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,37 C 18,34 27,34 32.5,37",
        style: {
          fill: 'none',
          stroke: '#000000'
        }
      })]
    })
  }),
  bP: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsx("path", {
      d: "m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 H 34 C 34,31.58 29.59,27.09 26.59,26.03 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z",
      style: {
        opacity: '1',
        fill: '#000000',
        fillOpacity: '1',
        fillRule: 'nonzero',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'miter',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      }
    })
  }),
  bR: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        opacity: '1',
        fill: '#000000',
        fillOpacity: '1',
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z ",
        style: {
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z ",
        style: {
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12,35.5 L 33,35.5 L 33,35.5",
        style: {
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '1',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 13,31.5 L 32,31.5",
        style: {
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '1',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 14,29.5 L 31,29.5",
        style: {
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '1',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 14,16.5 L 31,16.5",
        style: {
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '1',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11,14 L 34,14",
        style: {
          fill: 'none',
          stroke: '#ffffff',
          strokeWidth: '1',
          strokeLinejoin: 'miter'
        }
      })]
    })
  }),
  bN: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        opacity: '1',
        fill: 'none',
        fillOpacity: '1',
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18",
        style: {
          fill: '#000000',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10",
        style: {
          fill: '#000000',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z",
        style: {
          fill: '#ffffff',
          stroke: '#ffffff'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z",
        transform: "matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)",
        style: {
          fill: '#ffffff',
          stroke: '#ffffff'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z ",
        style: {
          fill: '#ffffff',
          stroke: 'none'
        }
      })]
    })
  }),
  bB: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        opacity: '1',
        fill: 'none',
        fillRule: 'evenodd',
        fillOpacity: '1',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsxs("g", {
        style: {
          fill: '#000000',
          stroke: '#000000',
          strokeLinecap: 'butt'
        },
        children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.65,38.99 6.68,38.97 6,38 C 7.35,36.54 9,36 9,36 z"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z"
        })]
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18",
        style: {
          fill: 'none',
          stroke: '#ffffff',
          strokeLinejoin: 'miter'
        }
      })]
    })
  }),
  bQ: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        fill: '#000000',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z",
        style: {
          strokeLinecap: 'butt',
          fill: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1,2.5 -1,2.5 -1.5,1.5 0,2.5 0,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11.5,30 C 15,29 30,29 33.5,30"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "m 12,33.5 c 6,-1 15,-1 21,0"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "6",
        cy: "12",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "14",
        cy: "9",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "22.5",
        cy: "8",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "31",
        cy: "9",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("circle", {
        cx: "39",
        cy: "12",
        r: "2"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 11,38.5 A 35,35 1 0 0 34,38.5",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinecap: 'butt'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
        style: {
          fill: 'none',
          stroke: '#ffffff'
        },
        children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 11,29 A 35,35 1 0 1 34,29"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 12.5,31.5 L 32.5,31.5"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
        }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
          d: "M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
        })]
      })]
    })
  }),
  bK: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    width: "45",
    height: "45",
    children: /*#__PURE__*/jsxRuntime.exports.jsxs("g", {
      style: {
        fill: 'none',
        fillOpacity: '1',
        fillRule: 'evenodd',
        stroke: '#000000',
        strokeWidth: '1.5',
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeMiterlimit: '4',
        strokeDasharray: 'none',
        strokeOpacity: '1'
      },
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 22.5,11.63 L 22.5,6",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinejoin: 'miter'
        },
        id: "path6570"
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25",
        style: {
          fill: '#000000',
          fillOpacity: '1',
          strokeLinecap: 'butt',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37",
        style: {
          fill: '#000000',
          stroke: '#000000'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 20,8 L 25,8",
        style: {
          fill: 'none',
          stroke: '#000000',
          strokeLinejoin: 'miter'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.5,26.6 L 22.5,24.5 C 20,18 10.85,14 6.97,19.85 C 4.5,25.5 13,29.5 13,29.5",
        style: {
          fill: 'none',
          stroke: '#ffffff'
        }
      }), /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        d: "M 12.5,30 C 18,27 27,27 32.5,30 M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5 M 12.5,37 C 18,34 27,34 32.5,37",
        style: {
          fill: 'none',
          stroke: '#ffffff'
        }
      })]
    })
  })
};

const ChessboardContext = /*#__PURE__*/require$$0.createContext();
const useChessboard = () => useContext(ChessboardContext);
const ChessboardProvider = /*#__PURE__*/forwardRef(({
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
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  position,
  showBoardNotation,
  showSparePieces,
  snapToCursor,
  children
}, ref) => {
  // position stored and displayed on board
  const [currentPosition, setCurrentPosition] = useState(convertPositionToObject(position)); // calculated differences between current and incoming positions

  const [positionDifferences, setPositionDifferences] = useState({}); // colour of last piece moved to determine if premoving

  const [lastPieceColour, setLastPieceColour] = useState(undefined); // current right mouse down square

  const [currentRightClickDown, setCurrentRightClickDown] = useState(); // current arrows

  const [arrows, setArrows] = useState([]); // chess pieces/styling

  const [chessPieces, setChessPieces] = useState({ ...defaultPieces,
    ...customPieces
  }); // the most recent timeout whilst waiting for animation to complete

  const [previousTimeout, setPreviousTimeout] = useState(undefined); // if currently waiting for an animation to finish

  const [waitingForAnimation, setWaitingForAnimation] = useState(false); // handle custom pieces change

  useEffect(() => {
    setChessPieces({ ...defaultPieces,
      ...customPieces
    });
  }, [customPieces]); // handle external position change

  useEffect(() => {
    var _Object$keys, _Object$entries, _Object$entries$;

    const newPosition = convertPositionToObject(position);
    const differences = getPositionDifferences(currentPosition, newPosition);
    const newPieceColour = ((_Object$keys = Object.keys(differences.added)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) <= 2 ? (_Object$entries = Object.entries(differences.added)) === null || _Object$entries === void 0 ? void 0 : (_Object$entries$ = _Object$entries[0]) === null || _Object$entries$ === void 0 ? void 0 : _Object$entries$[1][0] : undefined; // external move has come in before animation is over
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

      setPositionDifferences(differences); // animate external move

      setWaitingForAnimation(true);
      const newTimeout = setTimeout(() => {
        setCurrentPosition(newPosition);
        setWaitingForAnimation(false);
      }, animationDuration);
      setPreviousTimeout(newTimeout);
    } // inform latest position information


    getPositionObject(newPosition); // clear arrows

    clearArrows(); // clear timeout on unmount

    return () => {
      clearTimeout(previousTimeout);
    };
  }, [position]); // handle external arrows change

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
      } // if arrow already exists then it needs to be removed


      for (const i in arrows) {
        if (arrows[i][0] === currentRightClickDown && arrows[i][1] === square) {
          setArrows(oldArrows => {
            const newArrows = [...oldArrows];
            newArrows.splice(i, 1);
            return newArrows;
          });
          return;
        }
      } // different square, draw an arrow


      setArrows(oldArrows => [...oldArrows, [currentRightClickDown, square]]);
    } else setCurrentRightClickDown(null);
  }

  function clearCurrentRightClickDown() {
    setCurrentRightClickDown(null);
  }

  function clearArrows() {
    setArrows([]);
  }

  return /*#__PURE__*/jsxRuntime.exports.jsx(ChessboardContext.Provider, {
    value: {
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
      onTouchStart,
      onTouchMove,
      onTouchEnd,
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
    },
    children: children
  });
});

function Notation({
  row,
  col
}) {
  const {
    boardOrientation,
    boardWidth,
    customDarkSquareStyle,
    customLightSquareStyle
  } = useChessboard();
  const whiteColor = customLightSquareStyle.backgroundColor;
  const blackColor = customDarkSquareStyle.backgroundColor;
  const isRow = col === 0;
  const isColumn = row === 7;
  const isBottomLeftSquare = isRow && isColumn;

  function getRow() {
    return boardOrientation === 'white' ? 8 - row : row + 1;
  }

  function getColumn() {
    return boardOrientation === 'black' ? COLUMNS[7 - col] : COLUMNS[col];
  }

  function renderBottomLeft() {
    return /*#__PURE__*/jsxRuntime.exports.jsxs(jsxRuntime.exports.Fragment, {
      children: [/*#__PURE__*/jsxRuntime.exports.jsx("div", {
        style: { ...notationStyle,
          ...{
            color: whiteColor
          },
          ...numericStyle(boardWidth)
        },
        children: getRow()
      }), /*#__PURE__*/jsxRuntime.exports.jsx("div", {
        style: { ...notationStyle,
          ...{
            color: whiteColor
          },
          ...alphaStyle(boardWidth)
        },
        children: getColumn()
      })]
    });
  }

  function renderLetters() {
    return /*#__PURE__*/jsxRuntime.exports.jsx("div", {
      style: { ...notationStyle,
        ...{
          color: col % 2 !== 0 ? blackColor : whiteColor
        },
        ...alphaStyle(boardWidth)
      },
      children: getColumn()
    });
  }

  function renderNumbers() {
    return /*#__PURE__*/jsxRuntime.exports.jsx("div", {
      style: { ...notationStyle,
        ...(boardOrientation === 'black' ? {
          color: row % 2 === 0 ? blackColor : whiteColor
        } : {
          color: row % 2 === 0 ? blackColor : whiteColor
        }),
        ...numericStyle(boardWidth)
      },
      children: getRow()
    });
  }

  if (isBottomLeftSquare) {
    return renderBottomLeft();
  }

  if (isColumn) {
    return renderLetters();
  }

  if (isRow) {
    return renderNumbers();
  }

  return null;
}

const alphaStyle = width => ({
  alignSelf: 'flex-end',
  paddingLeft: width / 8 - width / 48,
  fontSize: width / 48
});

const numericStyle = width => ({
  alignSelf: 'flex-start',
  paddingRight: width / 8 - width / 48,
  fontSize: width / 48
});

const notationStyle = {
  zIndex: 3,
  position: 'absolute'
};

function Piece({
  piece,
  square,
  squares
}) {
  var _dropTarget, _dropTarget2, _dropTarget3;

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
  }); // new move has come in
  // if waiting for animation, then animation has started and we can perform animation
  // we need to head towards where we need to go, we are the source, we are heading towards the target

  useEffect(() => {
    var _positionDifferences$;

    const removedPiece = (_positionDifferences$ = positionDifferences.removed) === null || _positionDifferences$ === void 0 ? void 0 : _positionDifferences$[square]; // return as null and not loaded yet

    if (!positionDifferences.added) return; // check if piece matches or if removed piece was a pawn and new square is on 1st or 8th rank (promotion)

    const newSquare = Object.entries(positionDifferences.added).find(([s, p]) => p === removedPiece || (removedPiece === null || removedPiece === void 0 ? void 0 : removedPiece[1]) === 'P' && (s[1] === '1' || s[1] === '8')); // we can perform animation if our square was in removed, AND the matching piece is in added

    if (waitingForAnimation && removedPiece && newSquare) {
      const {
        sourceSq,
        targetSq
      } = getSquareCoordinates(square, newSquare[0]);

      if (sourceSq && targetSq) {
        setPieceStyle(oldPieceStyle => ({ ...oldPieceStyle,
          transform: `translate(${targetSq.x - sourceSq.x}px, ${targetSq.y - sourceSq.y}px)`,
          transition: `transform ${animationDuration}ms`,
          zIndex: 6
        }));
      }
    }
  }, [positionDifferences]); // translate to their own positions (repaint on undo)

  useEffect(() => {
    const {
      sourceSq
    } = getSingleSquareCoordinates(square);

    if (sourceSq) {
      setPieceStyle(oldPieceStyle => ({ ...oldPieceStyle,
        transform: `translate(${0}px, ${0}px)`,
        transition: `transform ${0}ms`
      }));
    }
  }, [currentPosition]);

  function getSingleSquareCoordinates(square) {
    return {
      sourceSq: squares[square]
    };
  }

  function getSquareCoordinates(sourceSquare, targetSquare) {
    return {
      sourceSq: squares[sourceSquare],
      targetSq: squares[targetSquare]
    };
  }

  return /*#__PURE__*/jsxRuntime.exports.jsx("div", {
    onClick: () => onPieceClick(piece),
    style: pieceStyle,
    children: typeof chessPieces[piece] === 'function' ? chessPieces[piece]({
      squareWidth: boardWidth / 8,
      droppedPiece: (_dropTarget = dropTarget) === null || _dropTarget === void 0 ? void 0 : _dropTarget.piece,
      targetSquare: (_dropTarget2 = dropTarget) === null || _dropTarget2 === void 0 ? void 0 : _dropTarget2.target,
      sourceSquare: (_dropTarget3 = dropTarget) === null || _dropTarget3 === void 0 ? void 0 : _dropTarget3.source
    }) : /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
      viewBox: '1 1 43 43',
      width: boardWidth / 8,
      height: boardWidth / 8,
      children: /*#__PURE__*/jsxRuntime.exports.jsx("g", {
        children: chessPieces[piece]
      })
    })
  });
}

function Square({
  square,
  squareColor,
  setSquares,
  children
}) {
  const squareRef = useRef();
  const {
    boardWidth,
    boardOrientation,
    customBoardStyle,
    customDarkSquareStyle,
    customLightSquareStyle,
    customSquareStyles,
    onMouseOutSquare,
    onMouseOverSquare,
    onRightClickDown,
    onRightClickUp,
    onSquareClick
  } = useChessboard();
  useEffect(() => {
    const {
      x,
      y
    } = squareRef.current.getBoundingClientRect();
    setSquares(oldSquares => ({ ...oldSquares,
      [square]: {
        x,
        y
      }
    }));
  }, [boardWidth, boardOrientation]);
  const defaultSquareStyle = { ...borderRadius(customBoardStyle, square, boardOrientation),
    ...(squareColor === 'black' ? customDarkSquareStyle : customLightSquareStyle)
  };
  return /*#__PURE__*/jsxRuntime.exports.jsx("div", {
    style: defaultSquareStyle,
    "data-square-color": squareColor,
    "data-square": square,
    onMouseOver: () => onMouseOverSquare(square),
    onMouseOut: () => onMouseOutSquare(square),
    onMouseDown: e => {
      if (e.button === 2) onRightClickDown(square);
    },
    onMouseUp: e => {
      if (e.button === 2) onRightClickUp(square);
    },
    onClick: () => {
      onSquareClick(square);
    },
    onContextMenu: e => {
      e.preventDefault();
    },
    children: /*#__PURE__*/jsxRuntime.exports.jsx("div", {
      ref: squareRef,
      style: { ...size(boardWidth),
        ...center,
        ...(customSquareStyles === null || customSquareStyles === void 0 ? void 0 : customSquareStyles[square])
      },
      children: children
    })
  });
}
const center = {
  display: 'flex',
  justifyContent: 'center'
};

const size = width => ({
  width: width / 8,
  height: width / 8
});

const borderRadius = (customBoardStyle, square, boardOrientation) => {
  if (!customBoardStyle.borderRadius) return {};

  if (square === 'a1') {
    return boardOrientation === 'white' ? {
      borderBottomLeftRadius: customBoardStyle.borderRadius
    } : {
      borderTopRightRadius: customBoardStyle.borderRadius
    };
  }

  if (square === 'a8') {
    return boardOrientation === 'white' ? {
      borderTopLeftRadius: customBoardStyle.borderRadius
    } : {
      borderBottomRightRadius: customBoardStyle.borderRadius
    };
  }

  if (square === 'h1') {
    return boardOrientation === 'white' ? {
      borderBottomRightRadius: customBoardStyle.borderRadius
    } : {
      borderTopLeftRadius: customBoardStyle.borderRadius
    };
  }

  if (square === 'h8') {
    return boardOrientation === 'white' ? {
      borderTopRightRadius: customBoardStyle.borderRadius
    } : {
      borderBottomLeftRadius: customBoardStyle.borderRadius
    };
  }

  return {};
};

function Squares({
  children
}) {
  const {
    boardOrientation,
    boardWidth,
    customBoardStyle
  } = useChessboard();
  return /*#__PURE__*/jsxRuntime.exports.jsx("div", {
    style: { ...boardStyles(boardWidth),
      ...customBoardStyle
    },
    children: [...Array(8)].map((_, r) => {
      return /*#__PURE__*/jsxRuntime.exports.jsx("div", {
        style: rowStyles(boardWidth),
        children: [...Array(8)].map((_, c) => {
          // a1, a2 ...
          const square = boardOrientation === 'black' ? COLUMNS[7 - c] + (r + 1) : COLUMNS[c] + (8 - r);
          const squareColor = c % 2 === r % 2 ? 'white' : 'black';
          return children({
            square,
            squareColor,
            col: c,
            row: r
          });
        })
      }, r.toString());
    })
  });
}

const boardStyles = width => ({
  cursor: 'default',
  height: width,
  width
});

const rowStyles = width => ({
  display: 'flex',
  flexWrap: 'nowrap',
  width
});

const errorImage = {
  whiteKing: /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    style: {
      shapeRendering: 'geometricPrecision',
      textRendering: 'geometricPrecision',
      imageRendering: 'optimizeQuality'
    },
    viewBox: "0 0 4210 12970",
    x: "0px",
    y: "0px",
    fillRule: "evenodd",
    clipRule: "evenodd",
    width: "250",
    height: "250",
    children: /*#__PURE__*/jsxRuntime.exports.jsx("g", {
      children: /*#__PURE__*/jsxRuntime.exports.jsx("path", {
        style: {
          fill: 'black',
          fillRule: 'nonzero'
        },
        d: "M2105 0c169,0 286,160 249,315l200 0c-172,266 -231,479 -256,792 315,-24 530,-86 792,-255l0 897c-265,-171 -479,-231 -792,-256 18,234 75,495 185,682l339 0c233,0 369,269 225,456l545 0 -595 1916c130,94 158,275 59,402 465,0 416,568 51,568l-334 0 465 2867 332 0c250,0 381,306 199,485 162,63 273,220 273,399l0 633 168 0 0 475c-1403,0 -2807,0 -4210,0l0 -475 167 0 0 -633c0,-179 112,-336 274,-399 -181,-178 -52,-485 199,-485l332 0 465 -2867 -335 0c-353,0 -418,-568 51,-568 -98,-127 -70,-308 59,-402l-594 -1916c181,0 363,0 545,0 -144,-187 -9,-456 225,-456l339 0c110,-187 167,-448 185,-682 -315,25 -530,87 -793,256l0 -897c266,171 480,231 793,255 -25,-315 -87,-529 -256,-792l199 0c-36,-155 81,-315 250,-315zm-1994 10012l0 253 3988 0 0 -253c-1330,0 -2659,0 -3988,0zm484 -1060c-174,0 -316,142 -316,316l0 633 3652 0 0 -633c0,-174 -142,-316 -316,-316 -1007,0 -2013,0 -3020,0zm45 -457c-230,0 -225,345 0,345l2930 0c230,0 225,-345 0,-345 -977,0 -1953,0 -2930,0zm2020 -2978l-1111 0 -465 2867 2041 0 -465 -2867zm-1558 -456c-229,0 -224,345 0,345 669,0 1337,0 2005,0 230,0 225,-345 0,-345 -668,0 -1336,0 -2005,0zm1730 -457l-1454 0c-229,0 -224,345 0,345l1454 0c229,0 224,-345 0,-345zm-2064 -1862l544 1751c529,0 1057,0 1586,0l544 -1751c-892,0 -1783,0 -2674,0zm1085 -567l504 0c-126,-247 -163,-526 -177,-800 273,15 553,52 800,177l0 -504c-247,126 -527,163 -800,177 14,-273 51,-552 177,-799 -168,0 -336,0 -504,0 125,247 162,526 177,799 -274,-14 -553,-51 -800,-177l0 504c247,-125 527,-162 800,-177 -15,274 -52,553 -177,800zm969 111l-1434 0c-230,0 -225,345 0,345l1434 0c230,0 225,-345 0,-345zm-717 -2175c-105,0 -175,109 -133,204l266 0c42,-96 -30,-205 -133,-204z"
      })
    })
  })
};

function ErrorBoundary({
  children
}) {
  try {
    return children;
  } catch (error) {
    return /*#__PURE__*/jsxRuntime.exports.jsx(WhiteKing, {
      showError: true
    });
  }
}
function WhiteKing({
  showError = false
}) {
  return /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
    style: container,
    children: [/*#__PURE__*/jsxRuntime.exports.jsx("div", {
      style: whiteKingStyle,
      children: errorImage.whiteKing
    }), showError && /*#__PURE__*/jsxRuntime.exports.jsx("h1", {
      children: "Something went wrong"
    })]
  });
}
const container = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
};
const whiteKingStyle = {
  width: 250,
  height: 250,
  transform: 'rotate(90deg)'
};

function Board() {
  useRef();
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

  const getSquare = e => {
    const relativeX = e.changedTouches[0].clientX - rect.left;
    const relativeY = e.changedTouches[0].clientY - rect.top; // Catch drag-offs

    if (relativeX < 0 || relativeY < 0 || relativeX > boardWidth || relativeY > boardWidth) return undefined;
    const col = Math.floor(relativeX * 8 / boardWidth);
    const row = Math.floor(relativeY * 8 / boardWidth);
    return boardOrientation === 'black' ? `${COLUMNS[7 - col]}${row + 1}` : `${COLUMNS[col]}${8 - row}`;
  };

  return boardWidth ? /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
    ref: r => {
      const newRect = r === null || r === void 0 ? void 0 : r.getBoundingClientRect();
      if ((newRect === null || newRect === void 0 ? void 0 : newRect.top) !== (rect === null || rect === void 0 ? void 0 : rect.top) || (newRect === null || newRect === void 0 ? void 0 : newRect.bottom) !== (rect === null || rect === void 0 ? void 0 : rect.bottom) || (newRect === null || newRect === void 0 ? void 0 : newRect.left) !== (rect === null || rect === void 0 ? void 0 : rect.left) || (newRect === null || newRect === void 0 ? void 0 : newRect.right) !== (rect === null || rect === void 0 ? void 0 : rect.right)) setRect(r === null || r === void 0 ? void 0 : r.getBoundingClientRect());
    },
    style: {
      position: 'relative'
    },
    onTouchStart: e => onTouchStart === null || onTouchStart === void 0 ? void 0 : onTouchStart(getSquare(e)),
    onTouchMove: e => onTouchMove === null || onTouchMove === void 0 ? void 0 : onTouchMove(getSquare(e)),
    onTouchEnd: e => onTouchEnd === null || onTouchEnd === void 0 ? void 0 : onTouchEnd(getSquare(e)),
    children: [/*#__PURE__*/jsxRuntime.exports.jsx(Squares, {
      children: ({
        square,
        squareColor,
        col,
        row
      }) => /*#__PURE__*/jsxRuntime.exports.jsxs(Square, {
        square: square,
        squareColor: squareColor,
        setSquares: setSquares,
        children: [currentPosition[square] && /*#__PURE__*/jsxRuntime.exports.jsx(Piece, {
          piece: currentPosition[square],
          square: square,
          squares: squares
        }), showBoardNotation && /*#__PURE__*/jsxRuntime.exports.jsx(Notation, {
          row: row,
          col: col
        })]
      }, `${col}${row}`)
    }), /*#__PURE__*/jsxRuntime.exports.jsx("svg", {
      width: boardWidth,
      height: boardWidth,
      style: {
        position: 'absolute',
        top: '0',
        left: '0',
        pointerEvents: 'none',
        zIndex: '10'
      },
      children: arrows.map((arrow, i) => {
        const from = getRelativeCoords(boardOrientation, boardWidth, arrow[0]);
        const to = getRelativeCoords(boardOrientation, boardWidth, arrow[1]);
        return /*#__PURE__*/jsxRuntime.exports.jsxs(Fragment, {
          children: [/*#__PURE__*/jsxRuntime.exports.jsx("defs", {
            children: /*#__PURE__*/jsxRuntime.exports.jsx("marker", {
              id: "arrowhead",
              markerWidth: "3.2",
              markerHeight: "4",
              refX: "2",
              refY: "2",
              orient: "auto",
              children: /*#__PURE__*/jsxRuntime.exports.jsx("polygon", {
                points: "0 0, 3.2 2, 0 4",
                style: {
                  fill: customArrowColor
                }
              })
            })
          }), /*#__PURE__*/jsxRuntime.exports.jsx("line", {
            x1: from.x,
            y1: from.y,
            x2: to.x,
            y2: to.y,
            style: {
              stroke: customArrowColor,
              opacity: 0.9,
              strokeWidth: boardWidth / 60
            },
            markerEnd: "url(#arrowhead)"
          })]
        }, i);
      })
    })]
  }) : /*#__PURE__*/jsxRuntime.exports.jsx(WhiteKing, {});
}

const Chessboard = /*#__PURE__*/forwardRef((props, ref) => {
  return /*#__PURE__*/jsxRuntime.exports.jsx(ErrorBoundary, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx(ChessboardProvider, {
      ref: ref,
      ...props,
      children: /*#__PURE__*/jsxRuntime.exports.jsx("div", {
        className: "react-display-chessboard",
        children: /*#__PURE__*/jsxRuntime.exports.jsx(Board, {})
      })
    })
  });
});
Chessboard.defaultProps = chessboardDefaultProps;

export { Chessboard };
