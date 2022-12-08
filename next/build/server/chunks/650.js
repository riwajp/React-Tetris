"use strict";
exports.id = 650;
exports.ids = [650];
exports.modules = {

/***/ 921:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function Block({ color , filled , border , land_block , small , not_mine  }) {
    let class_name = `block  ${!small && border ? "border" : ""} ${filled ? "filled " : ""} ${land_block ? "land_block" : ""}  ${small || not_mine ? "small" : ""}  ${filled ? color : ""} ${not_mine ? "not_mine_block" : ""}`;
    let box_shadow = `${filled ? color : ""}`;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: class_name
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);


/***/ }),

/***/ 9650:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(921);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(104);



function Matrix({ matrix , land_index , id  }) {
    let block_indices = (0,_utils__WEBPACK_IMPORTED_MODULE_2__/* .blockIndices */ .UC)(matrix, id?.current);
    let land_indices = block_indices.map((b)=>[
            b[1] + land_index,
            b[0]
        ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: matrix?.map((row, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                children: row?.map((element, j)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Block__WEBPACK_IMPORTED_MODULE_1__["default"], {
                        color: element == 0 ? "" : element.color,
                        filled: element != 0,
                        border: i == 3,
                        land_block: land_indices.filter((b)=>b[0] == i && b[1] == j).length
                    }, `${i} ${j}`))
            }, i))
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Matrix);


/***/ }),

/***/ 104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "UC": () => (/* binding */ blockIndices),
  "cF": () => (/* binding */ cleanMatrix),
  "JG": () => (/* binding */ copy),
  "Iq": () => (/* binding */ extremeBlocks),
  "e9": () => (/* binding */ filledRows),
  "IG": () => (/* binding */ landIndices),
  "K9": () => (/* binding */ randomBrick),
  "Bo": () => (/* binding */ rotateMatrix),
  "T5": () => (/* binding */ touched_brick)
});

// UNUSED EXPORTS: landed

;// CONCATENATED MODULE: ./bricks.json
const bricks_namespaceObject = JSON.parse('{"i_block":[[1,0,0,0],[1,0,0,0],[1,0,0,0],[1,0,0,0]],"j_block":[[1,0,0,0],[1,1,1,0],[0,0,0,0],[0,0,0,0]],"l_block":[[0,0,0,0],[0,0,1,0],[1,1,1,0],[0,0,0,0]],"o_block":[[1,1,0,0],[1,1,0,0],[0,0,0,0],[0,0,0,0]],"s_block":[[0,0,0,0],[0,1,1,0],[1,1,0,0],[0,0,0,0]],"t_block":[[0,0,0,0],[0,1,0,0],[1,1,1,0],[0,0,0,0]],"z_block":[[0,0,0,0],[1,1,0,0],[0,1,1,0],[0,0,0,0]]}');
;// CONCATENATED MODULE: ./utils.js

