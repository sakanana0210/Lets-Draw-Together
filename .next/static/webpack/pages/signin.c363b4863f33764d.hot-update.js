"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/signin",{

/***/ "./pages/signin.js":
/*!*************************!*\
  !*** ./pages/signin.js ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../firebase.js */ \"./firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/signup.module.scss */ \"./styles/signup.module.scss\");\n/* harmony import */ var _styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var _store_actions_authActionsCreator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store/actions/authActionsCreator */ \"./store/actions/authActionsCreator.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst Signin = ()=>{\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const authenticated = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.auth.isAuthenticated);\n    // useEffect(() => { \n    //     const unsubscribe = auth.onAuthStateChanged((user) => {\n    //         if (user && user.displayName) {\n    //             const setGoogleDoc = async() => {\n    //                 const uid = user.uid;\n    //                 const usersCollection = collection(db, 'users');\n    //                 const userDocRef = doc(usersCollection, uid);\n    //                 const docSnapshot = await getDoc(userDocRef);\n    //                 if (docSnapshot.exists()) {\n    //                 } else {\n    //                     await setDoc(userDocRef, {\n    //                         uid: uid,\n    //                         name: user.displayName,\n    //                         email: user.email\n    //                     });\n    //                 }\n    //                 router.push('/');\n    //             }\n    //             setGoogleDoc();\n    //         } else if (user){\n    //             router.push('/');\n    //         }\n    // });\n    //     return () => unsubscribe();\n    // }, []);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (authenticated === true) {\n            router.push(\"/\");\n        }\n    }, [\n        authenticated\n    ]);\n    const handleClick = ()=>{\n        router.push(\"/signup\");\n    };\n    // const provider = new GoogleAuthProvider();\n    // const handleSigninWithGoogle = async () => {\n    //     try {\n    //         const result = await signInWithRedirect(auth, provider);\n    //         console.log('登入成功', user);\n    //     } catch (error) {\n    //         console.error(\"登入失敗\", error.code, error.message);\n    //     }\n    // };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 70,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().title),\n                children: \"登入會員\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 71,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().input),\n                type: \"email\",\n                placeholder: \"Email\",\n                value: email,\n                onChange: (e)=>setEmail(e.target.value)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 72,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 73,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().input),\n                type: \"password\",\n                placeholder: \"密碼\",\n                value: password,\n                onChange: (e)=>setPassword(e.target.value)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 74,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnContainer),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btn),\n                    onClick: login,\n                    children: \"登入\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                    lineNumber: 76,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 75,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnContainer),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: \"\".concat((_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btn), \" \").concat((_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnGoogle)),\n                    onClick: handleSigninWithGoogle,\n                    children: \"使用Google登入\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                    lineNumber: 79,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 78,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().change),\n                onClick: handleClick,\n                children: \"切換至註冊頁\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 81,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n        lineNumber: 69,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Signin, \"oRMO4gXzjSgJU4n3Cwgdm3gcL9Q=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector,\n        next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Signin;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Signin);\nvar _c;\n$RefreshReg$(_c, \"Signin\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9zaWduaW4uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDtBQUNNO0FBQzFCO0FBQ1c7QUFDc0I7QUFDcUM7QUFDdEI7QUFDM0I7QUFDUjtBQUNxQjtBQUUvRCxNQUFNcUIsU0FBUzs7SUFDWCxNQUFNLENBQUNDLE9BQU9DLFNBQVMsR0FBR3RCLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU0sQ0FBQ3VCLFVBQVVDLFlBQVksR0FBR3hCLCtDQUFRQSxDQUFDO0lBQ3pDLE1BQU15QixnQkFBZ0J2Qix3REFBV0EsQ0FBQyxDQUFDd0IsUUFBVUEsTUFBTW5CLElBQUksQ0FBQ29CLGVBQWU7SUFDdkUscUJBQXFCO0lBQ3JCLDhEQUE4RDtJQUM5RCwwQ0FBMEM7SUFDMUMsZ0RBQWdEO0lBQ2hELHdDQUF3QztJQUN4QyxtRUFBbUU7SUFDbkUsZ0VBQWdFO0lBQ2hFLGdFQUFnRTtJQUNoRSw4Q0FBOEM7SUFDOUMsMkJBQTJCO0lBQzNCLGlEQUFpRDtJQUNqRCxvQ0FBb0M7SUFDcEMsa0RBQWtEO0lBQ2xELDRDQUE0QztJQUM1QywwQkFBMEI7SUFDMUIsb0JBQW9CO0lBQ3BCLG9DQUFvQztJQUNwQyxnQkFBZ0I7SUFDaEIsOEJBQThCO0lBQzlCLDRCQUE0QjtJQUM1QixnQ0FBZ0M7SUFDaEMsWUFBWTtJQUNaLE1BQU07SUFDTixrQ0FBa0M7SUFDbEMsVUFBVTtJQUVWLE1BQU1DLFNBQVN2QixzREFBU0E7SUFFeEJKLGdEQUFTQSxDQUFDO1FBQ04sSUFBSXdCLGtCQUFrQixNQUFNO1lBQ3hCRyxPQUFPQyxJQUFJLENBQUM7UUFDaEI7SUFDSixHQUFHO1FBQUNKO0tBQWM7SUFFbEIsTUFBTUssY0FBYztRQUNoQkYsT0FBT0MsSUFBSSxDQUFDO0lBQ2hCO0lBRUEsNkNBQTZDO0lBQzdDLCtDQUErQztJQUMvQyxZQUFZO0lBQ1osbUVBQW1FO0lBR25FLHFDQUFxQztJQUNyQyx3QkFBd0I7SUFDeEIsNERBQTREO0lBQzVELFFBQVE7SUFDUixLQUFLO0lBSUwscUJBQ0ksOERBQUNFO1FBQUlDLFdBQVdmLDhFQUFnQjs7MEJBQzVCLDhEQUFDQywwREFBTUE7Ozs7OzBCQUNQLDhEQUFDZ0I7Z0JBQUdGLFdBQVdmLDBFQUFZOzBCQUFFOzs7Ozs7MEJBQzdCLDhEQUFDbUI7Z0JBQU1KLFdBQVdmLDBFQUFZO2dCQUFFb0IsTUFBSztnQkFBUUMsYUFBWTtnQkFBUUMsT0FBT2xCO2dCQUFPbUIsVUFBVSxDQUFDQyxJQUFNbkIsU0FBU21CLEVBQUVDLE1BQU0sQ0FBQ0gsS0FBSzs7Ozs7OzBCQUN2SCw4REFBQ0k7Ozs7OzBCQUNELDhEQUFDUDtnQkFBTUosV0FBV2YsMEVBQVk7Z0JBQUVvQixNQUFLO2dCQUFXQyxhQUFZO2dCQUFLQyxPQUFPaEI7Z0JBQVVpQixVQUFVLENBQUNDLElBQU1qQixZQUFZaUIsRUFBRUMsTUFBTSxDQUFDSCxLQUFLOzs7Ozs7MEJBQzdILDhEQUFDUjtnQkFBSUMsV0FBV2YsaUZBQW1COzBCQUMvQiw0RUFBQzRCO29CQUFPYixXQUFXZix3RUFBVTtvQkFBRThCLFNBQVNDOzhCQUFPOzs7Ozs7Ozs7OzswQkFFbkQsOERBQUNqQjtnQkFBSUMsV0FBV2YsaUZBQW1COzBCQUMvQiw0RUFBQzRCO29CQUFPYixXQUFXLEdBQWlCZixPQUFkQSx3RUFBVSxFQUFDLEtBQW9CLE9BQWpCQSw4RUFBZ0I7b0JBQUk4QixTQUFTRzs4QkFBd0I7Ozs7Ozs7Ozs7OzBCQUU3Riw4REFBQ0M7Z0JBQUVuQixXQUFXZiwyRUFBYTtnQkFBRThCLFNBQVNqQjswQkFBYzs7Ozs7Ozs7Ozs7O0FBSWhFO0dBekVNVjs7UUFHb0JsQixvREFBV0E7UUEyQmxCRyxrREFBU0E7OztLQTlCdEJlO0FBMkVOLCtEQUFlQSxNQUFNQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL3NpZ25pbi5qcz83OGZlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZVN0YXRlLCB1c2VFZmZlY3R9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlU2VsZWN0b3IsIHVzZURpc3BhdGNoIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCB7IGRiLCBhdXRoLCBzZXRMb2NhbFBlcnNpc3RlbmNlfSBmcm9tICcuLi9maXJlYmFzZS5qcyc7XHJcbmltcG9ydCB7IHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkLCBzaWduSW5XaXRoUmVkaXJlY3QsIEdvb2dsZUF1dGhQcm92aWRlciB9IGZyb20gXCJmaXJlYmFzZS9hdXRoXCI7XHJcbmltcG9ydCB7IGRvYywgY29sbGVjdGlvbiwgYWRkRG9jLCBzZXREb2MsIGdldERvYyB9IGZyb20gXCJmaXJlYmFzZS9maXJlc3RvcmVcIjtcclxuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvc2lnbnVwLm1vZHVsZS5zY3NzJzsgXHJcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vY29tcG9uZW50cy9OYXZiYXInO1xyXG5pbXBvcnQgeyByZWdpc3RlciB9IGZyb20gJy4uL3N0b3JlL2FjdGlvbnMvYXV0aEFjdGlvbnNDcmVhdG9yJztcclxuXHJcbmNvbnN0IFNpZ25pbiA9ICgpID0+IHtcclxuICAgIGNvbnN0IFtlbWFpbCwgc2V0RW1haWxdID0gdXNlU3RhdGUoJycpO1xyXG4gICAgY29uc3QgW3Bhc3N3b3JkLCBzZXRQYXNzd29yZF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBhdXRoZW50aWNhdGVkID0gdXNlU2VsZWN0b3IoKHN0YXRlKSA9PiBzdGF0ZS5hdXRoLmlzQXV0aGVudGljYXRlZCk7XHJcbiAgICAvLyB1c2VFZmZlY3QoKCkgPT4geyBcclxuICAgIC8vICAgICBjb25zdCB1bnN1YnNjcmliZSA9IGF1dGgub25BdXRoU3RhdGVDaGFuZ2VkKCh1c2VyKSA9PiB7XHJcbiAgICAvLyAgICAgICAgIGlmICh1c2VyICYmIHVzZXIuZGlzcGxheU5hbWUpIHtcclxuICAgIC8vICAgICAgICAgICAgIGNvbnN0IHNldEdvb2dsZURvYyA9IGFzeW5jKCkgPT4ge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHVpZCA9IHVzZXIudWlkO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJzQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24oZGIsICd1c2VycycpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJEb2NSZWYgPSBkb2ModXNlcnNDb2xsZWN0aW9uLCB1aWQpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnN0IGRvY1NuYXBzaG90ID0gYXdhaXQgZ2V0RG9jKHVzZXJEb2NSZWYpO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGlmIChkb2NTbmFwc2hvdC5leGlzdHMoKSkge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHNldERvYyh1c2VyRG9jUmVmLCB7XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICB1aWQ6IHVpZCxcclxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHVzZXIuZGlzcGxheU5hbWUsXHJcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgIC8vICAgICAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKTtcclxuICAgIC8vICAgICAgICAgICAgIH1cclxuICAgIC8vICAgICAgICAgICAgIHNldEdvb2dsZURvYygpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2UgaWYgKHVzZXIpe1xyXG4gICAgLy8gICAgICAgICAgICAgcm91dGVyLnB1c2goJy8nKTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gfSk7XHJcbiAgICAvLyAgICAgcmV0dXJuICgpID0+IHVuc3Vic2NyaWJlKCk7XHJcbiAgICAvLyB9LCBbXSk7XHJcblxyXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoYXV0aGVudGljYXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICByb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFthdXRoZW50aWNhdGVkXSk7XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goJy9zaWdudXAnKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gY29uc3QgcHJvdmlkZXIgPSBuZXcgR29vZ2xlQXV0aFByb3ZpZGVyKCk7XHJcbiAgICAvLyBjb25zdCBoYW5kbGVTaWduaW5XaXRoR29vZ2xlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgLy8gICAgIHRyeSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNpZ25JbldpdGhSZWRpcmVjdChhdXRoLCBwcm92aWRlcik7XHJcblxyXG5cclxuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ+eZu+WFpeaIkOWKnycsIHVzZXIpO1xyXG4gICAgLy8gICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAvLyAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCLnmbvlhaXlpLHmlZdcIiwgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfTtcclxuXHJcblxyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5jb250YWluZXJ9PlxyXG4gICAgICAgICAgICA8TmF2YmFyIC8+XHJcbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9e3N0eWxlcy50aXRsZX0+55m75YWl5pyD5ZOhPC9oMj5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fSB0eXBlPVwiZW1haWxcIiBwbGFjZWhvbGRlcj1cIkVtYWlsXCIgdmFsdWU9e2VtYWlsfSBvbkNoYW5nZT17KGUpID0+IHNldEVtYWlsKGUudGFyZ2V0LnZhbHVlKX0gLz5cclxuICAgICAgICAgICAgPGJyIC8+XHJcbiAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9e3N0eWxlcy5pbnB1dH0gdHlwZT1cInBhc3N3b3JkXCIgcGxhY2Vob2xkZXI9XCLlr4bnorxcIiB2YWx1ZT17cGFzc3dvcmR9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0UGFzc3dvcmQoZS50YXJnZXQudmFsdWUpfSAvPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJ0bkNvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17c3R5bGVzLmJ0bn0gb25DbGljaz17bG9naW59PueZu+WFpTwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj4gXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuYnRuQ29udGFpbmVyfT5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgJHtzdHlsZXMuYnRufSAke3N0eWxlcy5idG5Hb29nbGV9YH0gb25DbGljaz17aGFuZGxlU2lnbmluV2l0aEdvb2dsZX0+5L2/55SoR29vZ2xl55m75YWlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMuY2hhbmdlfSBvbkNsaWNrPXtoYW5kbGVDbGlja30gPuWIh+aPm+iHs+iou+WGiumggTwvcD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWduaW47Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWxlY3RvciIsInVzZURpc3BhdGNoIiwiTGluayIsInVzZVJvdXRlciIsImRiIiwiYXV0aCIsInNldExvY2FsUGVyc2lzdGVuY2UiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsInNpZ25JbldpdGhSZWRpcmVjdCIsIkdvb2dsZUF1dGhQcm92aWRlciIsImRvYyIsImNvbGxlY3Rpb24iLCJhZGREb2MiLCJzZXREb2MiLCJnZXREb2MiLCJzdHlsZXMiLCJOYXZiYXIiLCJyZWdpc3RlciIsIlNpZ25pbiIsImVtYWlsIiwic2V0RW1haWwiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwiYXV0aGVudGljYXRlZCIsInN0YXRlIiwiaXNBdXRoZW50aWNhdGVkIiwicm91dGVyIiwicHVzaCIsImhhbmRsZUNsaWNrIiwiZGl2IiwiY2xhc3NOYW1lIiwiY29udGFpbmVyIiwiaDIiLCJ0aXRsZSIsImlucHV0IiwidHlwZSIsInBsYWNlaG9sZGVyIiwidmFsdWUiLCJvbkNoYW5nZSIsImUiLCJ0YXJnZXQiLCJiciIsImJ0bkNvbnRhaW5lciIsImJ1dHRvbiIsImJ0biIsIm9uQ2xpY2siLCJsb2dpbiIsImJ0bkdvb2dsZSIsImhhbmRsZVNpZ25pbldpdGhHb29nbGUiLCJwIiwiY2hhbmdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/signin.js\n"));

/***/ })

});