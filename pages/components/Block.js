import React from "react";

function Block({ color, filled, border, land_block, small }) {
  if (small && filled) {
    console.log("Block");
  }
  let class_name = `block  ${!small && border ? "border" : ""} ${
    filled ? "filled " : ""
  } ${land_block ? "land_block" : ""}  ${small ? "small" : ""}`;

  let bg = `${filled ? color : small ? "rgb(75, 75, 75)" : ""}`;
  return (
    <div
      className={class_name}
      style={{
        backgroundColor: bg,
      }}
    ></div>
  );
}

export default Block;
