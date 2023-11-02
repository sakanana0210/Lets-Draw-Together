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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../firebase.js */ \"./firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n/* harmony import */ var _styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../styles/signup.module.scss */ \"./styles/signup.module.scss\");\n/* harmony import */ var _styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _components_Navbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Navbar */ \"./components/Navbar.js\");\n/* harmony import */ var _store_actions_authActionsCreator__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../store/actions/authActionsCreator */ \"./store/actions/authActionsCreator.js\");\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nconst Signin = ()=>{\n    _s();\n    const [email, setEmail] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [password, setPassword] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const unsubscribe = _firebase_js__WEBPACK_IMPORTED_MODULE_5__.auth.onAuthStateChanged((user)=>{\n            if (user && user.displayName) {\n                // const setGoogleDoc = async() => {\n                //     const uid = user.uid;\n                //     const usersCollection = collection(db, 'users');\n                //     const userDocRef = doc(usersCollection, uid);\n                //     const docSnapshot = await getDoc(userDocRef);\n                //     if (docSnapshot.exists()) {\n                //     } else {\n                //         await setDoc(userDocRef, {\n                //             uid: uid,\n                //             name: user.displayName,\n                //             email: user.email\n                //         });\n                //     }\n                //     router.push('/');\n                // }\n                // setGoogleDoc();\n                dispatch((0,_store_actions_authActionsCreator__WEBPACK_IMPORTED_MODULE_9__.loginWithGoogle)());\n                router.push(\"/\");\n            } else if (user) {\n                router.push(\"/\");\n            }\n        });\n        return ()=>unsubscribe();\n    }, []);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();\n    const handleClick = ()=>{\n        router.push(\"/signup\");\n    };\n    const handleSignin = ()=>{\n        dispatch((0,_store_actions_authActionsCreator__WEBPACK_IMPORTED_MODULE_9__.login)(email, password));\n    };\n    const handleSigninWithGoogle = async ()=>{\n        const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_6__.GoogleAuthProvider();\n        await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_5__.setLocalPersistence)();\n        (0,firebase_auth__WEBPACK_IMPORTED_MODULE_6__.signInWithRedirect)(_firebase_js__WEBPACK_IMPORTED_MODULE_5__.auth, provider);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Navbar__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 63,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().title),\n                children: \"Log In\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 64,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().input),\n                type: \"email\",\n                placeholder: \"Email\",\n                value: email,\n                onChange: (e)=>setEmail(e.target.value)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 65,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"br\", {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 66,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().input),\n                type: \"password\",\n                placeholder: \"Password\",\n                value: password,\n                onChange: (e)=>setPassword(e.target.value)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 67,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnContainer),\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                    className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btn),\n                    onClick: handleSignin,\n                    children: \"Continue\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                    lineNumber: 69,\n                    columnNumber: 17\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 68,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().change),\n                onClick: handleClick,\n                children: \"Don't have an account yet?  → Sign Up\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 72,\n                columnNumber: 13\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnContainer),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: (_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnGooleImg)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                        lineNumber: 74,\n                        columnNumber: 17\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"\".concat((_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btn), \" \").concat((_styles_signup_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btnGoogle)),\n                        onClick: handleSigninWithGoogle,\n                        children: \"Continue with Google\"\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                        lineNumber: 75,\n                        columnNumber: 17\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n                lineNumber: 73,\n                columnNumber: 13\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\sakan\\\\Documents\\\\drawing_app_nextjs\\\\pages\\\\signin.js\",\n        lineNumber: 62,\n        columnNumber: 9\n    }, undefined);\n};\n_s(Signin, \"McRQbqJDUq2awLvIRuAe9eyqAvg=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch,\n        next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter\n    ];\n});\n_c = Signin;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Signin);\nvar _c;\n$RefreshReg$(_c, \"Signin\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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X0UvLi9wYWdlcy9zaWduaW4uanM/NzhmZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VTdGF0ZSwgdXNlRWZmZWN0fSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVNlbGVjdG9yLCB1c2VEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgeyBkYiwgYXV0aCwgc2V0TG9jYWxQZXJzaXN0ZW5jZX0gZnJvbSAnLi4vZmlyZWJhc2UuanMnO1xyXG5pbXBvcnQgeyBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCwgc2lnbkluV2l0aFJlZGlyZWN0LCBHb29nbGVBdXRoUHJvdmlkZXIgfSBmcm9tIFwiZmlyZWJhc2UvYXV0aFwiO1xyXG5pbXBvcnQgeyBkb2MsIGNvbGxlY3Rpb24sIGFkZERvYywgc2V0RG9jLCBnZXREb2MgfSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XHJcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzL3NpZ251cC5tb2R1bGUuc2Nzcyc7IFxyXG5pbXBvcnQgTmF2YmFyIGZyb20gJy4uL2NvbXBvbmVudHMvTmF2YmFyJztcclxuaW1wb3J0IHsgbG9naW4sIGxvZ2luV2l0aEdvb2dsZX0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucy9hdXRoQWN0aW9uc0NyZWF0b3InO1xyXG5cclxuY29uc3QgU2lnbmluID0gKCkgPT4ge1xyXG4gICAgY29uc3QgW2VtYWlsLCBzZXRFbWFpbF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgICBjb25zdCBbcGFzc3dvcmQsIHNldFBhc3N3b3JkXSA9IHVzZVN0YXRlKCcnKTtcclxuICAgIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICAgIFxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHsgXHJcbiAgICAgICAgY29uc3QgdW5zdWJzY3JpYmUgPSBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAodXNlciAmJiB1c2VyLmRpc3BsYXlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zdCBzZXRHb29nbGVEb2MgPSBhc3luYygpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCB1aWQgPSB1c2VyLnVpZDtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCB1c2Vyc0NvbGxlY3Rpb24gPSBjb2xsZWN0aW9uKGRiLCAndXNlcnMnKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCB1c2VyRG9jUmVmID0gZG9jKHVzZXJzQ29sbGVjdGlvbiwgdWlkKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBkb2NTbmFwc2hvdCA9IGF3YWl0IGdldERvYyh1c2VyRG9jUmVmKTtcclxuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoZG9jU25hcHNob3QuZXhpc3RzKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBhd2FpdCBzZXREb2ModXNlckRvY1JlZiwge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICBuYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWxcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gICAgIHJvdXRlci5wdXNoKCcvJyk7XHJcbiAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRHb29nbGVEb2MoKTtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKGxvZ2luV2l0aEdvb2dsZSgpKTtcclxuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKCcvJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlcil7XHJcbiAgICAgICAgICAgICAgICByb3V0ZXIucHVzaCgnLycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgICAgICByZXR1cm4gKCkgPT4gdW5zdWJzY3JpYmUoKTtcclxuICAgIH0sIFtdKTtcclxuXHJcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVDbGljayA9ICgpID0+IHtcclxuICAgICAgICByb3V0ZXIucHVzaCgnL3NpZ251cCcpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBoYW5kbGVTaWduaW4gPSAoKSA9PiB7XHJcbiAgICAgICAgZGlzcGF0Y2gobG9naW4oZW1haWwsIHBhc3N3b3JkKSk7XHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZVNpZ25pbldpdGhHb29nbGUgPSBhc3luYygpID0+IHtcclxuICAgICAgICBjb25zdCBwcm92aWRlciA9IG5ldyBHb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgICAgICBhd2FpdCBzZXRMb2NhbFBlcnNpc3RlbmNlKCk7XHJcbiAgICAgICAgc2lnbkluV2l0aFJlZGlyZWN0KGF1dGgsIHByb3ZpZGVyKTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmNvbnRhaW5lcn0+XHJcbiAgICAgICAgICAgIDxOYXZiYXIgLz5cclxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT17c3R5bGVzLnRpdGxlfT5Mb2cgSW48L2gyPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPXtzdHlsZXMuaW5wdXR9IHR5cGU9XCJlbWFpbFwiIHBsYWNlaG9sZGVyPVwiRW1haWxcIiB2YWx1ZT17ZW1haWx9IG9uQ2hhbmdlPXsoZSkgPT4gc2V0RW1haWwoZS50YXJnZXQudmFsdWUpfSAvPlxyXG4gICAgICAgICAgICA8YnIgLz5cclxuICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT17c3R5bGVzLmlucHV0fSB0eXBlPVwicGFzc3dvcmRcIiBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCIgdmFsdWU9e3Bhc3N3b3JkfSBvbkNoYW5nZT17KGUpID0+IHNldFBhc3N3b3JkKGUudGFyZ2V0LnZhbHVlKX0gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idG5Db250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e3N0eWxlcy5idG59IG9uQ2xpY2s9e2hhbmRsZVNpZ25pbn0+Q29udGludWU8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+IFxyXG5cclxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPXtzdHlsZXMuY2hhbmdlfSBvbkNsaWNrPXtoYW5kbGVDbGlja30gPkRvbid0IGhhdmUgYW4gYWNjb3VudCB5ZXQ/ICDihpIgU2lnbiBVcDwvcD5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idG5Db250YWluZXJ9PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5idG5Hb29sZUltZ30+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YCR7c3R5bGVzLmJ0bn0gJHtzdHlsZXMuYnRuR29vZ2xlfWB9IG9uQ2xpY2s9e2hhbmRsZVNpZ25pbldpdGhHb29nbGV9PkNvbnRpbnVlIHdpdGggR29vZ2xlPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PiBcclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBcclxuICAgICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaWduaW47Il0sIm5hbWVzIjpbIlJlYWN0IiwidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWxlY3RvciIsInVzZURpc3BhdGNoIiwiTGluayIsInVzZVJvdXRlciIsImRiIiwiYXV0aCIsInNldExvY2FsUGVyc2lzdGVuY2UiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsInNpZ25JbldpdGhSZWRpcmVjdCIsIkdvb2dsZUF1dGhQcm92aWRlciIsImRvYyIsImNvbGxlY3Rpb24iLCJhZGREb2MiLCJzZXREb2MiLCJnZXREb2MiLCJzdHlsZXMiLCJOYXZiYXIiLCJsb2dpbiIsImxvZ2luV2l0aEdvb2dsZSIsIlNpZ25pbiIsImVtYWlsIiwic2V0RW1haWwiLCJwYXNzd29yZCIsInNldFBhc3N3b3JkIiwiZGlzcGF0Y2giLCJ1bnN1YnNjcmliZSIsIm9uQXV0aFN0YXRlQ2hhbmdlZCIsInVzZXIiLCJkaXNwbGF5TmFtZSIsInJvdXRlciIsInB1c2giLCJoYW5kbGVDbGljayIsImhhbmRsZVNpZ25pbiIsImhhbmRsZVNpZ25pbldpdGhHb29nbGUiLCJwcm92aWRlciIsImRpdiIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImgyIiwidGl0bGUiLCJpbnB1dCIsInR5cGUiLCJwbGFjZWhvbGRlciIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwidGFyZ2V0IiwiYnIiLCJidG5Db250YWluZXIiLCJidXR0b24iLCJidG4iLCJvbkNsaWNrIiwicCIsImNoYW5nZSIsImJ0bkdvb2xlSW1nIiwiYnRuR29vZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/signin.js\n"));

/***/ })

});