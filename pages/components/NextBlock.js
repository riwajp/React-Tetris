import React from "react";
import Block from "./Block";

function NextBlock({ next_block, current_block }) {
  return (
    <div className="scoreboard_container ">
      <div className="score_label"> Next </div>

      <div className="next_block_container">
        {current_block &&
          next_block?.map((row, i) => (
            <div key={i} className="small_block_div">
              {row?.map((element, j) => (
                <Block
                  key={`${i} ${j} `}
                  color={element != 0 ? element.color : false}
                  filled={element != 0}
                  border={i == 3}
                  small={1}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}

export default NextBlock;
