import React, { forwardRef, useState, useEffect, useContext, useRef, Fragment } from 'react';
import 'react-dom';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/** @license React v16.14.0
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var f$1 = React,
    g$1 = 60103;

reactJsxRuntime_production_min.Fragment = 60107;

if ("function" === typeof Symbol && Symbol.for) {
  var h$1 = Symbol.for;
  g$1 = h$1("react.element");
  reactJsxRuntime_production_min.Fragment = h$1("react.fragment");
}

var m$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    n$1 = Object.prototype.hasOwnProperty,
    p$1 = {
  key: !0,
  ref: !0,
  __self: !0,
  __source: !0
};

function q$1(c, a, k) {
  var b,
      d = {},
      e = null,
      l = null;
  void 0 !== k && (e = "" + k);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (l = a.ref);

  for (b in a) n$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);

  if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
  return {
    $$typeof: g$1,
    type: c,
    key: e,
    ref: l,
    props: d,
    _owner: m$1.current
  };
}

reactJsxRuntime_production_min.jsx = q$1;
reactJsxRuntime_production_min.jsxs = q$1;

var reactJsxRuntime_development = {};

/** @license React v16.14.0
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (exports) {

if (process.env.NODE_ENV !== "production") {
  (function () {

    var React$1 = React; // ATTENTION
    // When adding new symbols to this file,
    // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.


    var REACT_ELEMENT_TYPE = 0xeac7;
    var REACT_PORTAL_TYPE = 0xeaca;
    exports.Fragment = 0xeacb;
    var REACT_STRICT_MODE_TYPE = 0xeacc;
    var REACT_PROFILER_TYPE = 0xead2;
    var REACT_PROVIDER_TYPE = 0xeacd;
    var REACT_CONTEXT_TYPE = 0xeace;
    var REACT_FORWARD_REF_TYPE = 0xead0;
    var REACT_SUSPENSE_TYPE = 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = 0xead8;
    var REACT_MEMO_TYPE = 0xead3;
    var REACT_LAZY_TYPE = 0xead4;
    var REACT_BLOCK_TYPE = 0xead9;
    var REACT_SERVER_BLOCK_TYPE = 0xeada;
    var REACT_FUNDAMENTAL_TYPE = 0xead5;
    var REACT_DEBUG_TRACING_MODE_TYPE = 0xeae1;
    var REACT_LEGACY_HIDDEN_TYPE = 0xeae3;

    if (typeof Symbol === 'function' && Symbol.for) {
      var symbolFor = Symbol.for;
      REACT_ELEMENT_TYPE = symbolFor('react.element');
      REACT_PORTAL_TYPE = symbolFor('react.portal');
      exports.Fragment = symbolFor('react.fragment');
      REACT_STRICT_MODE_TYPE = symbolFor('react.strict_mode');
      REACT_PROFILER_TYPE = symbolFor('react.profiler');
      REACT_PROVIDER_TYPE = symbolFor('react.provider');
      REACT_CONTEXT_TYPE = symbolFor('react.context');
      REACT_FORWARD_REF_TYPE = symbolFor('react.forward_ref');
      REACT_SUSPENSE_TYPE = symbolFor('react.suspense');
      REACT_SUSPENSE_LIST_TYPE = symbolFor('react.suspense_list');
      REACT_MEMO_TYPE = symbolFor('react.memo');
      REACT_LAZY_TYPE = symbolFor('react.lazy');
      REACT_BLOCK_TYPE = symbolFor('react.block');
      REACT_SERVER_BLOCK_TYPE = symbolFor('react.server.block');
      REACT_FUNDAMENTAL_TYPE = symbolFor('react.fundamental');
      symbolFor('react.scope');
      symbolFor('react.opaque.id');
      REACT_DEBUG_TRACING_MODE_TYPE = symbolFor('react.debug_trace_mode');
      symbolFor('react.offscreen');
      REACT_LEGACY_HIDDEN_TYPE = symbolFor('react.legacy_hidden');
    }

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
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

    var ReactSharedInternals = React$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

    function error(format) {
      {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        printWarning('error', format, args);
      }
    }

    function printWarning(level, format, args) {
      // When changing this logic, you might want to also
      // update consoleWithStackDev.www.js as well.
      {
        var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
        var stack = '';

        if (currentlyValidatingElement) {
          var name = getComponentName(currentlyValidatingElement.type);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
        }

        stack += ReactDebugCurrentFrame.getStackAddendum();

        if (stack !== '') {
          format += '%s';
          args = args.concat([stack]);
        }

        var argsWithFormat = args.map(function (item) {
          return '' + item;
        }); // Careful: RN currently depends on this prefix

        argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
        // breaks IE9: https://github.com/facebook/react/issues/13610
        // eslint-disable-next-line react-internal/no-production-logging

        Function.prototype.apply.call(console[level], console, argsWithFormat);
      }
    } // Filter certain DOM attributes (e.g. src, href) if their values are empty strings.


    var enableScopeAPI = false; // Experimental Create Event Handle API.

    function isValidElementType(type) {
      if (typeof type === 'string' || typeof type === 'function') {
        return true;
      } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


      if (type === exports.Fragment || type === REACT_PROFILER_TYPE || type === REACT_DEBUG_TRACING_MODE_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_LEGACY_HIDDEN_TYPE || enableScopeAPI) {
        return true;
      }

      if (typeof type === 'object' && type !== null) {
        if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_BLOCK_TYPE || type[0] === REACT_SERVER_BLOCK_TYPE) {
          return true;
        }
      }

      return false;
    }

    var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

    function describeComponentFrame(name, source, ownerName) {
      var sourceInfo = '';

      if (source) {
        var path = source.fileName;
        var fileName = path.replace(BEFORE_SLASH_RE, '');
        {
          // In DEV, include code for a common special case:
          // prefer "folder/index.js" instead of just "index.js".
          if (/^index\./.test(fileName)) {
            var match = path.match(BEFORE_SLASH_RE);

            if (match) {
              var pathBeforeSlash = match[1];

              if (pathBeforeSlash) {
                var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
                fileName = folderName + '/' + fileName;
              }
            }
          }
        }
        sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
      } else if (ownerName) {
        sourceInfo = ' (created by ' + ownerName + ')';
      }

      return '\n    in ' + (name || 'Unknown') + sourceInfo;
    }

    var Resolved = 1;

    function refineResolvedLazyComponent(lazyComponent) {
      return lazyComponent._status === Resolved ? lazyComponent._result : null;
    }

    function getWrappedName(outerType, innerType, wrapperName) {
      var functionName = innerType.displayName || innerType.name || '';
      return outerType.displayName || (functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName);
    }

    function getComponentName(type) {
      if (type == null) {
        // Host root, text node or just invalid type.
        return null;
      }

      {
        if (typeof type.tag === 'number') {
          error('Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
        }
      }

      if (typeof type === 'function') {
        return type.displayName || type.name || null;
      }

      if (typeof type === 'string') {
        return type;
      }

      switch (type) {
        case exports.Fragment:
          return 'Fragment';

        case REACT_PORTAL_TYPE:
          return 'Portal';

        case REACT_PROFILER_TYPE:
          return "Profiler";

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
            return 'Context.Consumer';

          case REACT_PROVIDER_TYPE:
            return 'Context.Provider';

          case REACT_FORWARD_REF_TYPE:
            return getWrappedName(type, type.render, 'ForwardRef');

          case REACT_MEMO_TYPE:
            return getComponentName(type.type);

          case REACT_BLOCK_TYPE:
            return getComponentName(type.render);

          case REACT_LAZY_TYPE:
            {
              var thenable = type;
              var resolvedThenable = refineResolvedLazyComponent(thenable);

              if (resolvedThenable) {
                return getComponentName(resolvedThenable);
              }

              break;
            }
        }
      }

      return null;
    }

    var loggedTypeFailures = {};
    ReactSharedInternals.ReactDebugCurrentFrame;
    var currentlyValidatingElement = null;

    function setCurrentlyValidatingElement(element) {
      {
        currentlyValidatingElement = element;
      }
    }

    function checkPropTypes(typeSpecs, values, location, componentName, element) {
      {
        // $FlowFixMe This is okay but Flow doesn't know it.
        var has = Function.call.bind(Object.prototype.hasOwnProperty);

        for (var typeSpecName in typeSpecs) {
          if (has(typeSpecs, typeSpecName)) {
            var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
            // fail the render phase where it didn't fail before. So we log it.
            // After these have been cleaned up, we'll let them throw.

            try {
              // This is intentionally an invariant that gets caught. It's the same
              // behavior as without this statement except with a better message.
              if (typeof typeSpecs[typeSpecName] !== 'function') {
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

    var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
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
          var componentName = getComponentName(ReactCurrentOwner.current.type);

          if (!didWarnAboutStringRefs[componentName]) {
            error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentName(ReactCurrentOwner.current.type), config.ref);
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
          key = '' + maybeKey;
        }

        if (hasValidKey(config)) {
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
    ReactSharedInternals.ReactDebugCurrentFrame;

    function setCurrentlyValidatingElement$1(element) {
      currentlyValidatingElement = element;
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
          var name = getComponentName(ReactCurrentOwner$1.current.type);

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
          childOwner = " It was passed a child from " + getComponentName(element._owner.type) + ".";
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

        if (Array.isArray(node)) {
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
          var name = getComponentName(type);
          checkPropTypes(propTypes, element.props, 'prop', name, element);
        } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
          propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

          var _name = getComponentName(type);

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
          } else if (Array.isArray(type)) {
            typeString = 'array';
          } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
            typeString = "<" + (getComponentName(type.type) || 'Unknown') + " />";
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
              if (Array.isArray(children)) {
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

        if (type === exports.Fragment) {
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
    exports.jsx = jsx;
    exports.jsxs = jsxs;
  })();
}
}(reactJsxRuntime_development));

if (process.env.NODE_ENV === 'production') {
  jsxRuntime.exports = reactJsxRuntime_production_min;
} else {
  jsxRuntime.exports = reactJsxRuntime_development;
}

var reactIs = {exports: {}};

var reactIs_production_min = {};

/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b = "function" === typeof Symbol && Symbol.for,
    c = b ? Symbol.for("react.element") : 60103,
    d = b ? Symbol.for("react.portal") : 60106,
    e = b ? Symbol.for("react.fragment") : 60107,
    f = b ? Symbol.for("react.strict_mode") : 60108,
    g = b ? Symbol.for("react.profiler") : 60114,
    h = b ? Symbol.for("react.provider") : 60109,
    k = b ? Symbol.for("react.context") : 60110,
    l = b ? Symbol.for("react.async_mode") : 60111,
    m = b ? Symbol.for("react.concurrent_mode") : 60111,
    n = b ? Symbol.for("react.forward_ref") : 60112,
    p = b ? Symbol.for("react.suspense") : 60113,
    q = b ? Symbol.for("react.suspense_list") : 60120,
    r = b ? Symbol.for("react.memo") : 60115,
    t = b ? Symbol.for("react.lazy") : 60116,
    v = b ? Symbol.for("react.block") : 60121,
    w = b ? Symbol.for("react.fundamental") : 60117,
    x = b ? Symbol.for("react.responder") : 60118,
    y = b ? Symbol.for("react.scope") : 60119;

function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;

    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;

          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;

              default:
                return u;
            }

        }

      case d:
        return u;
    }
  }
}

function A(a) {
  return z(a) === m;
}

reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;

reactIs_production_min.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};

reactIs_production_min.isConcurrentMode = A;

reactIs_production_min.isContextConsumer = function (a) {
  return z(a) === k;
};

reactIs_production_min.isContextProvider = function (a) {
  return z(a) === h;
};

reactIs_production_min.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};

reactIs_production_min.isForwardRef = function (a) {
  return z(a) === n;
};

reactIs_production_min.isFragment = function (a) {
  return z(a) === e;
};

reactIs_production_min.isLazy = function (a) {
  return z(a) === t;
};

reactIs_production_min.isMemo = function (a) {
  return z(a) === r;
};

reactIs_production_min.isPortal = function (a) {
  return z(a) === d;
};

reactIs_production_min.isProfiler = function (a) {
  return z(a) === g;
};

reactIs_production_min.isStrictMode = function (a) {
  return z(a) === f;
};

reactIs_production_min.isSuspense = function (a) {
  return z(a) === p;
};

reactIs_production_min.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};

reactIs_production_min.typeOf = z;

var reactIs_development = {};

/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
  (function () {
    // nor polyfill, then a plain number is used for performance.

    var hasSymbol = typeof Symbol === 'function' && Symbol.for;
    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
    var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
    var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
    var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
    var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
    // (unstable) APIs that have been removed. Can we remove the symbols?

    var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
    var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
    var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
    var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
    var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
    var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
    var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
    var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
    var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
    var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
    var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

    function isValidElementType(type) {
      return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
    }

    function typeOf(object) {
      if (typeof object === 'object' && object !== null) {
        var $$typeof = object.$$typeof;

        switch ($$typeof) {
          case REACT_ELEMENT_TYPE:
            var type = object.type;

            switch (type) {
              case REACT_ASYNC_MODE_TYPE:
              case REACT_CONCURRENT_MODE_TYPE:
              case REACT_FRAGMENT_TYPE:
              case REACT_PROFILER_TYPE:
              case REACT_STRICT_MODE_TYPE:
              case REACT_SUSPENSE_TYPE:
                return type;

              default:
                var $$typeofType = type && type.$$typeof;

                switch ($$typeofType) {
                  case REACT_CONTEXT_TYPE:
                  case REACT_FORWARD_REF_TYPE:
                  case REACT_LAZY_TYPE:
                  case REACT_MEMO_TYPE:
                  case REACT_PROVIDER_TYPE:
                    return $$typeofType;

                  default:
                    return $$typeof;
                }

            }

          case REACT_PORTAL_TYPE:
            return $$typeof;
        }
      }

      return undefined;
    } // AsyncMode is deprecated along with isAsyncMode


    var AsyncMode = REACT_ASYNC_MODE_TYPE;
    var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
    var ContextConsumer = REACT_CONTEXT_TYPE;
    var ContextProvider = REACT_PROVIDER_TYPE;
    var Element = REACT_ELEMENT_TYPE;
    var ForwardRef = REACT_FORWARD_REF_TYPE;
    var Fragment = REACT_FRAGMENT_TYPE;
    var Lazy = REACT_LAZY_TYPE;
    var Memo = REACT_MEMO_TYPE;
    var Portal = REACT_PORTAL_TYPE;
    var Profiler = REACT_PROFILER_TYPE;
    var StrictMode = REACT_STRICT_MODE_TYPE;
    var Suspense = REACT_SUSPENSE_TYPE;
    var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

    function isAsyncMode(object) {
      {
        if (!hasWarnedAboutDeprecatedIsAsyncMode) {
          hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

          console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
        }
      }
      return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
    }

    function isConcurrentMode(object) {
      return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
    }

    function isContextConsumer(object) {
      return typeOf(object) === REACT_CONTEXT_TYPE;
    }

    function isContextProvider(object) {
      return typeOf(object) === REACT_PROVIDER_TYPE;
    }

    function isElement(object) {
      return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    function isForwardRef(object) {
      return typeOf(object) === REACT_FORWARD_REF_TYPE;
    }

    function isFragment(object) {
      return typeOf(object) === REACT_FRAGMENT_TYPE;
    }

    function isLazy(object) {
      return typeOf(object) === REACT_LAZY_TYPE;
    }

    function isMemo(object) {
      return typeOf(object) === REACT_MEMO_TYPE;
    }

    function isPortal(object) {
      return typeOf(object) === REACT_PORTAL_TYPE;
    }

    function isProfiler(object) {
      return typeOf(object) === REACT_PROFILER_TYPE;
    }

    function isStrictMode(object) {
      return typeOf(object) === REACT_STRICT_MODE_TYPE;
    }

    function isSuspense(object) {
      return typeOf(object) === REACT_SUSPENSE_TYPE;
    }

    reactIs_development.AsyncMode = AsyncMode;
    reactIs_development.ConcurrentMode = ConcurrentMode;
    reactIs_development.ContextConsumer = ContextConsumer;
    reactIs_development.ContextProvider = ContextProvider;
    reactIs_development.Element = Element;
    reactIs_development.ForwardRef = ForwardRef;
    reactIs_development.Fragment = Fragment;
    reactIs_development.Lazy = Lazy;
    reactIs_development.Memo = Memo;
    reactIs_development.Portal = Portal;
    reactIs_development.Profiler = Profiler;
    reactIs_development.StrictMode = StrictMode;
    reactIs_development.Suspense = Suspense;
    reactIs_development.isAsyncMode = isAsyncMode;
    reactIs_development.isConcurrentMode = isConcurrentMode;
    reactIs_development.isContextConsumer = isContextConsumer;
    reactIs_development.isContextProvider = isContextProvider;
    reactIs_development.isElement = isElement;
    reactIs_development.isForwardRef = isForwardRef;
    reactIs_development.isFragment = isFragment;
    reactIs_development.isLazy = isLazy;
    reactIs_development.isMemo = isMemo;
    reactIs_development.isPortal = isPortal;
    reactIs_development.isProfiler = isProfiler;
    reactIs_development.isStrictMode = isStrictMode;
    reactIs_development.isSuspense = isSuspense;
    reactIs_development.isValidElementType = isValidElementType;
    reactIs_development.typeOf = typeOf;
  })();
}

if (process.env.NODE_ENV === 'production') {
  reactIs.exports = reactIs_production_min;
} else {
  reactIs.exports = reactIs_development;
}

var propTypes = {exports: {}};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

var has$2 = Function.call.bind(Object.prototype.hasOwnProperty);

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var printWarning$1 = function () {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;

  var loggedTypeFailures = {};

  var has$1 = has$2;

  printWarning$1 = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {
      /**/
    }
  };
}
/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */


