import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  let db_id = "1049296309869363200";
  const [scores, setScores] = useState();

  useEffect(() => {
    fetch("https://jsonblob.com/api/jsonBlob/1049296309869363200")
      .then((res) => res.json())
      .then((res) => {
        sessionStorage.setItem("scores", JSON.stringify(res));
        setScores(res);
        console.log(res);
      });
  }, []);

  const [name, setName] = useState("");
  return (
    <div className="home_container">
      <div className="home_title">Tetris</div>
      <div className="home_name">
        <div className="home_label">Username</div>
        <input
          className="home_name_input"
          onChange={(e) =>
            setName(
              e.target.value
                .split("")
                .filter(
                  (l) =>
                    ![
                      "{",
                      "}",
                      "[",
                      "]",
                      '"',
                      "'",
                      ",",
                      "`",
                      ".",
                      "/",
                      "\\",
                    ].includes(l)
                )
                .join("")
            )
          }
          value={name}
          placeholder="Username"
        />
        <div className="home_label">*We need your name to save your score.</div>
      </div>
      <Link href={`/game?username=${name}`}>
        <button className="home_play">Play</button>
      </Link>

      <div className="home_scores">
        <div className="home_scores_title">Hall of Fame</div>
        {scores ? (
          <table>
            <tbody>
              <tr className="heading">
                <th>Name</th>
                <th>Score</th>
              </tr>

              {scores
                .sort((a, b) => b.score - a.score)
                .map((s, i) => (
                  <tr className="score_member">
                    <td>
                      {i + 1}. {s.name}
                    </td>

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
