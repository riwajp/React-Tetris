import { useState, useEffect, useMemo } from "react";
import { cleanMatrix, randomBrick } from "../utils";
import Matrix from "./components/Matrix";

function game() {
  const mat = useMemo(() => cleanMatrix(), []);
  const [matrix, setMatrix] = useState(mat); //main matrix
  const [send_brick, setSendBrick] = useState(1);
  //==============================================================
  //==============================================================

  const mainLoop = () => {
    //if send_brick==1, then send a random brick
    if (send_brick) {
      let temp_matrix = [...matrix];
      temp_matrix = temp_matrix.slice(4);
      temp_matrix.unshift(...randomBrick());
      setMatrix(temp_matrix);
      setSendBrick(0);

      return;
    }
    //==============================================================
    //==============================================================

    //movements of block i.e. matrix elements
    let temp_matrix = [...matrix];
    var flag = 1;
    for (let i = temp_matrix.length - 1; i >= 0; i--) {
      for (let j = temp_matrix[i].length; j >= 0; j--) {
        if (
          temp_matrix[i][j] == 1 &&
          temp_matrix[i + 1] &&
          temp_matrix[i + 1][j] == 0
        ) {
          temp_matrix[i][j] = 0;
          temp_matrix[i + 1][j] = 1;
          flag = 0;
        }
      }
    }
    setMatrix(temp_matrix);

    setSendBrick(flag);
  };
  //==============================================================
  //==============================================================

  const handleKeyDown = (k) => {
    let temp_matrix = [...matrix];
    console.log(k);
    if (k.code == "ArrowRight") {
      for (let i = temp_matrix.length - 1; i >= 0; i--) {
        for (let j = temp_matrix[i].length; j >= 0; j--) {
          if (
            temp_matrix[i][j] == 1 &&
            temp_matrix[i + 1] &&
            temp_matrix[j + 2] &&
            temp_matrix[i + 1][j] == 0
          ) {
            temp_matrix[i][j] = 0;
            temp_matrix[i][j + 1] = 1;
          }
        }
      }
    }
    console.log("s");
    setMatrix(temp_matrix);
  };

  //set main loop and event listeners
  useEffect(() => {
    let interval = setInterval(() => {
      mainLoop();
    }, 500);
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
      clearInterval(interval);
    };
  }, [mainLoop]);

  //==============================================================
  //==============================================================

  return (
    <div className="game">
      <Matrix matrix={matrix} />
    </div>
  );
}

export default game;
