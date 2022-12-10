import React, { useState, useEffect } from "react";
import SmallMatrix from "./SmallMatrix";
import { copy } from "../../utils";

function OnlineMatrices({ socket }) {
  const [status, setStatus] = useState([]); // console.log(JSON.parse(router.query.bricks));

  useEffect(() => {
    socket?.on("recieve-state", (name, matrix, score) => {
      console.log("recieved");
      if (status.findIndex((s) => s.name == name) != -1) {
        let status_temp = copy(status);
        status_temp[status_temp.findIndex((s) => s.name == name)].matrix =
          matrix;
        status_temp[status_temp.findIndex((s) => s.name == name)].score = score;
        setStatus(status_temp);
      } else {
        setStatus([...status, { name: name, matrix: matrix, score: score }]);
      }
    });
  }, [socket, status]);

  return (
    <div>
      {status?.map((s) => (
        <div className="small_matrix">
          <div className="small_matrix_top">
            <span className="player_name">{s.name}</span>
            <span className="player_score">{s.score}</span>
          </div>
          <SmallMatrix matrix={s.matrix} />
        </div>
      ))}
    </div>
  );
}

export default OnlineMatrices;