const cleanMatrix = ()=>{
    let row = [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ];
    let matrix = [];
    for(let i = 0; i < 20; i++){
        matrix[i] = [
            ...row
        ];
    }
    return matrix;
};
const randomBrick = (id, bricks = bricks_namespaceObject)=>{
    let colors = [
        "pink",
        "orange",
        "blue",
        "green"
    ];
    let color = colors[Math.floor(Math.random() * (colors.length - 1))];
    let brick_names = Object.keys(bricks);
    let brick = bricks[brick_names[Math.floor(Math.random() * (brick_names.length - 1))]];
    let bricks_with_id = [];
    for(let i in brick){
        let row = brick[i];
        let row_with_id = row.map((el, j)=>el == 0 ? 0 : {
                id: id,
                indices: `${i}${j}`,
                color: color
            });
        bricks_with_id.push(row_with_id);
    }
    return bricks_with_id;
};
const blockIndices = (matrix, id)=>{
    let indices = [];
    for(let i in matrix){
        let row = matrix[i];
        for(let j in row){
            let block = row[j];
            if (block != 0 && block.id == id) {
                indices.push([
                    parseInt(j),
                    parseInt(i)
                ]);
            }
        }
    }
    indices.reverse();
    return indices;
};
const extremeBlocks = (matrix, id)=>{
    let indices = blockIndices(matrix, id);
    let x = indices.map((i)=>i[0]);
    let y = indices.map((i)=>i[1]);
    let left = Math.min(...x);
    let right = Math.max(...x);
    let down = Math.max(...y);
    let up = Math.min(...y);
    return {
        left,
        right,
        down,
        up
    };
};
const landed = (matrix, id)=>{
    let indices = blockIndices(matrix, id);
    let down = extremeBlocks(matrix, id).down;
    let bottom_block_indices = indices.filter((i)=>i[1] == down);
    let flag = 0;
    for(let i in bottom_block_indices){
        let x = bottom_block_indices[i][0];
        let y = bottom_block_indices[i][1];
        if (matrix[y + 1] == undefined || matrix[y + 1][x] != 0) {
            flag = 1;
            break;
        }
    }
    return flag;
};
const filledRows = (matrix, id)=>{
    let filled_rows = [];
    for(let i in matrix){
        let row = matrix[i];
        if (row.filter((e)=>e == 0 || e.id == id).length == 0) {
            filled_rows.push(i);
        }
    }
    return filled_rows;
};
const touched_brick = (matrix, id)=>{
    let block_indices = blockIndices(matrix, id);
    let flag = {
        left: 0,
        right: 0,
        down: 0
    };
    for (let i of block_indices){
        let y = i[1];
        let x = i[0];
        flag.left = x == 0 || matrix[y][x - 1] != 0 && matrix[y][x - 1].id != id || flag.left;
        flag.right = x == 11 || matrix[y][x + 1] != 0 && matrix[y][x + 1].id != id || flag.right;
        flag.down = y == 19 || matrix[y + 1][x] && matrix[y + 1][x].id != id || flag.down;
    }
    return flag;
};
const rotateMatrix = (matrix)=>{
    let new_matrix = JSON.parse(JSON.stringify(matrix));
    let transposed_positions = [];
    for(let i in matrix){
        let row = matrix[i];
        for(let j in row){
            if (matrix[i][j] != 0) {
                new_matrix[j][4 - i] = matrix[i][j];
                //new_matrix[j][4 - i].new_indices = `${j}${4 - i}`;
                transposed_positions.push([
                    j,
                    4 - i
                ]);
            }
        }
    }
    for(let i1 in new_matrix){
        for(let j1 in new_matrix[i1]){
            if (!transposed_positions.filter((p)=>p[0] == i1 && p[1] == j1).length) {
                new_matrix[i1][j1] = 0;
            }
        }
    }
    var min_col = 3;
    var min_row = 3;
    for (let row1 of new_matrix){
        min_col = row1.findIndex((b)=>b?.id >= 0) > -1 ? Math.min(row1.findIndex((b)=>b?.id >= 0), min_col) : min_col;
    }
    for(let i2 in new_matrix){
        for(let j2 in new_matrix[i2]){
            if (j2 - min_col >= 0) {
                new_matrix[i2][j2 - min_col] = new_matrix[i2][j2];
                new_matrix[i2][j2] = 0;
            }
        }
    }
    return new_matrix;
};
const copy = (matrix)=>{
    return JSON.parse(JSON.stringify(matrix));
};
const landIndices = (matrix, id)=>{
    let extreme_indices = extremeBlocks(matrix, id);
    let bottom_index = extreme_indices.down;
    let block_indices = blockIndices(matrix, id);
    var go_down_by = 0;
    if (bottom_index != -Infinity) {
        for(let j = bottom_index; j < 19; j++){
            var flag = 1;
            for (let i of block_indices){
                let block = matrix[i[1] + 1][i[0]];
                if (block == 0 || block.id == id) {} else {
                    flag = 0;
                    return go_down_by;
                }
            }
            if (flag == 0) {
                return go_down_by;
            } else {
                go_down_by += 1;
                bottom_index += 1;
                for (let i1 of block_indices){
                    i1[1] += 1;
                }
            }
        }
    }
    return go_down_by;
};



/***/ })

};
;