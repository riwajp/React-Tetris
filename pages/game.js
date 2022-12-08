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

import NextBlock from "./components/NextBlock";
import SmallMatrix from "./components/SmallMatrix";

function game({ scores, bricks, username }) {
  /*
  console.log(
    scores?.filter((s) => {
      console.log(Date.now() / 1000 - s.ts);
      return Date.now() / 1000 - s.ts <= 20;
    })
  );
  */

  // console.log(JSON.parse(router.query.bricks));
  const mat = useMemo(() => cleanMatrix(), []);

  const [main_matrix, setMainMatrix] = useState(mat); //main matrix
  const game_running = useRef(1);

  const matrix_ref = useRef(main_matrix);
  const send_brick_ref = useRef(1);
  const current_brick_id_ref = useRef(0);
  const initial_block = useMemo(() => {
    if (bricks) {
      return randomBrick(current_brick_id_ref.current, JSON.parse(bricks));
    } else {
      return randomBrick(current_brick_id_ref.current);
    }
  }, []);
  const is_high = useRef(0);
  const [current_block, setCurrentBlock] = useState();
  const [next_block, setNextBlock] = useState(initial_block);
  const next_block_ref = useRef(next_block);
  const [score, setScore] = useState(0);
  const score_ref = useRef(score);
  const [land_index, setLandIndex] = useState(
    landIndices(main_matrix, current_brick_id_ref.current)
  );

  useEffect(() => {
    matrix_ref.current = main_matrix;
    setLandIndex(landIndices(main_matrix, current_brick_id_ref.current));
  }, [main_matrix]);

  //=================================================================================================================

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
      console.log("Rotate Error");
    }
  };

  //=================================================================================================================

  const setHighScore = () => {
    let high_scores = JSON.parse(sessionStorage.getItem("scores"));

    let score_temp = score_ref.current;
    if (high_scores && username && !bricks) {
      let high_score_user_index = high_scores.findIndex(
        (s) => s.name == username
      );
      var arr;
      if (high_score_user_index != -1) {
        high_scores[high_score_user_index].score = Math.max(
          high_scores[high_score_user_index].score,
          score_temp
        );
        high_scores[high_score_user_index].ts = Math.floor(Date.now() / 1000);
        high_scores[high_score_user_index].matrix = matrix_ref.current;
        high_scores[high_score_user_index].latest_score = score_ref.current;

        arr = [...high_scores];
      } else {
        arr = [
          ...high_scores,
          {
            name: username,
            score: score_temp,
            ts: Math.floor(Date.now() / 1000),
            matrix: matrix_ref.current,
            latest_score: score_ref.current,
          },
        ];
      }
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arr),
      };

      fetch(process.env.NEXT_PUBLIC_DB, requestOptions)
        .then((data) => {
          is_high.current = 1;
        })
        .catch((err) => console.log("error", err));
    }
  };

  //=================================================================================================================

  const sendBrick = () => {
    let temp_matrix = JSON.parse(JSON.stringify(matrix_ref.current));
    var new_brick;
    if (bricks) {
      new_brick = randomBrick(
        current_brick_id_ref.current + 1,
        JSON.parse(bricks)
      );
    } else {
      new_brick = JSON.parse(
        JSON.stringify(randomBrick(current_brick_id_ref.current + 1))
      );
    }

    let new_block_start_index = Math.floor(Math.random() * 8);
    for (let i = 0; i <= 3; i++) {
      for (let j = new_block_start_index; j <= new_block_start_index + 3; j++) {
        temp_matrix[i][j] =
          next_block_ref.current[i][j - new_block_start_index];
      }
    }
    setMainMatrix(temp_matrix);
    matrix_ref.current = temp_matrix;

    send_brick_ref.current = 0;

    setCurrentBlock(next_block_ref.current);
    setNextBlock(new_brick);

    next_block_ref.current = new_brick;
  };

  const updateBrickPositions = () => {
    let temp_matrix = JSON.parse(JSON.stringify(matrix_ref.current));
    var flag = 1;
    if (!touched_brick(matrix_ref.current, current_brick_id_ref.current).down) {
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
    current_brick_id_ref.current =
      current_brick_id_ref.current + (flag ? 1 : 0);
    setMainMatrix(temp_matrix);
    matrix_ref.current = temp_matrix;
  };
  const deleteFilledRows = () => {
    let temp_matrix = copy(matrix_ref.current);
    let filled_rows = filledRows(
      matrix_ref.current,
      current_brick_id_ref.current
    );
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
  };
  const mainLoop = () => {
    setHighScore();

    //Check game over
    if (
      matrix_ref.current[3].filter(
        (e) => e != 0 && e.id != current_brick_id_ref.current
      ).length > 0
    ) {
      window.alert("Game Over! Score : " + score_ref.current);

      game_running.current = 0;

      return;
    }

    if (send_brick_ref.current) {
      sendBrick();
    } else {
      updateBrickPositions();
    }

    deleteFilledRows();
  };
  //=================================================================================================================

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
    matrix_ref.current = temp_matrix;
  };

  //=================================================================================================================

  const handleKeyDown = (k) => {
    let extremeIndices = extremeBlocks(
      main_matrix,
      current_brick_id_ref.current
    );
    if (k.key == "p") {
      game_running.current = !game_running.current;
    }

    if (!game_running.current) return;
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

  //=================================================================================================================

  //set main loop and event listeners===============================================================================
  useEffect(() => {
    document.body.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, current_block, rotateBlock]);
  //==================================================================================================================

  //Main loop for the game===========================================================================================
  useEffect(() => {
    let intv = setInterval(() => {
      if (game_running.current) {
        mainLoop();
      }
    }, 700);
    return () => clearInterval(intv);
  }, []);
  //====================================================================================================================

  return (
    <div className="game">
      <div className="overlay">
        <div className="top">
          <ScoreBoard score={score} />
          <NextBlock next_block={next_block} current_block={current_block} />
        </div>
        <div className="small_matrices">
          {scores
            ?.filter(
              (s) => s.name != username && Date.now() / 1000 - s.ts <= 20
            )
            .map((s) => (
              <div className="small_matrix">
                <div className="small_matrix_top">
                  <span className="player_name">{s.name}</span>
                  <span className="player_score">{s.latest_score}</span>
                </div>
                <SmallMatrix matrix={s.matrix} />
              </div>
            ))}
        </div>
        <div className="matrix">
          <Matrix
            matrix={main_matrix}
            land_index={land_index}
            id={current_brick_id_ref}
          />
        </div>
      </div>
    </div>
  );
}

game.getInitialProps = async ({ query }) => {
  const { bricks, username } = query;

  return { bricks, username };
};

export default game;
