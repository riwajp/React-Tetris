import React from "react";

function Block({ color, filled }) {
  return <div className={`block ${filled ? color : ""}`}></div>;
}

export default Block;
