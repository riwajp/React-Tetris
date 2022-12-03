import React from "react";

function Block({ color, filled, border }) {
  return (
    <div
      className={`block  ${border ? "border" : ""}`}
      style={{
        backgroundColor: `${filled ? color : ""}`,
      }}
    ></div>
  );
}

export default Block;
