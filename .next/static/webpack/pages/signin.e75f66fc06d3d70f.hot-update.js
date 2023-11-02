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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: function() { return /* binding */ login; },\n/* harmony export */   loginWithGoogle: function() { return /* binding */ loginWithGoogle; },\n/* harmony export */   loginWithGoogleGetUser: function() { return /* binding */ loginWithGoogleGetUser; },\n/* harmony export */   logout: function() { return /* binding */ logout; },\n/* harmony export */   register: function() { return /* binding */ register; }\n/* harmony export */ });\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./store/actions/actionTypes.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../firebase.js */ \"./firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\n\n\n\nconst login = (email, password)=>{\n    return async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_SUCCESS,\n                payload: {\n                    loginUserUid: uid,\n                    loginFrom: \"Email\"\n                }\n            });\n        } catch (error) {\n            console.error(\"登入失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst loginWithGoogle = ()=>{\n    return async (dispatch)=>{\n        try {\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_SUCCESS,\n                payload: \"Google\"\n            });\n        } catch (error) {\n            console.error(\"登入失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst loginWithGoogleGetUser = ()=>{\n    return async (dispatch)=>{\n        try {\n            _firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth.onAuthStateChanged((user)=>{\n                const uid = user.uid;\n                const displayName = user.displayName;\n                console.log(uid, displayName);\n                dispatch({\n                    type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_GET_SUCCESS,\n                    payload: {\n                        loginUserUid: uid,\n                        loginUserName: displayName\n                    }\n                });\n            });\n        } catch (error) {\n            console.error(\"取得失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGIN_GOOGLE_GET_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst register = (email, password, userName)=>{\n    return async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            // const usersCollection = collection(db, 'users');\n            // await setDoc(doc(usersCollection, uid), {\n            //     uid: uid,\n            //     name: userName,\n            //     email: email\n            // });\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_SUCCESS,\n                payload: {\n                    loginUserUid: uid,\n                    loginUserName: userName\n                }\n            });\n        } catch (error) {\n            console.error(\"註冊失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst logout = ()=>{\n    return async (dispatch)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signOut)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_SUCCESS,\n                payload: {\n                    isAuthenticated: false,\n                    errorMessage: null,\n                    loginUserUid: null,\n                    loginUserName: null\n                }\n            });\n        } catch (error) {\n            console.error(\"登出失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE1BQU1oQixzREFBT0EsQ0FBQ08sOENBQUlBO1lBQ2xCUyxTQUFTO2dCQUFFSSxNQUFNNUIsd0RBQWNBO2dCQUFHNkIsU0FBUztvQkFDdkNnQixpQkFBaUI7b0JBQ2pCQyxjQUFjO29CQUNkaEIsY0FBYztvQkFDZFcsZUFBZTtnQkFDbkI7WUFDSjtRQUNBLEVBQUUsT0FBT1QsT0FBTztZQUNaQyxRQUFRRCxLQUFLLENBQUMsUUFBUUEsTUFBTUUsSUFBSSxFQUFFRixNQUFNRyxPQUFPO1lBQy9DWCxTQUFTO2dCQUFFSSxNQUFNM0Isc0RBQVlBO2dCQUFFNEIsU0FBU0csTUFBTUcsT0FBTztZQUFDO1FBQzlEO0lBQUM7QUFDTCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3N0b3JlL2FjdGlvbnMvYXV0aEFjdGlvbnNDcmVhdG9yLmpzPzJlMDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUkVHSVNURVJfU1VDQ0VTUywgUkVHSVNURVJfRVJST1IsIExPR09VVF9TVUNDRVNTLCBMT0dPVVRfRVJST1IsIExPR0lOX1NVQ0NFU1MsIExPR0lOX0VSUk9SLCBMT0dJTl9HT09HTEVfU1VDQ0VTUywgTE9HSU5fR09PR0xFX0VSUk9SLCBMT0dJTl9HT09HTEVfR0VUX1NVQ0NFU1MsIExPR0lOX0dPT0dMRV9HRVRfRVJST1J9IGZyb20gJy4vYWN0aW9uVHlwZXMnO1xyXG5pbXBvcnQgeyBzaWduT3V0LCBnZXRBdXRoLCBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCwgY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkLCBzaWduSW5XaXRoUmVkaXJlY3QsIEdvb2dsZUF1dGhQcm92aWRlcn0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XHJcbmltcG9ydCB7IGRiLCBhdXRoLCBzZXRMb2NhbFBlcnNpc3RlbmNlfSBmcm9tICcvZmlyZWJhc2UuanMnO1xyXG5pbXBvcnQgeyBkb2MsIGNvbGxlY3Rpb24sIGFkZERvYywgc2V0RG9jfSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbG9naW4gPSAoZW1haWwsIHBhc3N3b3JkKSA9PiB7XHJcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgc2V0TG9jYWxQZXJzaXN0ZW5jZSgpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyQ3JlZGVudGlhbCA9IGF3YWl0IHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyQ3JlZGVudGlhbC51c2VyO1xyXG4gICAgICAgICAgICBjb25zdCB1aWQgPSB1c2VyLnVpZDtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dJTl9TVUNDRVNTICwgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGxvZ2luVXNlclVpZDogdWlkLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Gcm9tOiBcIkVtYWlsXCJcclxuICAgICAgICAgICAgICAgIC8vIGxvZ2luVXNlck5hbWU6IHVzZXJOYW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75YWl5aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HSU5fRVJST1IsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luV2l0aEdvb2dsZSA9ICgpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IExPR0lOX0dPT0dMRV9TVUNDRVNTICwgcGF5bG9hZDogXCJHb29nbGVcIn0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+eZu+WFpeWkseaVlycsIGVycm9yLmNvZGUsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IExPR0lOX0dPT0dMRV9FUlJPUiwgcGF5bG9hZDogZXJyb3IubWVzc2FnZSB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9naW5XaXRoR29vZ2xlR2V0VXNlciA9ICgpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZCgodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdWlkID0gdXNlci51aWQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXNwbGF5TmFtZSA9IHVzZXIuZGlzcGxheU5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1aWQsIGRpc3BsYXlOYW1lKTtcclxuICAgICAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HSU5fR09PR0xFX0dFVF9TVUNDRVNTICwgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBsb2dpblVzZXJVaWQ6IHVpZCxcclxuICAgICAgICAgICAgICAgICAgICBsb2dpblVzZXJOYW1lOiBkaXNwbGF5TmFtZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCflj5blvpflpLHmlZcnLCBlcnJvci5jb2RlLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dJTl9HT09HTEVfR0VUX0VSUk9SLCBwYXlsb2FkOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gKGVtYWlsLCBwYXNzd29yZCwgdXNlck5hbWUpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBzZXRMb2NhbFBlcnNpc3RlbmNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJDcmVkZW50aWFsID0gYXdhaXQgY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyQ3JlZGVudGlhbC51c2VyO1xyXG4gICAgICAgICAgICBjb25zdCB1aWQgPSB1c2VyLnVpZDtcclxuICAgICAgICAgICAgLy8gY29uc3QgdXNlcnNDb2xsZWN0aW9uID0gY29sbGVjdGlvbihkYiwgJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgIC8vIGF3YWl0IHNldERvYyhkb2ModXNlcnNDb2xsZWN0aW9uLCB1aWQpLCB7XHJcbiAgICAgICAgICAgIC8vICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgLy8gICAgIG5hbWU6IHVzZXJOYW1lLFxyXG4gICAgICAgICAgICAvLyAgICAgZW1haWw6IGVtYWlsXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFJFR0lTVEVSX1NVQ0NFU1MsICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiB1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogdXNlck5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign6Ki75YaK5aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogUkVHSVNURVJfRVJST1IsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgc2lnbk91dChhdXRoKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dPVVRfU1VDQ0VTUywgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJVaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJOYW1lOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfnmbvlh7rlpLHmlZcnLCBlcnJvci5jb2RlLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dPVVRfRVJST1IsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9fTtcclxufTsiXSwibmFtZXMiOlsiUkVHSVNURVJfU1VDQ0VTUyIsIlJFR0lTVEVSX0VSUk9SIiwiTE9HT1VUX1NVQ0NFU1MiLCJMT0dPVVRfRVJST1IiLCJMT0dJTl9TVUNDRVNTIiwiTE9HSU5fRVJST1IiLCJMT0dJTl9HT09HTEVfU1VDQ0VTUyIsIkxPR0lOX0dPT0dMRV9FUlJPUiIsIkxPR0lOX0dPT0dMRV9HRVRfU1VDQ0VTUyIsIkxPR0lOX0dPT0dMRV9HRVRfRVJST1IiLCJzaWduT3V0IiwiZ2V0QXV0aCIsInNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkIiwiY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkIiwic2lnbkluV2l0aFJlZGlyZWN0IiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwiZGIiLCJhdXRoIiwic2V0TG9jYWxQZXJzaXN0ZW5jZSIsImRvYyIsImNvbGxlY3Rpb24iLCJhZGREb2MiLCJzZXREb2MiLCJsb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJkaXNwYXRjaCIsInVzZXJDcmVkZW50aWFsIiwidXNlciIsInVpZCIsInR5cGUiLCJwYXlsb2FkIiwibG9naW5Vc2VyVWlkIiwibG9naW5Gcm9tIiwiZXJyb3IiLCJjb25zb2xlIiwiY29kZSIsIm1lc3NhZ2UiLCJsb2dpbldpdGhHb29nbGUiLCJsb2dpbldpdGhHb29nbGVHZXRVc2VyIiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiZGlzcGxheU5hbWUiLCJsb2ciLCJsb2dpblVzZXJOYW1lIiwicmVnaXN0ZXIiLCJ1c2VyTmFtZSIsImxvZ291dCIsImlzQXV0aGVudGljYXRlZCIsImVycm9yTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/actions/authActionsCreator.js\n"));

/***/ })

});