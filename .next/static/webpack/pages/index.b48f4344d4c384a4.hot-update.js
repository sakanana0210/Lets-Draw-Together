"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./store/actions/authActionsCreator.js":
/*!*********************************************!*\
  !*** ./store/actions/authActionsCreator.js ***!
  \*********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   login: function() { return /* binding */ login; },\n/* harmony export */   logout: function() { return /* binding */ logout; },\n/* harmony export */   register: function() { return /* binding */ register; }\n/* harmony export */ });\n/* harmony import */ var _actionTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./actionTypes */ \"./store/actions/actionTypes.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"./node_modules/firebase/auth/dist/esm/index.esm.js\");\n/* harmony import */ var _firebase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../firebase.js */ \"./firebase.js\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/firestore */ \"./node_modules/firebase/firestore/dist/esm/index.esm.js\");\n\n\n\n\nconst login = (email, password)=>async (dispatch)=>{\n        try {\n            await (0,_firebase_js__WEBPACK_IMPORTED_MODULE_2__.setLocalPersistence)();\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signInWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            dispatch({\n                type: \"LOGIN_SUCCESS\",\n                payload: {\n                    uid: user.uid,\n                    name: user.displayName,\n                    email: user.email\n                }\n            });\n        } catch (error) {\n            dispatch({\n                type: \"LOGIN_ERROR\",\n                payload: error.message\n            });\n        }\n    };\nconst register = (email, password, userName)=>{\n    return async (dispatch)=>{\n        try {\n            const userCredential = await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.createUserWithEmailAndPassword)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth, email, password);\n            const user = userCredential.user;\n            const uid = user.uid;\n            // const usersCollection = collection(db, 'users');\n            // await setDoc(doc(usersCollection, uid), {\n            //     uid: uid,\n            //     name: userName,\n            //     email: email\n            // });\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_SUCCESS,\n                payload: {\n                    loginUserUid: uid,\n                    loginUserName: userName\n                }\n            });\n        } catch (error) {\n            console.error(\"註冊失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.REGISTER_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\nconst logout = ()=>{\n    return async (dispatch)=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.signOut)(_firebase_js__WEBPACK_IMPORTED_MODULE_2__.auth);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_SUCCESS,\n                payload: {\n                    isAuthenticated: false,\n                    errorMessage: null,\n                    loginUserUid: null,\n                    loginUserName: null\n                }\n            });\n        } catch (error) {\n            console.error(\"登出失敗\", error.code, error.message);\n            dispatch({\n                type: _actionTypes__WEBPACK_IMPORTED_MODULE_0__.LOGOUT_ERROR,\n                payload: error.message\n            });\n        }\n    };\n};\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zdG9yZS9hY3Rpb25zL2F1dGhBY3Rpb25zQ3JlYXRvci5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTBIO0FBQ087QUFDckU7QUFDUTtBQUU3RCxNQUFNa0IsUUFBUSxDQUFDQyxPQUFPQyxXQUFhLE9BQU9DO1FBQzdDLElBQUk7WUFDQSxNQUFNUixpRUFBbUJBO1lBQ3pCLE1BQU1TLGlCQUFpQixNQUFNZCx5RUFBMEJBLENBQUNJLDhDQUFJQSxFQUFFTyxPQUFPQztZQUNyRSxNQUFNRyxPQUFPRCxlQUFlQyxJQUFJO1lBQ2hDRixTQUFTO2dCQUFFRyxNQUFNO2dCQUFrQkMsU0FBUztvQkFDcENDLEtBQUtILEtBQUtHLEdBQUc7b0JBQ2JDLE1BQU1KLEtBQUtLLFdBQVc7b0JBQ3RCVCxPQUFPSSxLQUFLSixLQUFLO2dCQUNyQjtZQUNKO1FBQ0osRUFBRSxPQUFPVSxPQUFPO1lBQ1pSLFNBQVM7Z0JBQUVHLE1BQU07Z0JBQWVDLFNBQVNJLE1BQU1DLE9BQU87WUFBQztRQUMzRDtJQUNKLEVBQUU7QUFFSyxNQUFNQyxXQUFXLENBQUNaLE9BQU9DLFVBQVVZO0lBQ3RDLE9BQU8sT0FBT1g7UUFDVixJQUFJO1lBQ0EsTUFBTUMsaUJBQWlCLE1BQU1iLDZFQUE4QkEsQ0FBQ0csOENBQUlBLEVBQUVPLE9BQU9DO1lBQ3pFLE1BQU1HLE9BQU9ELGVBQWVDLElBQUk7WUFDaEMsTUFBTUcsTUFBTUgsS0FBS0csR0FBRztZQUNwQixtREFBbUQ7WUFDbkQsNENBQTRDO1lBQzVDLGdCQUFnQjtZQUNoQixzQkFBc0I7WUFDdEIsbUJBQW1CO1lBQ25CLE1BQU07WUFDTkwsU0FBUztnQkFBRUcsTUFBTXhCLDBEQUFnQkE7Z0JBQUd5QixTQUFTO29CQUNyQ1EsY0FBY1A7b0JBQ2RRLGVBQWVGO2dCQUNuQjtZQUNKO1FBQ0osRUFBRSxPQUFPSCxPQUFPO1lBQ1pNLFFBQVFOLEtBQUssQ0FBQyxRQUFRQSxNQUFNTyxJQUFJLEVBQUVQLE1BQU1DLE9BQU87WUFDL0NULFNBQVM7Z0JBQUVHLE1BQU12Qix3REFBY0E7Z0JBQUV3QixTQUFTSSxNQUFNQyxPQUFPO1lBQUM7UUFDaEU7SUFBQztBQUNMLEVBQUU7QUFFSyxNQUFNTyxTQUFTO0lBQ2xCLE9BQU8sT0FBT2hCO1FBQ1YsSUFBSTtZQUNBLE1BQU1mLHNEQUFPQSxDQUFDTSw4Q0FBSUE7WUFDbEJTLFNBQVM7Z0JBQUVHLE1BQU10Qix3REFBY0E7Z0JBQUd1QixTQUFTO29CQUN2Q2EsaUJBQWlCO29CQUNqQkMsY0FBYztvQkFDZE4sY0FBYztvQkFDZEMsZUFBZTtnQkFDbkI7WUFDSjtRQUNBLEVBQUUsT0FBT0wsT0FBTztZQUNaTSxRQUFRTixLQUFLLENBQUMsUUFBUUEsTUFBTU8sSUFBSSxFQUFFUCxNQUFNQyxPQUFPO1lBQy9DVCxTQUFTO2dCQUFFRyxNQUFNckIsc0RBQVlBO2dCQUFFc0IsU0FBU0ksTUFBTUMsT0FBTztZQUFDO1FBQzlEO0lBQUM7QUFDTCxFQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3N0b3JlL2FjdGlvbnMvYXV0aEFjdGlvbnNDcmVhdG9yLmpzPzJlMDIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUkVHSVNURVJfU1VDQ0VTUywgUkVHSVNURVJfRVJST1IsIExPR09VVF9TVUNDRVNTLCBMT0dPVVRfRVJST1IsIExPR0lOX1NVQ0NFU1MsIExPR0lOX0VSUk9SfSBmcm9tICcuL2FjdGlvblR5cGVzJztcclxuaW1wb3J0IHsgc2lnbk91dCwgZ2V0QXV0aCwgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQsIGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCwgc2lnbkluV2l0aFJlZGlyZWN0IH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XHJcbmltcG9ydCB7IGRiLCBhdXRoLCBzZXRMb2NhbFBlcnNpc3RlbmNlfSBmcm9tICcvZmlyZWJhc2UuanMnO1xyXG5pbXBvcnQgeyBkb2MsIGNvbGxlY3Rpb24sIGFkZERvYywgc2V0RG9jfSBmcm9tIFwiZmlyZWJhc2UvZmlyZXN0b3JlXCI7XHJcblxyXG5leHBvcnQgY29uc3QgbG9naW4gPSAoZW1haWwsIHBhc3N3b3JkKSA9PiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgYXdhaXQgc2V0TG9jYWxQZXJzaXN0ZW5jZSgpO1xyXG4gICAgICAgIGNvbnN0IHVzZXJDcmVkZW50aWFsID0gYXdhaXQgc2lnbkluV2l0aEVtYWlsQW5kUGFzc3dvcmQoYXV0aCwgZW1haWwsIHBhc3N3b3JkKTtcclxuICAgICAgICBjb25zdCB1c2VyID0gdXNlckNyZWRlbnRpYWwudXNlcjtcclxuICAgICAgICBkaXNwYXRjaCh7IHR5cGU6ICdMT0dJTl9TVUNDRVNTJyAsIHBheWxvYWQ6IHtcclxuICAgICAgICAgICAgICAgIHVpZDogdXNlci51aWQsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiB1c2VyLmRpc3BsYXlOYW1lLFxyXG4gICAgICAgICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiAnTE9HSU5fRVJST1InLCBwYXlsb2FkOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfVxyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyID0gKGVtYWlsLCBwYXNzd29yZCwgdXNlck5hbWUpID0+IHtcclxuICAgIHJldHVybiBhc3luYyAoZGlzcGF0Y2gpID0+IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyQ3JlZGVudGlhbCA9IGF3YWl0IGNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZChhdXRoLCBlbWFpbCwgcGFzc3dvcmQpO1xyXG4gICAgICAgICAgICBjb25zdCB1c2VyID0gdXNlckNyZWRlbnRpYWwudXNlcjtcclxuICAgICAgICAgICAgY29uc3QgdWlkID0gdXNlci51aWQ7XHJcbiAgICAgICAgICAgIC8vIGNvbnN0IHVzZXJzQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb24oZGIsICd1c2VycycpO1xyXG4gICAgICAgICAgICAvLyBhd2FpdCBzZXREb2MoZG9jKHVzZXJzQ29sbGVjdGlvbiwgdWlkKSwge1xyXG4gICAgICAgICAgICAvLyAgICAgdWlkOiB1aWQsXHJcbiAgICAgICAgICAgIC8vICAgICBuYW1lOiB1c2VyTmFtZSxcclxuICAgICAgICAgICAgLy8gICAgIGVtYWlsOiBlbWFpbFxyXG4gICAgICAgICAgICAvLyB9KTtcclxuICAgICAgICAgICAgZGlzcGF0Y2goeyB0eXBlOiBSRUdJU1RFUl9TVUNDRVNTLCAgcGF5bG9hZDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2luVXNlclVpZDogdWlkLFxyXG4gICAgICAgICAgICAgICAgICAgIGxvZ2luVXNlck5hbWU6IHVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+iou+WGiuWkseaVlycsIGVycm9yLmNvZGUsIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICBkaXNwYXRjaCh7IHR5cGU6IFJFR0lTVEVSX0VSUk9SLCBwYXlsb2FkOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfX07XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgbG9nb3V0ID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCkgPT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHNpZ25PdXQoYXV0aCk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HT1VUX1NVQ0NFU1MsICBwYXlsb2FkOiB7XHJcbiAgICAgICAgICAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyVWlkOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgbG9naW5Vc2VyTmFtZTogbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign55m75Ye65aSx5pWXJywgZXJyb3IuY29kZSwgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGRpc3BhdGNoKHsgdHlwZTogTE9HT1VUX0VSUk9SLCBwYXlsb2FkOiBlcnJvci5tZXNzYWdlIH0pO1xyXG4gICAgfX07XHJcbn07Il0sIm5hbWVzIjpbIlJFR0lTVEVSX1NVQ0NFU1MiLCJSRUdJU1RFUl9FUlJPUiIsIkxPR09VVF9TVUNDRVNTIiwiTE9HT1VUX0VSUk9SIiwiTE9HSU5fU1VDQ0VTUyIsIkxPR0lOX0VSUk9SIiwic2lnbk91dCIsImdldEF1dGgiLCJzaWduSW5XaXRoRW1haWxBbmRQYXNzd29yZCIsImNyZWF0ZVVzZXJXaXRoRW1haWxBbmRQYXNzd29yZCIsInNpZ25JbldpdGhSZWRpcmVjdCIsImRiIiwiYXV0aCIsInNldExvY2FsUGVyc2lzdGVuY2UiLCJkb2MiLCJjb2xsZWN0aW9uIiwiYWRkRG9jIiwic2V0RG9jIiwibG9naW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiZGlzcGF0Y2giLCJ1c2VyQ3JlZGVudGlhbCIsInVzZXIiLCJ0eXBlIiwicGF5bG9hZCIsInVpZCIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsImVycm9yIiwibWVzc2FnZSIsInJlZ2lzdGVyIiwidXNlck5hbWUiLCJsb2dpblVzZXJVaWQiLCJsb2dpblVzZXJOYW1lIiwiY29uc29sZSIsImNvZGUiLCJsb2dvdXQiLCJpc0F1dGhlbnRpY2F0ZWQiLCJlcnJvck1lc3NhZ2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./store/actions/authActionsCreator.js\n"));

/***/ })

});