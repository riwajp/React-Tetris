import { useEffect, useState } from "react";
import Link from "next/link";
import ScoreTable from "./components/Home/ScoreTable";

export default function Home({ scores }) {
  const [name, setName] = useState("");
  let name_filter_values = [
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
  ];

  return (
    <div className="home_container">
      <div className="home_title">Tetris</div>
      {/* <div className="home_name">
        <div className="home_label">Username</div>
        <input
          className="home_name_input"
          onChange={(e) =>
            setName(
              e.target.value
                .split("")
                .filter((l) => !name_filter_values.includes(l))
                .join("")
            )
          }
          value={name}
          maxLength={15}
          placeholder="Username"
        />
        <div className="home_label">*We need your name to save your score.</div>
      </div> */}
      <Link href={`/game`}>
        <button className="home_play">Play</button>
      </Link>
      {/* <ScoreTable scores={scores} /> */}
    </div>
  );
}
