import React from "react";

function ScoreTable({ scores, max, live }) {
  return (
    <div>
      {" "}
      <div className="home_scores">
        <div className="home_scores_title glow">
          {!live ? "Hall of Fame" : "Online Players"}
        </div>
        {scores ? (
          <table cellSpacing={0}>
            <tbody>
              <tr className="heading">
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                {live ? <th>Filled</th> : ""}
              </tr>

              {scores
                .sort((a, b) => b.score - a.score)
                .slice(0, max)
                .map((s, i) => (
                  <tr className="score_member">
                    <td>{i + 1}.</td>
                    <td>{s.name}</td>

                    <td>{live ? s.latest_score : s.score}</td>
                    {live ? (
                      <td>{Math.floor((s.filled / (15 * 12)) * 100)}%</td>
                    ) : (
                      ""
                    )}
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
