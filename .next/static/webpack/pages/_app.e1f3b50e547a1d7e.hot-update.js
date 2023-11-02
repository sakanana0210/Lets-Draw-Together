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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authReducer: function() { return /* binding */ authReducer; }\n/* harmony export */ });\nconst initialState = {\n    isAuthenticated: false,\n    errorMessage: null,\n    loginUserUid: null,\n    loginUserName: null,\n    loginFrom: null\n};\nconst authReducer = function() {\n    let state = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : initialState, action = arguments.length > 1 ? arguments[1] : void 0;\n    switch(action.type){\n        case \"LOGIN_SUCCESS\":\n            return {\n                ...state,\n                isAuthenticated: true,\n                errorMessage: null,\n                loginUserUid: action.payload.loginUserUid,\n                loginUserName: null\n            };\n        case \"LOGIN_ERROR\":\n            return {\n                ...state,\n                isAuthenticated: false,\n                errorMessage: action.payload\n            };\n        case \"LOGIN_GOOGLE_SUCCESS\":\n            return {\n                ...state,\n                isAuthenticated: true\n            };\n        case \"LOGIN_GOOGLE_ERROR\":\n            return {\n                ...state,\n                isAuthenticated: false,\n                errorMessage: action.payload\n            };\n        case \"LOGIN_GOOGLE_GET_SUCCESS\":\n            return {\n                ...state,\n                loginUserUid: action.payload.loginUserUid,\n                loginUserName: action.payload.loginUserName\n            };\n        case \"LOGIN_GOOGLE_GET_ERROR\":\n            return {\n                ...state,\n                errorMessage: action.payload\n            };\n        case \"REGISTER_SUCCESS\":\n            return {\n                isAuthenticated: true,\n                errorMessage: null,\n                loginUserUid: action.payload.loginUserUid,\n                loginUserName: action.payload.loginUserName\n            };\n        case \"REGISTER_ERROR\":\n            return {\n                ...state,\n                isAuthenticated: false,\n                errorMessage: action.payload\n            };\n        default:\n            return state;\n    }\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9yZWR1Y2Vycy9hdXRoUmVkdWNlci5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsZUFBZTtJQUNqQkMsaUJBQWlCO0lBQ2pCQyxjQUFjO0lBQ2RDLGNBQWM7SUFDZEMsZUFBZTtJQUNmQyxXQUFXO0FBQ2Y7QUFFTyxNQUFNQyxjQUFjO1FBQUNDLHlFQUFRUCxjQUFjUTtJQUM5QyxPQUFRQSxPQUFPQyxJQUFJO1FBQ2YsS0FBSztZQUNELE9BQU87Z0JBQ0gsR0FBR0YsS0FBSztnQkFDUk4saUJBQWlCO2dCQUNqQkMsY0FBYztnQkFDZEMsY0FBY0ssT0FBT0UsT0FBTyxDQUFDUCxZQUFZO2dCQUN6Q0MsZUFBZTtZQUNuQjtRQUVKLEtBQUs7WUFDRCxPQUFPO2dCQUNILEdBQUdHLEtBQUs7Z0JBQ1JOLGlCQUFpQjtnQkFDakJDLGNBQWNNLE9BQU9FLE9BQU87WUFDaEM7UUFFSixLQUFLO1lBQ0QsT0FBTztnQkFDSCxHQUFHSCxLQUFLO2dCQUNSTixpQkFBaUI7WUFDckI7UUFFSixLQUFLO1lBQ0QsT0FBTztnQkFDSCxHQUFHTSxLQUFLO2dCQUNSTixpQkFBaUI7Z0JBQ2pCQyxjQUFjTSxPQUFPRSxPQUFPO1lBQ2hDO1FBRUosS0FBSztZQUNELE9BQU87Z0JBQ0gsR0FBR0gsS0FBSztnQkFDUkosY0FBY0ssT0FBT0UsT0FBTyxDQUFDUCxZQUFZO2dCQUN6Q0MsZUFBZUksT0FBT0UsT0FBTyxDQUFDTixhQUFhO1lBQy9DO1FBRUosS0FBSztZQUNELE9BQU87Z0JBQ0gsR0FBR0csS0FBSztnQkFDUkwsY0FBY00sT0FBT0UsT0FBTztZQUNoQztRQUVKLEtBQUs7WUFDRCxPQUFPO2dCQUNIVCxpQkFBaUI7Z0JBQ2pCQyxjQUFjO2dCQUNkQyxjQUFjSyxPQUFPRSxPQUFPLENBQUNQLFlBQVk7Z0JBQ3pDQyxlQUFlSSxPQUFPRSxPQUFPLENBQUNOLGFBQWE7WUFDL0M7UUFFSixLQUFLO1lBQ0QsT0FBTztnQkFDSCxHQUFHRyxLQUFLO2dCQUNSTixpQkFBaUI7Z0JBQ2pCQyxjQUFjTSxPQUFPRSxPQUFPO1lBQ2hDO1FBRUo7WUFDSSxPQUFPSDtJQUNmO0FBQ0osRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zdG9yZS9yZWR1Y2Vycy9hdXRoUmVkdWNlci5qcz8zMGYwIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGluaXRpYWxTdGF0ZSA9IHtcclxuICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICBsb2dpblVzZXJVaWQ6IG51bGwsXHJcbiAgICBsb2dpblVzZXJOYW1lOiBudWxsLFxyXG4gICAgbG9naW5Gcm9tOiBudWxsXHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aFJlZHVjZXIgPSAoc3RhdGUgPSBpbml0aWFsU3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgc3dpdGNoIChhY3Rpb24udHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ0xPR0lOX1NVQ0NFU1MnOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJVaWQ6IGFjdGlvbi5wYXlsb2FkLmxvZ2luVXNlclVpZCxcclxuICAgICAgICAgICAgICAgIGxvZ2luVXNlck5hbWU6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnTE9HSU5fRVJST1InOlxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgLi4uc3RhdGUsXHJcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdMT0dJTl9HT09HTEVfU1VDQ0VTUyc6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogdHJ1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgXHJcbiAgICAgICAgY2FzZSAnTE9HSU5fR09PR0xFX0VSUk9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogYWN0aW9uLnBheWxvYWRcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2FzZSAnTE9HSU5fR09PR0xFX0dFVF9TVUNDRVNTJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiBhY3Rpb24ucGF5bG9hZC5sb2dpblVzZXJVaWQsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJOYW1lOiBhY3Rpb24ucGF5bG9hZC5sb2dpblVzZXJOYW1lXHJcbiAgICAgICAgICAgIH07XHJcbiAgICBcclxuICAgICAgICBjYXNlICdMT0dJTl9HT09HTEVfR0VUX0VSUk9SJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBhY3Rpb24ucGF5bG9hZFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdSRUdJU1RFUl9TVUNDRVNTJzpcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIGxvZ2luVXNlclVpZDogYWN0aW9uLnBheWxvYWQubG9naW5Vc2VyVWlkLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogYWN0aW9uLnBheWxvYWQubG9naW5Vc2VyTmFtZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjYXNlICdSRUdJU1RFUl9FUlJPUic6XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IGFjdGlvbi5wYXlsb2FkXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgIH1cclxufTsiXSwibmFtZXMiOlsiaW5pdGlhbFN0YXRlIiwiaXNBdXRoZW50aWNhdGVkIiwiZXJyb3JNZXNzYWdlIiwibG9naW5Vc2VyVWlkIiwibG9naW5Vc2VyTmFtZSIsImxvZ2luRnJvbSIsImF1dGhSZWR1Y2VyIiwic3RhdGUiLCJhY3Rpb24iLCJ0eXBlIiwicGF5bG9hZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/reducers/authReducer.js\n"));

/***/ })

});