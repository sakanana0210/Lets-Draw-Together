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

/***/ "./store/actions/authActionsCreator.js":
/*!*********************************************!*\
  !*** ./store/actions/authActionsCreator.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: function() { return /* binding */ login; },\n/* harmony export */   loginWithGoogle: function() { return /* binding */ loginWithGoogle; },\n/* harmony export */   loginWithGoogleGetUser: function() { return /* binding */ loginWithGoogleGetUser; },\n/* harmony export */   logout: function() { return /* binding */ logout; },\n/* harmony export */   register: function() { return /* binding */ register; }\n/* harmony export */ });\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./store/actions/actionTypes.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../firebase.js */ \"./firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\n\n\n\nconst login = (email, password)=>{\n    return async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_SUCCESS,\n                payload: {\n                    loginUserUid: uid\n                }\n            });\n        } catch (error) {\n            console.error(\"登入失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst loginWithGoogle = ()=>{\n    return async (dispatch)=>{\n        try {\n            const provider = new firebase_auth__WEBPACK_IMPORTED_MODULE_1__.GoogleAuthProvider();\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const result = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithRedirect)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, provider);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_SUCCESS\n            });\n        } catch (error) {\n            console.error(\"登入失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst loginWithGoogleGetUser = ()=>{\n    return async (dispatch)=>{\n        try {\n            _firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth.onAuthStateChanged((user)=>{\n                const uid = user.uid;\n                const displayName = user.displayName;\n                dispatch({\n                    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_GET_SUCCESS,\n                    payload: {\n                        loginUserUid: uid,\n                        loginUserName: displayName\n                    }\n                });\n            });\n        } catch (error) {\n            console.error(\"取得失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_GET_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst register = (email, password, userName)=>{\n    return async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            // const usersCollection = collection(db, 'users');\n            // await setDoc(doc(usersCollection, uid), {\n            //     uid: uid,\n            //     name: userName,\n            //     email: email\n            // });\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_SUCCESS,\n                payload: {\n                    loginUserUid: uid,\n                    loginUserName: userName\n                }\n            });\n        } catch (error) {\n            console.error(\"註冊失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst logout = ()=>{\n    return async (dispatch)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signOut)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_SUCCESS,\n                payload: {\n                    isAuthenticated: false,\n                    errorMessage: null,\n                    loginUserUid: null,\n                    loginUserName: null\n                }\n            });\n        } catch (error) {\n            console.error(\"登出失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFO0FBRUssTUFBTVUsU0FBUztJQUNsQixPQUFPLE9BQU9wQjtRQUNWLElBQUk7WUFDQSxNQUFNaEIsc0RBQU9BLENBQUNPLDhDQUFJQTtZQUNsQlMsU0FBUztnQkFBRUksTUFBTTVCLHdEQUFjQTtnQkFBRzZCLFNBQVM7b0JBQ3ZDZ0IsaUJBQWlCO29CQUNqQkMsY0FBYztvQkFDZGhCLGNBQWM7b0JBQ2RXLGVBQWU7Z0JBQ25CO1lBQ0o7UUFDQSxFQUFFLE9BQU9WLE9BQU87WUFDWkMsUUFBUUQsS0FBSyxDQUFDLFFBQVFBLE1BQU1FLElBQUksRUFBRUYsTUFBTUcsT0FBTztZQUMvQ1YsU0FBUztnQkFBRUksTUFBTTNCLHNEQUFZQTtnQkFBRTRCLFNBQVNFLE1BQU1HLE9BQU87WUFBQztRQUM5RDtJQUFDO0FBQ0wsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zdG9yZS9hY3Rpb25zL2F1dGhBY3Rpb25zQ3JlYXRvci5qcz8yZTAyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJFR0lTVEVSX1NVQ0NFU1MsIFJFR0lTVEVSX0VSUk9SLCBMT0dPVVRfU1VDQ0VTUywgTE9HT1VUX0VSUk9SLCBMT0dJTl9TVUNDRVNTLCBMT0dJTl9FUlJPUiwgTE9HSU5fR09PR0xFX1NVQ0NFU1MsIExPR0lOX0dPT0dMRV9FUlJPUiwgTE9HSU5fR09PR0xFX0dFVF9TVUNDRVNTLCBMT0dJTl9HT09HTEVfR0VUX0VSUk9SfSBmcm9tICcuL2FjdGlvblR5cGVzJztcclxuaW1wb3J0IHsgc2lnbk91dCwgZ2V0QXV0aCwgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCwgc2lnbkluV2l0aFJlZGlyZWN0LCBHb29nbGVBdXRoUHJvdmlkZXJ9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBkYiwgYXV0aCwgc2V0TG9jYWxQZXJzaXN0ZW5jZX0gZnJvbSAnL2ZpcmViYXNlLmpzJztcclxuaW1wb3J0IHsgZG9jLCBjb2xsZWN0aW9uLCBhZGREb2MsIHNldERvY30gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luID0gKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHNldExvY2FsUGVyc2lzdGVuY2UoKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlckNyZWRlbnRpYWwgPSBhd2FpdCBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gdXNlckNyZWRlbnRpYWwudXNlcjtcclxuICAgICAgICAgICAgY29uc3QgdWlkID0gdXNlci51aWQ7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HSU5fU1VDQ0VTUyAsICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJVaWQ6IHVpZCxcclxuICAgICAgICAgICAgICAgIC8vIGxvZ2luVXNlck5hbWU6IHVzZXJOYW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75YWl5aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HSU5fRVJST1IsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luV2l0aEdvb2dsZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm92aWRlciA9IG5ldyBHb29nbGVBdXRoUHJvdmlkZXIoKTtcclxuICAgICAgICAgICAgYXdhaXQgc2V0TG9jYWxQZXJzaXN0ZW5jZSgpO1xyXG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBzaWduSW5XaXRoUmVkaXJlY3QoYXV0aCwgcHJvdmlkZXIpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IExPR0lOX0dPT0dMRV9TVUNDRVNTIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eZu+WFpeWkseaVlycsIGVycm9yLmNvZGUsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IExPR0lOX0dPT0dMRV9FUlJPUiwgcGF5bG9hZDogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9naW5XaXRoR29vZ2xlR2V0VXNlciA9ICgpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdWlkID0gdXNlci51aWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHVzZXIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IExPR0lOX0dPT0dMRV9HRVRfU1VDQ0VTUyAsICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiB1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogZGlzcGxheU5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign5Y+W5b6X5aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HSU5fR09PR0xFX0dFVF9FUlJPUiwgcGF5bG9hZDogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZWdpc3RlciA9IChlbWFpbCwgcGFzc3dvcmQsIHVzZXJOYW1lKSA9PiB7XHJcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgc2V0TG9jYWxQZXJzaXN0ZW5jZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyQ3JlZGVudGlhbCA9IGF3YWl0IGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gdXNlckNyZWRlbnRpYWwudXNlcjtcclxuICAgICAgICAgICAgY29uc3QgdWlkID0gdXNlci51aWQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHVzZXJzQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24oZGIsICd1c2VycycpO1xyXG4gICAgICAgICAgICAvLyBhd2FpdCBzZXREb2MoZG9jKHVzZXJzQ29sbGVjdGlvbiwgdWlkKSwge1xyXG4gICAgICAgICAgICAvLyAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIC8vICAgICBuYW1lOiB1c2VyTmFtZSxcclxuICAgICAgICAgICAgLy8gICAgIGVtYWlsOiBlbWFpbFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBSRUdJU1RFUl9TVUNDRVNTLCAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2luVXNlclVpZDogdWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2luVXNlck5hbWU6IHVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+iou+WGiuWkseaVlycsIGVycm9yLmNvZGUsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFJFR0lTVEVSX0VSUk9SLCBwYXlsb2FkOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfX07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHNpZ25PdXQoYXV0aCk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HT1VUX1NVQ0NFU1MsICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75Ye65aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HT1VUX0VSUk9SLCBwYXlsb2FkOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfX07XHJcbn07Il0sIm5hbWVzIjpbIlJFR0lTVEVSX1NVQ0NFU1MiLCJSRUdJU1RFUl9FUlJPUiIsIkxPR09VVF9TVUNDRVNTIiwiTE9HT1VUX0VSUk9SIiwiTE9HSU5fU1VDQ0VTUyIsIkxPR0lOX0VSUk9SIiwiTE9HSU5fR09PR0xFX1NVQ0NFU1MiLCJMT0dJTl9HT09HTEVfRVJST1IiLCJMT0dJTl9HT09HTEVfR0VUX1NVQ0NFU1MiLCJMT0dJTl9HT09HTEVfR0VUX0VSUk9SIiwic2lnbk91dCIsImdldEF1dGgiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsImNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCIsInNpZ25JbldpdGhSZWRpcmVjdCIsIkdvb2dsZUF1dGhQcm92aWRlciIsImRiIiwiYXV0aCIsInNldExvY2FsUGVyc2lzdGVuY2UiLCJkb2MiLCJjb2xsZWN0aW9uIiwiYWRkRG9jIiwic2V0RG9jIiwibG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiZGlzcGF0Y2giLCJ1c2VyQ3JlZGVudGlhbCIsInVzZXIiLCJ1aWQiLCJ0eXBlIiwicGF5bG9hZCIsImxvZ2luVXNlclVpZCIsImVycm9yIiwiY29uc29sZSIsImNvZGUiLCJtZXNzYWdlIiwibG9naW5XaXRoR29vZ2xlIiwicHJvdmlkZXIiLCJyZXN1bHQiLCJsb2dpbldpdGhHb29nbGVHZXRVc2VyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiZGlzcGxheU5hbWUiLCJsb2dpblVzZXJOYW1lIiwicmVnaXN0ZXIiLCJ1c2VyTmFtZSIsImxvZ291dCIsImlzQXV0aGVudGljYXRlZCIsImVycm9yTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/actions/authActionsCreator.js\n"));

/***/ })

});