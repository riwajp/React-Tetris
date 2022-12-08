(() => {
var exports = {};
exports.id = 888;
exports.ids = [888,34,950];
exports.modules = {

/***/ 8484:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function MyApp({ Component , pageProps  }) {
    const [scores, setScores] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        // refresh scores every interval================================================================
        let intv = setInterval(()=>{
            fetch("https://jsonblob.com/api/jsonBlob/1050371443183075328").then((res)=>res.json()).then((res)=>{
                sessionStorage.setItem("scores", JSON.stringify(res));
                setScores(res);
                console.log(res);
            }).catch((err)=>console.log("Error", err));
        }, 1000);
        //===============================================================================================
        //clear interval when the page unmounts
        return ()=>{
            clearInterval(intv);
        };
    //================================================================================================
    }, []);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
        ...pageProps,
        scores: scores
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8484));
module.exports = __webpack_exports__;

})();