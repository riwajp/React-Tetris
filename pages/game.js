import { useState, useEffect, useMemo, useRef } from "react";
import { cleanMatrix, randomBrick } from "../utils";
import Matrix from "./components/Matrix";
import ScoreBoard from "./components/ScoreBoard";
import { extremeBlocks } from "../utils";
import {
  blockIndices,
  filledRows,
  touched_brick,
  rotateMatrix,
  copy,
  landIndices,
} from "../utils";

function game() {
  const mat = useMemo(() => cleanMatrix(), []);
  const [main_matrix, setMainMatrix] = useState(mat); //main matrix
  const [current_block, setCurrentBlock] = useState();
  const matrix_ref = useRef(main_matrix);
  const send_brick_ref = useRef(1);
  const current_brick_id_ref = useRef(0);
  const [score, setScore] = useState(0);
  const score_ref = useRef(score);
  const [land_index, setLandIndex] = useState(
    landIndices(main_matrix, current_brick_id_ref.current)
  );

  useEffect(() => {
    matrix_ref.current = main_matrix;
    setLandIndex(landIndices(main_matrix, current_brick_id_ref.current));
  }, [main_matrix]);

  //==============================================================
  //==============================================================

  const rotateBlock = () => {
    try {
      let rotated_block = rotateMatrix(current_block);

      let diffs = {};
      for (let i in current_block) {
        for (let j in current_block[i]) {
          let block = current_block[i][j];
          for (let eqv_i in rotated_block) {
            for (let eqv_j in rotated_block[eqv_i]) {
              if (
                rotated_block[eqv_i][eqv_j] != 0 &&
                rotated_block[eqv_i][eqv_j].indices == `${i}${j}`
              ) {
                diffs[`${i}${j}`] = [eqv_i - i, eqv_j - j];
              }
            }
          }
        }
      }
      var flag = 1;

      let temp_matrix = JSON.parse(JSON.stringify(matrix_ref.current));
      let transposed_positions = [];
      for (let i of blockIndices(
        matrix_ref.current,
        current_brick_id_ref.current
      )) {
        let block = copy(main_matrix[i[1]][i[0]]);
        let diff = diffs[`${block.indices[0]}${block.indices[1]}`];
        block.indices = `${parseInt(block.indices[0]) + diff[0]}${[
          parseInt(block.indices[1]) + diff[1],
        ]}`;
        if (
          temp_matrix[i[1] + diff[0]][i[0] + diff[1]] != undefined &&
          (temp_matrix[i[1] + diff[0]][i[0] + diff[1]] == 0 ||
            temp_matrix[i[1] + diff[0]][i[0] + diff[1]].id ==
              current_brick_id_ref.current)
        ) {
          temp_matrix[i[1] + diff[0]][i[0] + diff[1]] = block;
        } else {
          flag = 0;
          break;
        }
        transposed_positions.push([i[1] + diff[0], i[0] + diff[1]]);
      }
      if (flag) {
        for (let i in temp_matrix) {
          for (let j in temp_matrix[i]) {
            if (
              !transposed_positions.filter((p) => p[0] == i && p[1] == j)
                .length &&
              temp_matrix[i][j]?.id == current_brick_id_ref.current
            ) {
              temp_matrix[i][j] = 0;
            }
          }
        }

        for (let i in rotated_block) {
          for (let j in rotated_block[i]) {
            if (rotated_block[i][j] != 0) {
              rotated_block[i][j].indices = `${i}${j}`;
            }
          }
        }
        setCurrentBlock(rotated_block);
        setMainMatrix(temp_matrix);
        matrix_ref.current = temp_matrix;
      }
    } catch {
      console.log("Error rotate");
    }
  };
  //let new_matrix = JSON.parse(JSON.stringify(matrix));

  const mainLoop = () => {
    try {
      let matrix = matrix_ref.current;

      if (
        matrix[3].filter((e) => e != 0 && e.id != current_brick_id_ref.current)
          .length > 0
      ) {
        window.alert("Lost, Score : " + score_ref.current);
        setGameOver(1);
        return;
      }

      let send_brick = send_brick_ref.current;
      let current_brick_id = current_brick_id_ref.current;
      //if send_brick==1, then send a random brick
      if (send_brick) {
        let temp_matrix = JSON.parse(JSON.stringify(matrix));

        let new_brick = JSON.parse(
          JSON.stringify(randomBrick(current_brick_id))
        );
        setCurrentBlock(new_brick);
        let new_block_start_index = Math.floor(Math.random() * 8);
        for (let i = 0; i <= 3; i++) {
          for (
            let j = new_block_start_index;
            j <= new_block_start_index + 3;
            j++
          ) {
            temp_matrix[i][j] = new_brick[i][j - new_block_start_index];
          }
        }
        setMainMatrix(temp_matrix);
        matrix_ref.current = temp_matrix;

        send_brick_ref.current = 0;
        return;
      }
      //==============================================================
      //==============================================================

      //movements of block i.e. matrix elements
      let temp_matrix = JSON.parse(JSON.stringify(matrix));
      var flag = 1;
      if (!touched_brick(matrix, current_brick_id_ref.current).down) {
        for (let i = temp_matrix.length - 1; i >= 0; i--) {
          for (let j = temp_matrix[i].length - 1; j >= 0; j--) {
            if (
              temp_matrix[i][j].id == current_brick_id_ref.current &&
              temp_matrix[i + 1] &&
              temp_matrix[i + 1][j] == 0
            ) {
              temp_matrix[i + 1][j] = temp_matrix[i][j];
              temp_matrix[i][j] = 0;

              flag = 0;
            }
          }
        }
      }

      send_brick_ref.current = flag;
      current_brick_id_ref.current = current_brick_id + (flag ? 1 : 0);

      //delete rows
      let filled_rows = filledRows(matrix, current_brick_id_ref.current);
      for (let i of filled_rows) {
        for (let j in temp_matrix[i]) {
          temp_matrix[i][j] = 0;
        }
        for (let k = i - 1; k >= 0; k--) {
          temp_matrix[k + 1] = temp_matrix[k];
        }
      }
      setMainMatrix(temp_matrix);
      matrix_ref.current = temp_matrix;
      setScore(score_ref.current + filled_rows.length * 12);
      score_ref.current = score_ref.current + filled_rows.length * 12;
    } catch {
      console.log("error main loop");
    }
  };
  //==============================================================
  //==============================================================

  const moveBrick = (x, y) => {
    let id = current_brick_id_ref.current;
    let temp_matrix = JSON.parse(JSON.stringify(main_matrix));

    if (x == 0 && y > 0) {
      landIndices(matrix_ref.current, current_brick_id_ref.current);

      while (y > 0) {
        if (!touched_brick(temp_matrix, id).down) {
          let block_indices = blockIndices(temp_matrix, id);

          for (let i of block_indices) {
            let _x = i[0];
            let _y = i[1];

            temp_matrix[_y + 1][_x] = temp_matrix[_y][_x];
            temp_matrix[_y][_x] = 0;
          }
        }
        y--;
      }
    } else {
      for (let i = temp_matrix.length - 1; i >= 0; i--) {
        for (
          let j = x > 0 ? temp_matrix[i].length - 1 : 0;
          (x > 0 && j >= 0) ||
          (x < 0 && j < temp_matrix[i].length) ||
          (y != 0 && j < temp_matrix[i].length);
          x > 0 ? j-- : j++
        ) {
          if (temp_matrix[i][j] != 0 && temp_matrix[i][j]["id"] == id) {
            temp_matrix[i][j + x] = temp_matrix[i][j];

            temp_matrix[i][j] = 0;
          }
        }
      }
    }
    setMainMatrix(temp_matrix);
  };
  const handleKeyDown = (k) => {
    let extremeIndices = extremeBlocks(
      main_matrix,
      current_brick_id_ref.current
    );

    if (
      k.code == "ArrowRight" &&
      !touched_brick(main_matrix, current_brick_id_ref.current).right
    ) {
      moveBrick(1, 0);
    } else if (
      k.code == "ArrowLeft" &&
      !touched_brick(main_matrix, current_brick_id_ref.current).left
    ) {
      moveBrick(-1, 0);
    } else if (
      k.code == "ArrowDown" &&
      !touched_brick(main_matrix, current_brick_id_ref.current).down
    ) {
      moveBrick(0, 1, extremeIndices.down);
    } else if (k.code == "ArrowUp") {
      rotateBlock();
    } else if (k.code == "Space") {
      moveBrick(
        0,
        landIndices(matrix_ref.current, current_brick_id_ref.current)
      );
    }
  };

  //set main loop and event listeners
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, current_block, rotateBlock]);

  useEffect(() => {
    setInterval(() => {
      mainLoop();
    }, 700);
  }, []);

  //==============================================================
  //==============================================================

  return (
    <div className="game">
      <div className="matrix">
        <ScoreBoard score={score} />
        <Matrix
          matrix={main_matrix}
          land_index={land_index}
          id={current_brick_id_ref}
        />
      </div>
    </div>
  );
}

export default game;
