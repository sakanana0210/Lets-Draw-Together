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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: function() { return /* binding */ login; },\n/* harmony export */   logout: function() { return /* binding */ logout; },\n/* harmony export */   register: function() { return /* binding */ register; }\n/* harmony export */ });\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./store/actions/actionTypes.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../firebase.js */ \"./firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\n\n\n\nconst login = (email, password)=>{\n    return async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            dispatch({\n                type: \"LOGIN_SUCCESS\",\n                payload: {\n                    loginUserUid: uid\n                }\n            });\n        } catch (error) {\n            dispatch({\n                type: \"LOGIN_ERROR\",\n                payload: error.message\n            });\n        }\n    };\n};\nconst register = (email, password, userName)=>{\n    return async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            // const usersCollection = collection(db, 'users');\n            // await setDoc(doc(usersCollection, uid), {\n            //     uid: uid,\n            //     name: userName,\n            //     email: email\n            // });\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_SUCCESS,\n                payload: {\n                    loginUserUid: uid,\n                    loginUserName: userName\n                }\n            });\n        } catch (error) {\n            console.error(\"註冊失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst logout = ()=>{\n    return async (dispatch)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signOut)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_SUCCESS,\n                payload: {\n                    isAuthenticated: false,\n                    errorMessage: null,\n                    loginUserUid: null,\n                    loginUserName: null\n                }\n            });\n        } catch (error) {\n            console.error(\"登出失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9hY3Rpb25zL2F1dGhBY3Rpb25zQ3JlYXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTBIO0FBQ087QUFDckU7QUFDUTtBQUU3RCxNQUFNa0IsUUFBUSxDQUFDQyxPQUFPQztJQUN6QixPQUFPLE9BQU9DO1FBQ1YsSUFBSTtZQUNBLE1BQU1SLGlFQUFtQkE7WUFDekIsTUFBTVMsaUJBQWlCLE1BQU1kLHlFQUEwQkEsQ0FBQ0ksOENBQUlBLEVBQUVPLE9BQU9DO1lBQ3JFLE1BQU1HLE9BQU9ELGVBQWVDLElBQUk7WUFDaEMsTUFBTUMsTUFBTUQsS0FBS0MsR0FBRztZQUNwQkgsU0FBUztnQkFBRUksTUFBTTtnQkFBbUJDLFNBQVM7b0JBQ3pDQyxjQUFjSDtnQkFFbEI7WUFDQTtRQUNKLEVBQUUsT0FBT0ksT0FBTztZQUNaUCxTQUFTO2dCQUFFSSxNQUFNO2dCQUFlQyxTQUFTRSxNQUFNQyxPQUFPO1lBQUM7UUFDM0Q7SUFDSjtBQUNKLEVBQUU7QUFFSyxNQUFNQyxXQUFXLENBQUNYLE9BQU9DLFVBQVVXO0lBQ3RDLE9BQU8sT0FBT1Y7UUFDVixJQUFJO1lBQ0EsTUFBTVIsaUVBQW1CQTtZQUN6QixNQUFNUyxpQkFBaUIsTUFBTWIsNkVBQThCQSxDQUFDRyw4Q0FBSUEsRUFBRU8sT0FBT0M7WUFDekUsTUFBTUcsT0FBT0QsZUFBZUMsSUFBSTtZQUNoQyxNQUFNQyxNQUFNRCxLQUFLQyxHQUFHO1lBQ3BCLG1EQUFtRDtZQUNuRCw0Q0FBNEM7WUFDNUMsZ0JBQWdCO1lBQ2hCLHNCQUFzQjtZQUN0QixtQkFBbUI7WUFDbkIsTUFBTTtZQUNOSCxTQUFTO2dCQUFFSSxNQUFNekIsMERBQWdCQTtnQkFBRzBCLFNBQVM7b0JBQ3JDQyxjQUFjSDtvQkFDZFEsZUFBZUQ7Z0JBQ25CO1lBQ0o7UUFDSixFQUFFLE9BQU9ILE9BQU87WUFDWkssUUFBUUwsS0FBSyxDQUFDLFFBQVFBLE1BQU1NLElBQUksRUFBRU4sTUFBTUMsT0FBTztZQUMvQ1IsU0FBUztnQkFBRUksTUFBTXhCLHdEQUFjQTtnQkFBRXlCLFNBQVNFLE1BQU1DLE9BQU87WUFBQztRQUNoRTtJQUFDO0FBQ0wsRUFBRTtBQUVLLE1BQU1NLFNBQVM7SUFDbEIsT0FBTyxPQUFPZDtRQUNWLElBQUk7WUFDQSxNQUFNZixzREFBT0EsQ0FBQ00sOENBQUlBO1lBQ2xCUyxTQUFTO2dCQUFFSSxNQUFNdkIsd0RBQWNBO2dCQUFHd0IsU0FBUztvQkFDdkNVLGlCQUFpQjtvQkFDakJDLGNBQWM7b0JBQ2RWLGNBQWM7b0JBQ2RLLGVBQWU7Z0JBQ25CO1lBQ0o7UUFDQSxFQUFFLE9BQU9KLE9BQU87WUFDWkssUUFBUUwsS0FBSyxDQUFDLFFBQVFBLE1BQU1NLElBQUksRUFBRU4sTUFBTUMsT0FBTztZQUMvQ1IsU0FBUztnQkFBRUksTUFBTXRCLHNEQUFZQTtnQkFBRXVCLFNBQVNFLE1BQU1DLE9BQU87WUFBQztRQUM5RDtJQUFDO0FBQ0wsRUFBRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zdG9yZS9hY3Rpb25zL2F1dGhBY3Rpb25zQ3JlYXRvci5qcz8yZTAyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJFR0lTVEVSX1NVQ0NFU1MsIFJFR0lTVEVSX0VSUk9SLCBMT0dPVVRfU1VDQ0VTUywgTE9HT1VUX0VSUk9SLCBMT0dJTl9TVUNDRVNTLCBMT0dJTl9FUlJPUn0gZnJvbSAnLi9hY3Rpb25UeXBlcyc7XHJcbmltcG9ydCB7IHNpZ25PdXQsIGdldEF1dGgsIHNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkLCBjcmVhdGVVc2VyV2l0aEVtYWlsQW5kUGFzc3dvcmQsIHNpZ25JbldpdGhSZWRpcmVjdCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBkYiwgYXV0aCwgc2V0TG9jYWxQZXJzaXN0ZW5jZX0gZnJvbSAnL2ZpcmViYXNlLmpzJztcclxuaW1wb3J0IHsgZG9jLCBjb2xsZWN0aW9uLCBhZGREb2MsIHNldERvY30gZnJvbSBcImZpcmViYXNlL2ZpcmVzdG9yZVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luID0gKGVtYWlsLCBwYXNzd29yZCkgPT4ge1xyXG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHNldExvY2FsUGVyc2lzdGVuY2UoKTtcclxuICAgICAgICAgICAgY29uc3QgdXNlckNyZWRlbnRpYWwgPSBhd2FpdCBzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gdXNlckNyZWRlbnRpYWwudXNlcjtcclxuICAgICAgICAgICAgY29uc3QgdWlkID0gdXNlci51aWQ7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogJ0xPR0lOX1NVQ0NFU1MnICwgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGxvZ2luVXNlclVpZDogdWlkLFxyXG4gICAgICAgICAgICAgICAgLy8gbG9naW5Vc2VyTmFtZTogdXNlck5hbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0dJTl9FUlJPUicsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gKGVtYWlsLCBwYXNzd29yZCwgdXNlck5hbWUpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBhd2FpdCBzZXRMb2NhbFBlcnNpc3RlbmNlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXJDcmVkZW50aWFsID0gYXdhaXQgY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkKGF1dGgsIGVtYWlsLCBwYXNzd29yZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHVzZXIgPSB1c2VyQ3JlZGVudGlhbC51c2VyO1xyXG4gICAgICAgICAgICBjb25zdCB1aWQgPSB1c2VyLnVpZDtcclxuICAgICAgICAgICAgLy8gY29uc3QgdXNlcnNDb2xsZWN0aW9uID0gY29sbGVjdGlvbihkYiwgJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgIC8vIGF3YWl0IHNldERvYyhkb2ModXNlcnNDb2xsZWN0aW9uLCB1aWQpLCB7XHJcbiAgICAgICAgICAgIC8vICAgICB1aWQ6IHVpZCxcclxuICAgICAgICAgICAgLy8gICAgIG5hbWU6IHVzZXJOYW1lLFxyXG4gICAgICAgICAgICAvLyAgICAgZW1haWw6IGVtYWlsXHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFJFR0lTVEVSX1NVQ0NFU1MsICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiB1aWQsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogdXNlck5hbWVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign6Ki75YaK5aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogUkVHSVNURVJfRVJST1IsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9fTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXQgPSAoKSA9PiB7XHJcbiAgICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoKSA9PiB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgYXdhaXQgc2lnbk91dChhdXRoKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dPVVRfU1VDQ0VTUywgIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJVaWQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBsb2dpblVzZXJOYW1lOiBudWxsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfnmbvlh7rlpLHmlZcnLCBlcnJvci5jb2RlLCBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBMT0dPVVRfRVJST1IsIHBheWxvYWQ6IGVycm9yLm1lc3NhZ2UgfSk7XHJcbiAgICB9fTtcclxufTsiXSwibmFtZXMiOlsiUkVHSVNURVJfU1VDQ0VTUyIsIlJFR0lTVEVSX0VSUk9SIiwiTE9HT1VUX1NVQ0NFU1MiLCJMT0dPVVRfRVJST1IiLCJMT0dJTl9TVUNDRVNTIiwiTE9HSU5fRVJST1IiLCJzaWduT3V0IiwiZ2V0QXV0aCIsInNpZ25JbldpdGhFbWFpbEFuZFBhc3N3b3JkIiwiY3JlYXRlVXNlcldpdGhFbWFpbEFuZFBhc3N3b3JkIiwic2lnbkluV2l0aFJlZGlyZWN0IiwiZGIiLCJhdXRoIiwic2V0TG9jYWxQZXJzaXN0ZW5jZSIsImRvYyIsImNvbGxlY3Rpb24iLCJhZGREb2MiLCJzZXREb2MiLCJsb2dpbiIsImVtYWlsIiwicGFzc3dvcmQiLCJkaXNwYXRjaCIsInVzZXJDcmVkZW50aWFsIiwidXNlciIsInVpZCIsInR5cGUiLCJwYXlsb2FkIiwibG9naW5Vc2VyVWlkIiwiZXJyb3IiLCJtZXNzYWdlIiwicmVnaXN0ZXIiLCJ1c2VyTmFtZSIsImxvZ2luVXNlck5hbWUiLCJjb25zb2xlIiwiY29kZSIsImxvZ291dCIsImlzQXV0aGVudGljYXRlZCIsImVycm9yTWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/actions/authActionsCreator.js\n"));

/***/ })

});