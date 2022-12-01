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
  let brick_names = Object.keys(bricks);
  let brick =
    bricks[brick_names[Math.floor(Math.random() * (brick_names.length - 1))]];
  let bricks_with_id = [];
  for (let row of brick) {
    let row_with_id = row.map((el) => (el == 0 ? 0 : { id: id }));
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

  return { left, right, down };
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
export {
  cleanMatrix,
  randomBrick,
  extremeBlocks,
  landed,
  filledRows,
  touched_brick,
  blockIndices,
};
