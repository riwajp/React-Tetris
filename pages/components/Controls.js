import React from "react";

function Controls({ handleKeyDown }) {
  return (
    <div>
      {" "}
      <div className="controls">
        <div className="others">
          <button className="p" onClick={() => handleKeyDown({ key: "p" })}>
            P
          </button>
          <button
            className="space"
            onClick={() => handleKeyDown({ code: "Space" })}
          >
            Space
          </button>
        </div>
        <div className="arrows">
          <div className="up_container">
            <button
              className="arrow up"
              onClick={() => handleKeyDown({ code: "ArrowUp" })}
            >
              Up
            </button>
          </div>
          <div className="bottom_container">
            <button
              className=" arrow left"
              onClick={() => handleKeyDown({ code: "ArrowLeft" })}
            >
              Left
            </button>
            <button
              className="arrow down"
              onClick={() => handleKeyDown({ code: "ArrowDown" })}
            >
              Down
            </button>
            <button
              className="arrow right"
              onClick={() => handleKeyDown({ code: "ArrowRight" })}
            >
              Right
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Controls;
