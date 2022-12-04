import React from "react";

function Block({ color, filled, border, land_block }) {
  return (
    <div
      className={`block  ${border ? "border" : ""} ${filled ? "filled " : ""} ${
        land_block ? "land_block" : ""
      }`}
      style={{
        backgroundColor: `${filled ? color : ""}`,
      }}
    ></div>
  );
}

export default Block;
