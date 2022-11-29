import { useState, useEffect, useMemo, useRef } from "react";
import { cleanMatrix, randomBrick } from "../utils";
import Matrix from "./components/Matrix";

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
    for (let i = temp_matrix.length - 1; i >= 0; i--) {
      for (let j = temp_matrix[i].length; j >= 0; j--) {
        if (
          temp_matrix[i][j] != 0 &&
          temp_matrix[i + 1] &&
          temp_matrix[i + 1][j] == 0
        ) {
          temp_matrix[i + 1][j] = temp_matrix[i][j];
          temp_matrix[i][j] = 0;

          flag = 0;
        }
      }
    }
    setMatrix(temp_matrix);

    send_brick_ref.current = flag;
    current_brick_id_ref.current = current_brick_id + (flag ? 1 : 0);
  };
  //==============================================================
  //==============================================================

  const moveBrick = (x, y) => {
    let temp_matrix = JSON.parse(JSON.stringify(matrix));

    for (let i = temp_matrix.length - 1; i >= 0; i--) {
      for (
        let j = x > 0 ? temp_matrix[i].length - 1 : 0;
        (x > 0 && j >= 0) || (x < 0 && j < temp_matrix[i].length);
        x > 0 ? j-- : j++
      ) {
        if (
          temp_matrix[i][j] != 0 &&
          temp_matrix[i][j]["id"] == current_brick_id_ref.current
        ) {
          temp_matrix[i][j + x] = temp_matrix[i][j];
          temp_matrix[i][j] = 0;
        }

        if (
          temp_matrix[i][j] != 0 &&
          temp_matrix[i][j]["id"] == current_brick_id_ref.current
        ) {
          temp_matrix[i + y][j] = temp_matrix[i][j];
          temp_matrix[i][j] = 0;
        }
      }
    }
    setMatrix(temp_matrix);
  };
  const handleKeyDown = (k) => {
    if (k.code == "ArrowRight") {
      moveBrick(1, 0);
    } else if (k.code == "ArrowLeft") {
      moveBrick(-1, 0);
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
    }, 500);
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