function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }

        if (error && !(error instanceof Error)) {
          printWarning$1((componentName || 'React class') + ': type specification of ' + location + ' `' + typeSpecName + '` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a ' + typeof error + '. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).');
        }

        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;
          var stack = getStack ? getStack() : '';
          printWarning$1('Failed ' + location + ' type: ' + error.message + (stack != null ? stack : ''));
        }
      }
    }
  }
}
/**
 * Resets warning cache when testing.
 *
 * @private
 */


checkPropTypes$1.resetWarningCache = function () {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactIs$1 = reactIs.exports;

var assign = objectAssign;

var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;

var has = has$2;

var checkPropTypes = checkPropTypes_1;

var printWarning = function () {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function (text) {
    var message = 'Warning: ' + text;

    if (typeof console !== 'undefined') {
      console.error(message);
    }

    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */

  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);

    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }
  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */


  var ANONYMOUS = '<<anonymous>>'; // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.

  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bigint: createPrimitiveTypeChecker('bigint'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),
    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };
  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */

  /*eslint-disable no-self-compare*/

  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */


  function PropTypeError(message, data) {
    this.message = message;
    this.data = data && typeof data === 'object' ? data : {};
    this.stack = '';
  } // Make `instanceof Error` still work for returned errors.


  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }

    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;

          if (!manualPropTypeCallCache[cacheKey] && // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            printWarning('You are manually calling a React.PropTypes validation ' + 'function for the `' + propFullName + '` prop on `' + componentName + '`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.');
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }

      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }

          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }

        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);
    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'), {
          expectedType: expectedType
        });
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }

      var propValue = props[propName];

      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }

      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);

        if (error instanceof Error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      if (!ReactIs$1.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning('Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' + 'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).');
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }

      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];

      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);

        if (type === 'symbol') {
          return String(value);
        }

        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }

      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }

      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

          if (error instanceof Error) {
            return error;
          }
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];

      if (typeof checker !== 'function') {
        printWarning('Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.');
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      var expectedTypes = [];

      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        var checkerResult = checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1);

        if (checkerResult == null) {
          return null;
        }

        if (checkerResult.data && has(checkerResult.data, 'expectedType')) {
          expectedTypes.push(checkerResult.data.expectedType);
        }
      }

      var expectedTypesMessage = expectedTypes.length > 0 ? ', expected one of type [' + expectedTypes.join(', ') + ']' : '';
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`' + expectedTypesMessage + '.'));
    }

    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function invalidValidatorError(componentName, location, propFullName, key, type) {
    return new PropTypeError((componentName || 'React class') + ': ' + location + ' type `' + propFullName + '.' + key + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + type + '`.');
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }

      for (var key in shapeTypes) {
        var checker = shapeTypes[key];

        if (typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);

      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      } // We need to check all keys in case some are required but missing from props.


      var allKeys = assign({}, props[propName], shapeTypes);

      for (var key in allKeys) {
        var checker = shapeTypes[key];

        if (has(shapeTypes, key) && typeof checker !== 'function') {
          return invalidValidatorError(componentName, location, propFullName, key, getPreciseType(checker));
        }

        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }

        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);

        if (error) {
          return error;
        }
      }

      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;

      case 'boolean':
        return !propValue;

      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }

        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);

        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;

          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;

              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;

      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    } // falsy value can't be a Symbol


    if (!propValue) {
      return false;
    } // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'


    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    } // Fallback for non-spec compliant Symbols which are polyfilled.


    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  } // Equivalent of `typeof` but with special handling for array and regexp.


  function getPropType(propValue) {
    var propType = typeof propValue;

    if (Array.isArray(propValue)) {
      return 'array';
    }

    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }

    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }

    return propType;
  } // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.


  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }

    var propType = getPropType(propValue);

    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }

    return propType;
  } // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"


  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);

    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;

      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;

      default:
        return type;
    }
  } // Returns class name of the object, if any.


  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }

    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}

function emptyFunctionWithReset() {}

emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bigint: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = reactIs.exports; // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod


  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

({
  manager: PropTypes.any,
  context: PropTypes.any,
  options: PropTypes.any,
  debugMode: PropTypes.bool
});

({
  generator: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
});

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
  customDndBackend: undefined,
  customDndBackendOptions: undefined,
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

const ChessboardContext = /*#__PURE__*/React.createContext();
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
    ((_Object$keys = Object.keys(differences.added)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) <= 2 ? (_Object$entries = Object.entries(differences.added)) === null || _Object$entries === void 0 ? void 0 : (_Object$entries$ = _Object$entries[0]) === null || _Object$entries$ === void 0 ? void 0 : _Object$entries$[1][0] : undefined; // external move has come in before animation is over
    // cancel animation and immediately update position

    if (waitingForAnimation) {
      setCurrentPosition(newPosition);
      setWaitingForAnimation(false);

      if (previousTimeout) {
        clearTimeout(previousTimeout);
      }
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
    clearArrows,
    currentPosition,
    customBoardStyle,
    customDarkSquareStyle,
    customLightSquareStyle,
    customSquareStyles,
    lastPieceColour,
    onMouseOutSquare,
    onMouseOverSquare,
    onRightClickDown,
    onRightClickUp,
    onSquareClick,
    waitingForAnimation
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
      clearArrows();
    },
    onContextMenu: e => {
      e.preventDefault();
    },
    children: /*#__PURE__*/jsxRuntime.exports.jsx("div", {
      ref: squareRef,
      style: { ...size(boardWidth),
        ...center
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
  const boardRef = useRef();
  const [squares, setSquares] = useState({});
  const {
    arrows,
    boardOrientation,
    boardWidth,
    clearCurrentRightClickDown,
    customArrowColor,
    showBoardNotation,
    currentPosition
  } = useChessboard();
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
  return boardWidth ? /*#__PURE__*/jsxRuntime.exports.jsxs("div", {
    ref: boardRef,
    style: {
      position: 'relative'
    },
    children: [/*#__PURE__*/jsxRuntime.exports.jsx(Squares, {
      children: ({
        square,
        squareColor,
        col,
        row
      }) => {
        return /*#__PURE__*/jsxRuntime.exports.jsxs(Square, {
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
        }, `${col}${row}`);
      }
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
      children: arrows.map(arrow => {
        const from = getRelativeCoords(boardOrientation, boardWidth, arrow[0]);
        const to = getRelativeCoords(boardOrientation, boardWidth, arrow[1]);
        return /*#__PURE__*/jsxRuntime.exports.jsxs(Fragment, {
          children: [/*#__PURE__*/jsxRuntime.exports.jsx("defs", {
            children: /*#__PURE__*/jsxRuntime.exports.jsx("marker", {
              id: "arrowhead",
              markerWidth: "2",
              markerHeight: "2.5",
              refX: "1.25",
              refY: "1.25",
              orient: "auto",
              children: /*#__PURE__*/jsxRuntime.exports.jsx("polygon", {
                points: "0 0, 2 1.25, 0 2.5",
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
              strokeWidth: boardWidth / 36
            },
            markerEnd: "url(#arrowhead)"
          })]
        }, `${arrow[0]}-${arrow[1]}`);
      })
    })]
  }) : /*#__PURE__*/jsxRuntime.exports.jsx(WhiteKing, {});
}

const Chessboard = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    customDndBackend,
    customDndBackendOptions,
    ...otherProps
  } = props;
  return /*#__PURE__*/jsxRuntime.exports.jsx(ErrorBoundary, {
    children: /*#__PURE__*/jsxRuntime.exports.jsx(ChessboardProvider, {
      ref: ref,
      ...otherProps,
      children: /*#__PURE__*/jsxRuntime.exports.jsx("div", {
        children: /*#__PURE__*/jsxRuntime.exports.jsx(Board, {})
      })
    })
  });
});
Chessboard.defaultProps = chessboardDefaultProps;

export { Chessboard };
