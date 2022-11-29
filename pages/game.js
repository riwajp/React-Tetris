import { useState, useEffect, useMemo, useRef } from "react";
import { cleanMatrix, randomBrick } from "../utils";
import Matrix from "./components/Matrix";

function game() {
  const mat = useMemo(() => cleanMatrix(), []);
  const [matrix, setMatrix] = useState(mat); //main matrix
  const matrix_ref = useRef(matrix);
  const [send_brick, setSendBrick] = useState(1);
  const send_brick_ref = useRef(send_brick);
  const [current_brick_id, setCurrentBtickId] = useState(0);
  const current_brick_id_ref = useRef(current_brick_id);
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

      setSendBrick(0);

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

    setSendBrick(flag);
    setCurrentBtickId(current_brick_id + (flag ? 1 : 0));
  };
  //==============================================================
  //==============================================================

  const handleKeyDown = (k) => {
    let temp_matrix = JSON.parse(JSON.stringify(matrix));
    if (k.code == "ArrowRight") {
      for (let i = temp_matrix.length - 1; i >= 0; i--) {
        for (let j = temp_matrix[i].length - 1; j >= 0; j--) {
          if (
            temp_matrix[i][j] != 0 &&
            temp_matrix[i][j]["id"] == current_brick_id
          ) {
            temp_matrix[i][j + 1] = temp_matrix[i][j];
            temp_matrix[i][j] = 0;
          }
        }
      }
    }
    setMatrix(temp_matrix);
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
    send_brick_ref.current = send_brick;
    current_brick_id_ref.current = current_brick_id;
  }, [matrix, send_brick, current_brick_id]);

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
