import React from "react";

function ScoreTable({ scores }) {
  return (
    <div>
      {" "}
      <div className="home_scores">
        <div className="home_scores_title glow">Hall of Fame</div>
        {scores ? (
          <table cellSpacing={0}>
            <tbody>
              <tr className="heading">
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>

              {scores
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((s, i) => (
                  <tr className="score_member">
                    <td>{i + 1}.</td>
                    <td>{s.name}</td>

                    <td>{s.score}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          "Loading..."
        )}
      </div>
    </div>
  );
}

export default ScoreTable;
