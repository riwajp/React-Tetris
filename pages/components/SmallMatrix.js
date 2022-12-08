import Block from "./Block";
function SmallMatrix({ matrix }) {
  return (
    <div>
      {matrix?.map((row, i) => (
        <div key={i} className="small_row">
          {row?.map((element, j) => (
            <Block
              key={`${i} ${j}`}
              color={element == 0 ? "" : element.color}
              filled={element != 0}
              border={i == 3}
              not_mine={1}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SmallMatrix;
