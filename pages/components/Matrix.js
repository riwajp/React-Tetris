import Block from "./Block";

function Matrix({ matrix }) {
  return (
    <div>
      {matrix.map((row, i) => (
        <div key={i}>
          {row?.map((element, j) => (
            <Block
              key={`${i} ${j}`}
              color={element == 0 ? "" : element.color}
              filled={element != 0}
              border={i == 3}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Matrix;
