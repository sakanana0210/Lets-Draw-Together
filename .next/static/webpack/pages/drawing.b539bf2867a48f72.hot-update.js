"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/drawing",{

/***/ "./components/Navbar.js":
/*!******************************!*\
  !*** ./components/Navbar.js ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../styles/navbar.module.scss */ \"./styles/navbar.module.scss\");\n/* harmony import */ var _styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store_actions_authActionsCreator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../store/actions/authActionsCreator */ \"./store/actions/authActionsCreator.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction Navbar() {\n    _s();\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    const authenticated = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.auth.isAuthenticated);\n    const backHome = ()=>{\n        router.push(\"/\");\n    };\n    const handleClickSignup = ()=>{\n        router.push(\"/signup\");\n    };\n    const handleClickSignout = ()=>{\n        dispatch((0,_store_actions_authActionsCreator__WEBPACK_IMPORTED_MODULE_4__.logout)());\n        router.push(\"/\");\n    };\n    if (authenticated === true) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().navbarList),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().navbarLeft),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().title),\n                        onClick: backHome,\n                        children: \"Let's  Draw  Together!\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                        lineNumber: 28,\n                        columnNumber: 21\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                    lineNumber: 27,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().navbarRight),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().itemButton),\n                            children: \"Rooms\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                            lineNumber: 31,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().itemButton),\n                            onClick: handleClickSignout,\n                            children: \"SignOut\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                            lineNumber: 32,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                    lineNumber: 30,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n            lineNumber: 26,\n            columnNumber: 13\n        }, this);\n    } else {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().navbarList),\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().navbarLeft),\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().title),\n                        onClick: backHome,\n                        children: \"Let's  Draw  Together!\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                        lineNumber: 40,\n                        columnNumber: 21\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                    lineNumber: 39,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().navbarRight),\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().itemButton),\n                            children: \"Rooms\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                            lineNumber: 43,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: (_styles_navbar_module_scss__WEBPACK_IMPORTED_MODULE_5___default().itemButton),\n                            onClick: handleClickSignup,\n                            children: \"Login / Signup\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                            lineNumber: 44,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n                    lineNumber: 42,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\components\\\\Navbar.js\",\n            lineNumber: 38,\n            columnNumber: 13\n        }, this);\n    }\n}\n_s(Navbar, \"8RxGWp2pzR/Ur2qXi1v/AKIc8Mo=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch,\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector\n    ];\n});\n_c = Navbar;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Navbar);\nvar _c;\n$RefreshReg$(_c, \"Navbar\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL05hdmJhci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ007QUFDTDtBQUNWO0FBQ3FCO0FBRTdELFNBQVNROztJQUNMLE1BQU1DLFdBQVdMLHdEQUFXQTtJQUM1QixNQUFNTSxnQkFBZ0JQLHdEQUFXQSxDQUFDLENBQUNRLFFBQVVBLE1BQU1DLElBQUksQ0FBQ0MsZUFBZTtJQUV2RSxNQUFNQyxXQUFXO1FBQ2JDLE9BQU9DLElBQUksQ0FBQztJQUNoQjtJQUVBLE1BQU1DLG9CQUFvQjtRQUN0QkYsT0FBT0MsSUFBSSxDQUFDO0lBQ2hCO0lBRUEsTUFBTUUscUJBQXFCO1FBQ3ZCVCxTQUFTRix5RUFBTUE7UUFDZlEsT0FBT0MsSUFBSSxDQUFDO0lBQ2hCO0lBRUEsSUFBSU4sa0JBQWtCLE1BQU07UUFDeEIscUJBQ0ksOERBQUNTO1lBQUlDLFdBQVdmLDhFQUFpQjs7OEJBQzdCLDhEQUFDYztvQkFBSUMsV0FBV2YsOEVBQWlCOzhCQUM3Qiw0RUFBQ2M7d0JBQUlDLFdBQVdmLHlFQUFZO3dCQUFFbUIsU0FBU1Y7a0NBQVU7Ozs7Ozs7Ozs7OzhCQUVyRCw4REFBQ0s7b0JBQUlDLFdBQVdmLCtFQUFrQjs7c0NBQzlCLDhEQUFDcUI7NEJBQU9OLFdBQVdmLDhFQUFpQjtzQ0FBRTs7Ozs7O3NDQUN0Qyw4REFBQ3FCOzRCQUFPTixXQUFXZiw4RUFBaUI7NEJBQUVtQixTQUFTTjtzQ0FBb0I7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUluRixPQUFPO1FBQ0gscUJBQ0ksOERBQUNDO1lBQUlDLFdBQVdmLDhFQUFpQjs7OEJBQzdCLDhEQUFDYztvQkFBSUMsV0FBV2YsOEVBQWlCOzhCQUM3Qiw0RUFBQ2M7d0JBQUlDLFdBQVdmLHlFQUFZO3dCQUFFbUIsU0FBU1Y7a0NBQVU7Ozs7Ozs7Ozs7OzhCQUVyRCw4REFBQ0s7b0JBQUlDLFdBQVdmLCtFQUFrQjs7c0NBQzlCLDhEQUFDcUI7NEJBQU9OLFdBQVdmLDhFQUFpQjtzQ0FBRTs7Ozs7O3NDQUN0Qyw4REFBQ3FCOzRCQUFPTixXQUFXZiw4RUFBaUI7NEJBQUVtQixTQUFTUDtzQ0FBbUI7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlsRjtBQUNKO0dBMUNTVDs7UUFDWUosb0RBQVdBO1FBQ05ELG9EQUFXQTs7O0tBRjVCSztBQTRDVCwrREFBZUEsTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL05hdmJhci5qcz9mYmNhIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgc3R5bGVzICBmcm9tICcuLi9zdHlsZXMvbmF2YmFyLm1vZHVsZS5zY3NzJyBcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgeyBsb2dvdXQgfSBmcm9tICcuLi9zdG9yZS9hY3Rpb25zL2F1dGhBY3Rpb25zQ3JlYXRvcic7XHJcblxyXG5mdW5jdGlvbiBOYXZiYXIoKSB7XHJcbiAgICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcbiAgICBjb25zdCBhdXRoZW50aWNhdGVkID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5hdXRoLmlzQXV0aGVudGljYXRlZCk7XHJcblxyXG4gICAgY29uc3QgYmFja0hvbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goJy8nKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tTaWdudXAgPSAoKSA9PiB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goJy9zaWdudXAnKTtcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2tTaWdub3V0ID0gKCkgPT4ge1xyXG4gICAgICAgIGRpc3BhdGNoKGxvZ291dCgpKTtcclxuICAgICAgICByb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubmF2YmFyTGlzdH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm5hdmJhckxlZnR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGl0bGV9IG9uQ2xpY2s9e2JhY2tIb21lfT5MZXQncyAgRHJhdyAgVG9nZXRoZXIhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubmF2YmFyUmlnaHR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuaXRlbUJ1dHRvbn0+Um9vbXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLml0ZW1CdXR0b259IG9uQ2xpY2s9e2hhbmRsZUNsaWNrU2lnbm91dH0+U2lnbk91dDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubmF2YmFyTGlzdH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm5hdmJhckxlZnR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMudGl0bGV9IG9uQ2xpY2s9e2JhY2tIb21lfT5MZXQncyAgRHJhdyAgVG9nZXRoZXIhPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubmF2YmFyUmlnaHR9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtzdHlsZXMuaXRlbUJ1dHRvbn0+Um9vbXM8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLml0ZW1CdXR0b259IG9uQ2xpY2s9e2hhbmRsZUNsaWNrU2lnbnVwfT5Mb2dpbiAvIFNpZ251cDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjsiXSwibmFtZXMiOlsiUmVhY3QiLCJ1c2VSZWYiLCJ1c2VFZmZlY3QiLCJ1c2VTZWxlY3RvciIsInVzZURpc3BhdGNoIiwic3R5bGVzIiwidXNlUm91dGVyIiwibG9nb3V0IiwiTmF2YmFyIiwiZGlzcGF0Y2giLCJhdXRoZW50aWNhdGVkIiwic3RhdGUiLCJhdXRoIiwiaXNBdXRoZW50aWNhdGVkIiwiYmFja0hvbWUiLCJyb3V0ZXIiLCJwdXNoIiwiaGFuZGxlQ2xpY2tTaWdudXAiLCJoYW5kbGVDbGlja1NpZ25vdXQiLCJkaXYiLCJjbGFzc05hbWUiLCJuYXZiYXJMaXN0IiwibmF2YmFyTGVmdCIsInRpdGxlIiwib25DbGljayIsIm5hdmJhclJpZ2h0IiwiYnV0dG9uIiwiaXRlbUJ1dHRvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Navbar.js\n"));

/***/ })

});