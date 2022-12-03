import React from "react";

function ScoreBoard({ score }) {
  return (
    <div className="scoreboard_container">
      <div className="score_label">Score</div>
      <div className="score">{score}</div>
    </div>
  );
}

export default ScoreBoard;
