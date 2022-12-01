import { useState, useEffect, useMemo, useRef } from "react";
import { cleanMatrix, randomBrick } from "../utils";
import Matrix from "./components/Matrix";
import { extremeBlocks } from "../utils";
import { blockIndices, filledRows, touched_brick } from "../utils";

function game() {
  const mat = useMemo(() => cleanMatrix(), []);
  const [matrix, setMatrix] = useState(mat); //main matrix
  const matrix_ref = useRef(matrix);
  const send_brick_ref = useRef(1);
  const current_brick_id_ref = useRef(0);

  //==============================================================
  //==============================================================
  const mainLoop = () => {
    let matrix = matrix_ref.current;
    if (
      matrix[5].filter((e) => e != 0 && e.id != current_brick_id_ref.current)
        .length > 0
    ) {
      window.alert("Lost");
      return;
    }
    let send_brick = send_brick_ref.current;
    let current_brick_id = current_brick_id_ref.current;
    //if send_brick==1, then send a random brick
    if (send_brick) {
      let temp_matrix = JSON.parse(JSON.stringify(matrix));
      temp_matrix = temp_matrix.slice(4);
      let new_brick = JSON.parse(JSON.stringify(randomBrick(current_brick_id)));

      temp_matrix.unshift(...new_brick);
      setMatrix(temp_matrix);

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
    for (let i of filledRows(matrix, current_brick_id_ref.current)) {
      for (let j in temp_matrix[i]) {
        temp_matrix[i][j] = 0;
      }
      for (let k = i - 1; k >= 0; k--) {
        temp_matrix[k + 1] = temp_matrix[k];
      }
    }
    setMatrix(temp_matrix);
  };
  //==============================================================
  //==============================================================

  const moveBrick = (x, y) => {
    let id = current_brick_id_ref.current;
    let temp_matrix = JSON.parse(JSON.stringify(matrix));

    if (x == 0 && y > 0) {
      while (y > 0) {
        if (!touched_brick(temp_matrix, id).down) {
          let block_indices = blockIndices(temp_matrix, id);

          for (let i of block_indices) {
            let _x = i[0];
            let _y = i[1];

            temp_matrix[_y + 1][_x] = { id: id };
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
    setMatrix(temp_matrix);
  };
  const handleKeyDown = (k) => {
    let extremeIndices = extremeBlocks(matrix, current_brick_id_ref.current);

    if (
      k.code == "ArrowRight" &&
      !touched_brick(matrix, current_brick_id_ref.current).right
    ) {
      moveBrick(1, 0);
    } else if (
      k.code == "ArrowLeft" &&
      !touched_brick(matrix, current_brick_id_ref.current).left
    ) {
      moveBrick(-1, 0);
    } else if (
      k.code == "ArrowDown" &&
      !touched_brick(matrix, current_brick_id_ref.current).down
    ) {
      moveBrick(0, 3, extremeIndices.down);
    }
  };

  //set main loop and event listeners
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    matrix_ref.current = matrix;
  }, [matrix]);

  useEffect(() => {
    setInterval(() => {
      mainLoop();
    }, 250);
  }, []);
  //==============================================================
  //==============================================================

  return (
    <div className="game">
      <Matrix matrix={matrix} />
    </div>
  );
}

export default game;
