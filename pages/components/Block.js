import React from "react";

function Block({ color, filled, border, land_block, small }) {
  let class_name = `block  ${!small && border ? "border" : ""} ${
    filled ? "filled " : ""
  } ${land_block ? "land_block" : ""}  ${small ? "small" : ""}  ${
    filled ? color : ""
  }`;

  let box_shadow = `${filled ? color : ""}`;

  return <div className={class_name}></div>;
}

export default Block;
