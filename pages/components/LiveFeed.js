import React from "react";
import ScoreTable from "./Home/ScoreTable";
function LiveFeed({ scores, username }) {
  let online = scores?.filter(
    (s) => s.name != username && Date.now() / 1000 - s.ts <= 30
  );
  return (
    <div className="live-feed-container">
      <ScoreTable scores={online} max={online?.length} live={1} />
    </div>
  );
}

export default LiveFeed;
