"use strict";
(() => {
var exports = {};
exports.id = 203;
exports.ids = [203,34,950,751];
exports.modules = {

/***/ 5156:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ScoreBoard({ score  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "scoreboard_container",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "score_label",
                children: "Score"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "score",
                children: score
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScoreBoard);


/***/ }),

/***/ 1036:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(921);


function SmallMatrix({ matrix  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: matrix?.map((row, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "small_row",
                children: row?.map((element, j)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Block__WEBPACK_IMPORTED_MODULE_1__["default"], {
                        color: element == 0 ? "" : element.color,
                        filled: element != 0,
                        border: i == 3,
                        not_mine: 1
                    }, `${i} ${j}`))
            }, i))
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SmallMatrix);


/***/ }),

/***/ 3206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(104);
/* harmony import */ var _components_Matrix__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9650);
/* harmony import */ var _components_ScoreBoard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5156);
/* harmony import */ var _components_NextBlock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6514);
/* harmony import */ var _components_SmallMatrix__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1036);









function game({ scores , bricks , username  }) {
    /*
  console.log(
    scores?.filter((s) => {
      console.log(Date.now() / 1000 - s.ts);
      return Date.now() / 1000 - s.ts <= 20;
    })
  );
  */ // console.log(JSON.parse(router.query.bricks));
    const mat = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .cleanMatrix */ .cF)(), []);
    const [main_matrix, setMainMatrix] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(mat); //main matrix
    const game_running = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(1);
    const matrix_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(main_matrix);
    const send_brick_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(1);
    const current_brick_id_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const initial_block = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (bricks) {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .randomBrick */ .K9)(current_brick_id_ref.current, JSON.parse(bricks));
        } else {
            return (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .randomBrick */ .K9)(current_brick_id_ref.current);
        }
    }, []);
    const is_high = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(0);
    const [current_block, setCurrentBlock] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const [next_block, setNextBlock] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initial_block);
    const next_block_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(next_block);
    const [score, setScore] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const score_ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(score);
    const [land_index, setLandIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .landIndices */ .IG)(main_matrix, current_brick_id_ref.current));
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        matrix_ref.current = main_matrix;
        setLandIndex((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .landIndices */ .IG)(main_matrix, current_brick_id_ref.current));
    }, [
        main_matrix
    ]);
    //=================================================================================================================
    const rotateBlock = ()=>{
        try {
            let rotated_block = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .rotateMatrix */ .Bo)(current_block);
            let diffs = {};
            for(let i in current_block){
                for(let j in current_block[i]){
                    let block = current_block[i][j];
                    for(let eqv_i in rotated_block){
                        for(let eqv_j in rotated_block[eqv_i]){
                            if (rotated_block[eqv_i][eqv_j] != 0 && rotated_block[eqv_i][eqv_j].indices == `${i}${j}`) {
                                diffs[`${i}${j}`] = [
                                    eqv_i - i,
                                    eqv_j - j
                                ];
                            }
                        }
                    }
                }
            }
            var flag = 1;
            let temp_matrix = JSON.parse(JSON.stringify(matrix_ref.current));
            let transposed_positions = [];
            for (let i1 of (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .blockIndices */ .UC)(matrix_ref.current, current_brick_id_ref.current)){
                let block1 = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .copy */ .JG)(main_matrix[i1[1]][i1[0]]);
                let diff = diffs[`${block1.indices[0]}${block1.indices[1]}`];
                block1.indices = `${parseInt(block1.indices[0]) + diff[0]}${[
                    parseInt(block1.indices[1]) + diff[1]
                ]}`;
                if (temp_matrix[i1[1] + diff[0]][i1[0] + diff[1]] != undefined && (temp_matrix[i1[1] + diff[0]][i1[0] + diff[1]] == 0 || temp_matrix[i1[1] + diff[0]][i1[0] + diff[1]].id == current_brick_id_ref.current)) {
                    temp_matrix[i1[1] + diff[0]][i1[0] + diff[1]] = block1;
                } else {
                    flag = 0;
                    break;
                }
                transposed_positions.push([
                    i1[1] + diff[0],
                    i1[0] + diff[1]
                ]);
            }
            if (flag) {
                for(let i2 in temp_matrix){
                    for(let j1 in temp_matrix[i2]){
                        if (!transposed_positions.filter((p)=>p[0] == i2 && p[1] == j1).length && temp_matrix[i2][j1]?.id == current_brick_id_ref.current) {
                            temp_matrix[i2][j1] = 0;
                        }
                    }
                }
                for(let i3 in rotated_block){
                    for(let j2 in rotated_block[i3]){
                        if (rotated_block[i3][j2] != 0) {
                            rotated_block[i3][j2].indices = `${i3}${j2}`;
                        }
                    }
                }
                setCurrentBlock(rotated_block);
                setMainMatrix(temp_matrix);
                matrix_ref.current = temp_matrix;
            }
        } catch  {
            console.log("Rotate Error");
        }
    };
    //=================================================================================================================
    const setHighScore = ()=>{
        let high_scores = JSON.parse(sessionStorage.getItem("scores"));
        console.log(high_scores);
        let score_temp = score_ref.current;
        if (high_scores && username && !bricks) {
            let high_score_user_index = high_scores.findIndex((s)=>s.name == username);
            var arr;
            if (high_score_user_index != -1) {
                high_scores[high_score_user_index].score = Math.max(high_scores[high_score_user_index].score, score_temp);
                high_scores[high_score_user_index].ts = Math.floor(Date.now() / 1000);
                high_scores[high_score_user_index].matrix = matrix_ref.current;
                high_scores[high_score_user_index].latest_score = score_ref.current;
                arr = [
                    ...high_scores
                ];
                console.log(arr);
            } else {
                arr = [
                    ...high_scores,
                    {
                        name: username,
                        score: score_temp,
                        ts: Math.floor(Date.now() / 1000),
                        matrix: matrix_ref.current,
                        latest_score: score_ref.current
                    }
                ];
            }
            const requestOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(arr)
            };
            fetch("https://jsonblob.com/api/jsonBlob/1050371443183075328", requestOptions).then((data)=>{
                is_high.current = 1;
                console.log(data);
            }).catch((err)=>console.log("error", err));
        }
    };
    //=================================================================================================================
    const sendBrick = ()=>{
        let temp_matrix = JSON.parse(JSON.stringify(matrix_ref.current));
        var new_brick;
        if (bricks) {
            new_brick = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .randomBrick */ .K9)(current_brick_id_ref.current + 1, JSON.parse(bricks));
        } else {
            new_brick = JSON.parse(JSON.stringify((0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .randomBrick */ .K9)(current_brick_id_ref.current + 1)));
        }
        let new_block_start_index = Math.floor(Math.random() * 8);
        for(let i = 0; i <= 3; i++){
            for(let j = new_block_start_index; j <= new_block_start_index + 3; j++){
                temp_matrix[i][j] = next_block_ref.current[i][j - new_block_start_index];
            }
        }
        setMainMatrix(temp_matrix);
        matrix_ref.current = temp_matrix;
        send_brick_ref.current = 0;
        setCurrentBlock(next_block_ref.current);
        setNextBlock(new_brick);
        next_block_ref.current = new_brick;
    };
    const updateBrickPositions = ()=>{
        let temp_matrix = JSON.parse(JSON.stringify(matrix_ref.current));
        var flag = 1;
        if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .touched_brick */ .T5)(matrix_ref.current, current_brick_id_ref.current).down) {
            for(let i = temp_matrix.length - 1; i >= 0; i--){
                for(let j = temp_matrix[i].length - 1; j >= 0; j--){
                    if (temp_matrix[i][j].id == current_brick_id_ref.current && temp_matrix[i + 1] && temp_matrix[i + 1][j] == 0) {
                        temp_matrix[i + 1][j] = temp_matrix[i][j];
                        temp_matrix[i][j] = 0;
                        flag = 0;
                    }
                }
            }
        }
        send_brick_ref.current = flag;
        current_brick_id_ref.current = current_brick_id_ref.current + (flag ? 1 : 0);
        setMainMatrix(temp_matrix);
        matrix_ref.current = temp_matrix;
    };
    const deleteFilledRows = ()=>{
        let temp_matrix = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .copy */ .JG)(matrix_ref.current);
        let filled_rows = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .filledRows */ .e9)(matrix_ref.current, current_brick_id_ref.current);
        for (let i of filled_rows){
            for(let j in temp_matrix[i]){
                temp_matrix[i][j] = 0;
            }
            for(let k = i - 1; k >= 0; k--){
                temp_matrix[k + 1] = temp_matrix[k];
            }
        }
        setMainMatrix(temp_matrix);
        matrix_ref.current = temp_matrix;
        setScore(score_ref.current + filled_rows.length * 12);
        score_ref.current = score_ref.current + filled_rows.length * 12;
    };
    const mainLoop = ()=>{
        setHighScore();
        //Check game over
        if (matrix_ref.current[3].filter((e)=>e != 0 && e.id != current_brick_id_ref.current).length > 0) {
            window.alert("Game Over! Score : " + score_ref.current);
            game_running.current = 0;
            return;
        }
        if (send_brick_ref.current) {
            sendBrick();
        } else {
            updateBrickPositions();
        }
        deleteFilledRows();
    };
    //=================================================================================================================
    const moveBrick = (x, y)=>{
        let id = current_brick_id_ref.current;
        let temp_matrix = JSON.parse(JSON.stringify(main_matrix));
        if (x == 0 && y > 0) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .landIndices */ .IG)(matrix_ref.current, current_brick_id_ref.current);
            while(y > 0){
                if (!(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .touched_brick */ .T5)(temp_matrix, id).down) {
                    let block_indices = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .blockIndices */ .UC)(temp_matrix, id);
                    for (let i of block_indices){
                        let _x = i[0];
                        let _y = i[1];
                        temp_matrix[_y + 1][_x] = temp_matrix[_y][_x];
                        temp_matrix[_y][_x] = 0;
                    }
                }
                y--;
            }
        } else {
            for(let i1 = temp_matrix.length - 1; i1 >= 0; i1--){
                for(let j = x > 0 ? temp_matrix[i1].length - 1 : 0; x > 0 && j >= 0 || x < 0 && j < temp_matrix[i1].length || y != 0 && j < temp_matrix[i1].length; x > 0 ? j-- : j++){
                    if (temp_matrix[i1][j] != 0 && temp_matrix[i1][j]["id"] == id) {
                        temp_matrix[i1][j + x] = temp_matrix[i1][j];
                        temp_matrix[i1][j] = 0;
                    }
                }
            }
        }
        setMainMatrix(temp_matrix);
        matrix_ref.current = temp_matrix;
    };
    //=================================================================================================================
    const handleKeyDown = (k)=>{
        let extremeIndices = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .extremeBlocks */ .Iq)(main_matrix, current_brick_id_ref.current);
        if (k.key == "p") {
            game_running.current = !game_running.current;
        }
        if (!game_running.current) return;
        if (k.code == "ArrowRight" && !(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .touched_brick */ .T5)(main_matrix, current_brick_id_ref.current).right) {
            moveBrick(1, 0);
        } else if (k.code == "ArrowLeft" && !(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .touched_brick */ .T5)(main_matrix, current_brick_id_ref.current).left) {
            moveBrick(-1, 0);
        } else if (k.code == "ArrowDown" && !(0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .touched_brick */ .T5)(main_matrix, current_brick_id_ref.current).down) {
            moveBrick(0, 1, extremeIndices.down);
        } else if (k.code == "ArrowUp") {
            rotateBlock();
        } else if (k.code == "Space") {
            moveBrick(0, (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .landIndices */ .IG)(matrix_ref.current, current_brick_id_ref.current));
        }
    };
    //=================================================================================================================
    //set main loop and event listeners===============================================================================
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        document.body.addEventListener("keydown", handleKeyDown);
        return ()=>{
            document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, [
        handleKeyDown,
        current_block,
        rotateBlock
    ]);
    //==================================================================================================================
    //Main loop for the game===========================================================================================
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        let intv = setInterval(()=>{
            if (game_running.current) {
                mainLoop();
            }
        }, 700);
        return ()=>clearInterval(intv);
    }, []);
    //====================================================================================================================
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "game",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "overlay",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "top",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ScoreBoard__WEBPACK_IMPORTED_MODULE_4__["default"], {
                            score: score
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_NextBlock__WEBPACK_IMPORTED_MODULE_5__["default"], {
                            next_block: next_block,
                            current_block: current_block
                        })
                    ]
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "small_matrices",
                    children: scores?.filter((s)=>s.name != username && Date.now() / 1000 - s.ts <= 20).map((s)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "small_matrix",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "small_matrix_top",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "player_name",
                                            children: s.name
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "player_score",
                                            children: s.latest_score
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_SmallMatrix__WEBPACK_IMPORTED_MODULE_6__["default"], {
                                    matrix: s.matrix
                                })
                            ]
                        }))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "matrix",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Matrix__WEBPACK_IMPORTED_MODULE_3__["default"], {
                        matrix: main_matrix,
                        land_index: land_index,
                        id: current_brick_id_ref
                    })
                })
            ]
        })
    });
}
game.getInitialProps = async ({ query  })=>{
    const { bricks , username  } = query;
    return {
        bricks,
        username
    };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (game);


/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [650,514], () => (__webpack_exec__(3206)));
module.exports = __webpack_exports__;

})();