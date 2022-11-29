import bricks from "./bricks.json";

const cleanMatrix = () => {
  let row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  let matrix = [];
  for (let i = 0; i < 20; i++) {
    matrix[i] = [...row];
  }
  console.log(matrix);
  return matrix;
};

const randomBrick = () => {
  let brick_names = Object.keys(bricks);
  let brick =
    bricks[brick_names[Math.floor(Math.random() * (brick_names.length - 1))]];
  return brick;
};
export { cleanMatrix, randomBrick };
