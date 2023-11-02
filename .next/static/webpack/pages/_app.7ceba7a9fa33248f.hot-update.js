"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./store/reducers/authReducer.js":
/*!***************************************!*\
  !*** ./store/reducers/authReducer.js ***!
  \***************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authReducer: function() { return /* binding */ authReducer; }\n/* harmony export */ });\nconst initialState = {\n    isAuthenticated: false,\n    errorMessage: null,\n    loginUserUid: null,\n    loginUserName: null\n};\nconst authReducer = function() {\n    let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialState, action = arguments.length > 1 ? arguments[1] : void 0;\n    switch(action.type){\n        case \"LOGIN_SUCCESS\":\n            return {\n                ...state,\n                isAuthenticated: true,\n                errorMessage: null,\n                loginUserUid: action.payload.loginUserUid,\n                loginUserName: null\n            };\n        case \"LOGIN_ERROR\":\n            return {\n                ...state,\n                isAuthenticated: false,\n                errorMessage: action.payload\n            };\n        case \"LOGIN_GOOGLE_SUCCESS\":\n            return {\n                ...state,\n                isAuthenticated: true\n            };\n        case \"LOGIN_GOOGLE_ERROR\":\n            return {\n                ...state,\n                isAuthenticated: false,\n                errorMessage: action.payload\n            };\n        case \"LOGIN_GOOGLE_GET_SUCCESS\":\n            return {\n                ...state,\n                loginUserUid: action.payload.loginUserUid,\n                loginUserName: action.payload.loginUserName\n            };\n        case \"LOGIN_GOOGLE_GET_ERROR\":\n            return {\n                ...state,\n                errorMessage: action.payload\n            };\n        case \"REGISTER_SUCCESS\":\n            return {\n                isAuthenticated: true,\n                errorMessage: null,\n                loginUserUid: action.payload.loginUserUid,\n                loginUserName: action.payload.loginUserName\n            };\n        case \"REGISTER_ERROR\":\n            return {\n                ...state,\n                isAuthenticated: false,\n                errorMessage: action.payload\n            };\n        default:\n            return state;\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9yZWR1Y2Vycy9hdXRoUmVkdWNlci5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsZUFBZTtJQUNqQkMsaUJBQWlCO0lBQ2pCQyxjQUFjO0lBQ2RDLGNBQWM7SUFDZEMsZUFBZTtBQUNuQjtBQUVPLE1BQU1DLGNBQWM7UUFBQ0MseUVBQVFOLGNBQWNPO0lBQzlDLE9BQVFBLE9BQU9DLElBQUk7UUFDZixLQUFLO1lBQ0QsT0FBTztnQkFDSCxHQUFHRixLQUFLO2dCQUNSTCxpQkFBaUI7Z0JBQ2pCQyxjQUFjO2dCQUNkQyxjQUFjSSxPQUFPRSxPQUFPLENBQUNOLFlBQVk7Z0JBQ3pDQyxlQUFlO1lBQ25CO1FBRUosS0FBSztZQUNELE9BQU87Z0JBQ0gsR0FBR0UsS0FBSztnQkFDUkwsaUJBQWlCO2dCQUNqQkMsY0FBY0ssT0FBT0UsT0FBTztZQUNoQztRQUVKLEtBQUs7WUFDRCxPQUFPO2dCQUNILEdBQUdILEtBQUs7Z0JBQ1JMLGlCQUFpQjtZQUNyQjtRQUVKLEtBQUs7WUFDRCxPQUFPO2dCQUNILEdBQUdLLEtBQUs7Z0JBQ1JMLGlCQUFpQjtnQkFDakJDLGNBQWNLLE9BQU9FLE9BQU87WUFDaEM7UUFFSixLQUFLO1lBQ0QsT0FBTztnQkFDSCxHQUFHSCxLQUFLO2dCQUNSSCxjQUFjSSxPQUFPRSxPQUFPLENBQUNOLFlBQVk7Z0JBQ3pDQyxlQUFlRyxPQUFPRSxPQUFPLENBQUNMLGFBQWE7WUFDL0M7UUFFSixLQUFLO1lBQ0QsT0FBTztnQkFDSCxHQUFHRSxLQUFLO2dCQUNSSixjQUFjSyxPQUFPRSxPQUFPO1lBQ2hDO1FBRUosS0FBSztZQUNELE9BQU87Z0JBQ0hSLGlCQUFpQjtnQkFDakJDLGNBQWM7Z0JBQ2RDLGNBQWNJLE9BQU9FLE9BQU8sQ0FBQ04sWUFBWTtnQkFDekNDLGVBQWVHLE9BQU9FLE9BQU8sQ0FBQ0wsYUFBYTtZQUMvQztRQUVKLEtBQUs7WUFDRCxPQUFPO2dCQUNILEdBQUdFLEtBQUs7Z0JBQ1JMLGlCQUFpQjtnQkFDakJDLGNBQWNLLE9BQU9FLE9BQU87WUFDaEM7UUFFSjtZQUNJLE9BQU9IO0lBQ2Y7QUFDSixFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3N0b3JlL3JlZHVjZXJzL2F1dGhSZWR1Y2VyLmpzPzMwZjAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaW5pdGlhbFN0YXRlID0ge1xyXG4gICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuICAgIGVycm9yTWVzc2FnZTogbnVsbCxcclxuICAgIGxvZ2luVXNlclVpZDogbnVsbCxcclxuICAgIGxvZ2luVXNlck5hbWU6IG51bGxcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRoUmVkdWNlciA9IChzdGF0ZSA9IGluaXRpYWxTdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSAnTE9HSU5fU1VDQ0VTUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvZ2luVXNlclVpZDogYWN0aW9uLnBheWxvYWQubG9naW5Vc2VyVWlkLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdMT0dJTl9FUlJPUic6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ0xPR0lOX0dPT0dMRV9TVUNDRVNTJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICBjYXNlICdMT0dJTl9HT09HTEVfRVJST1InOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdMT0dJTl9HT09HTEVfR0VUX1NVQ0NFU1MnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJVaWQ6IGFjdGlvbi5wYXlsb2FkLmxvZ2luVXNlclVpZCxcclxuICAgICAgICAgICAgICAgIGxvZ2luVXNlck5hbWU6IGFjdGlvbi5wYXlsb2FkLmxvZ2luVXNlck5hbWVcclxuICAgICAgICAgICAgfTtcclxuICAgIFxyXG4gICAgICAgIGNhc2UgJ0xPR0lOX0dPT0dMRV9HRVRfRVJST1InOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ1JFR0lTVEVSX1NVQ0NFU1MnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiBhY3Rpb24ucGF5bG9hZC5sb2dpblVzZXJVaWQsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJOYW1lOiBhY3Rpb24ucGF5bG9hZC5sb2dpblVzZXJOYW1lXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNhc2UgJ1JFR0lTVEVSX0VSUk9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogYWN0aW9uLnBheWxvYWRcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgfVxyXG59OyJdLCJuYW1lcyI6WyJpbml0aWFsU3RhdGUiLCJpc0F1dGhlbnRpY2F0ZWQiLCJlcnJvck1lc3NhZ2UiLCJsb2dpblVzZXJVaWQiLCJsb2dpblVzZXJOYW1lIiwiYXV0aFJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJwYXlsb2FkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/reducers/authReducer.js\n"));

/***/ })

});