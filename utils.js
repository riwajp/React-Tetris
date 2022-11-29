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
export { cleanMatrix, randomBrick };
