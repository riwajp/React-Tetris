import React from "react";

function Block({ color, filled, border, land_block, small }) {
  if (small && filled) {
    console.log("Block");
  }
  return (
    <div
      className={`block  ${!small && border ? "border" : ""} ${
        filled ? "filled " : ""
      } ${land_block ? "land_block" : ""}  ${small ? "small" : ""}`}
      style={{
        backgroundColor: `${filled ? color : small ? "rgb(75, 75, 75)" : ""}`,
      }}
    ></div>
  );
}

export default Block;
