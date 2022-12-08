import React from "react";

function Block({ color, filled, border, land_block, small, not_mine }) {
  let class_name = `block  ${!small && border ? "border" : ""} ${
    filled ? "filled " : ""
  } ${land_block ? "land_block" : ""}  ${small || not_mine ? "small" : ""}  ${
    filled ? color : ""
  } ${not_mine ? "not_mine_block" : ""}`;

  let box_shadow = `${filled ? color : ""}`;

  return <div className={class_name}></div>;
}

export default Block;
