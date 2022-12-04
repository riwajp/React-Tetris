import bricks from "./bricks.json";

const cleanMatrix = () => {
  let row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix[i] = [...row];
  }
  return matrix;
};

const randomBrick = (id) => {
  let colors = ["#EF9A53", "#59C1BD", "#F7A4A4", "#A9AF7E", "#F0FF42"];
  let color = colors[Math.floor(Math.random() * (colors.length - 1))];

  let brick_names = Object.keys(bricks);
  let brick =
    bricks[brick_names[Math.floor(Math.random() * (brick_names.length - 1))]];
  let bricks_with_id = [];
  for (let i in brick) {
    let row = brick[i];
    let row_with_id = row.map((el, j) =>
      el == 0 ? 0 : { id: id, indices: `${i}${j}`, color: color }
    );
    bricks_with_id.push(row_with_id);
  }
  return bricks_with_id;
};

const blockIndices = (matrix, id) => {
  let indices = [];
  for (let i in matrix) {
    let row = matrix[i];

    for (let j in row) {
      let block = row[j];
      if (block != 0 && block.id == id) {
        indices.push([parseInt(j), parseInt(i)]);
      }
    }
  }
  indices.reverse();
  return indices;
};

const extremeBlocks = (matrix, id) => {
  let indices = blockIndices(matrix, id);
  let x = indices.map((i) => i[0]);
  let y = indices.map((i) => i[1]);
  let left = Math.min(...x);
  let right = Math.max(...x);
  let down = Math.max(...y);
  let up = Math.min(...y);

  return { left, right, down, up };
};

const landed = (matrix, id) => {
  let indices = blockIndices(matrix, id);
  let down = extremeBlocks(matrix, id).down;
  let bottom_block_indices = indices.filter((i) => i[1] == down);
  let flag = 0;
  for (let i in bottom_block_indices) {
    let x = bottom_block_indices[i][0];
    let y = bottom_block_indices[i][1];

    if (matrix[y + 1] == undefined || matrix[y + 1][x] != 0) {
      flag = 1;
      break;
    }
  }
  return flag;
};

const filledRows = (matrix, id) => {
  let filled_rows = [];
  for (let i in matrix) {
    let row = matrix[i];
    if (row.filter((e) => e == 0 || e.id == id).length == 0) {
      filled_rows.push(i);
    }
  }
  return filled_rows;
};

const touched_brick = (matrix, id) => {
  let block_indices = blockIndices(matrix, id);

  let flag = { left: 0, right: 0, down: 0 };
  for (let i of block_indices) {
    let y = i[1];
    let x = i[0];
    flag.left =
      x == 0 ||
      (matrix[y][x - 1] != 0 && matrix[y][x - 1].id != id) ||
      flag.left;

    flag.right =
      x == 11 ||
      (matrix[y][x + 1] != 0 && matrix[y][x + 1].id != id) ||
      flag.right;

    flag.down =
      y == 19 || (matrix[y + 1][x] && matrix[y + 1][x].id != id) || flag.down;
  }
  return flag;
};

const rotateMatrix = (matrix) => {
  let new_matrix = JSON.parse(JSON.stringify(matrix));
  console.log("Original", copy(matrix));
  let transposed_positions = [];

  for (let i in matrix) {
    let row = matrix[i];
    for (let j in row) {
      if (matrix[i][j] != 0) {
        new_matrix[j][4 - i] = matrix[i][j];
        //new_matrix[j][4 - i].new_indices = `${j}${4 - i}`;
        transposed_positions.push([j, 4 - i]);
      }
    }
  }

  for (let i in new_matrix) {
    for (let j in new_matrix[i]) {
      if (!transposed_positions.filter((p) => p[0] == i && p[1] == j).length) {
        new_matrix[i][j] = 0;
      }
    }
  }
  console.log("Rotated", copy(new_matrix));
  var min_col = 3;
  var min_row = 3;
  for (let row of new_matrix) {
    min_col =
      row.findIndex((b) => b?.id >= 0) > -1
        ? Math.min(
            row.findIndex((b) => b?.id >= 0),
            min_col
          )
        : min_col;
  }
  console.log(min_col);
  for (let i in new_matrix) {
    for (let j in new_matrix[i]) {
      if (j - min_col >= 0) {
        new_matrix[i][j - min_col] = new_matrix[i][j];
        new_matrix[i][j] = 0;
      }
    }
  }
  console.log("Final", copy(new_matrix));
  return new_matrix;
};

const copy = (matrix) => {
  return JSON.parse(JSON.stringify(matrix));
};
export {
  cleanMatrix,
  randomBrick,
  extremeBlocks,
  landed,
  filledRows,
  touched_brick,
  blockIndices,
  rotateMatrix,
  copy,
};
