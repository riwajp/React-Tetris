import Block from "./Block";

function Matrix({ matrix }) {
  return (
    <div>
      {matrix.map((row, i) => (
        <div key={i}>
          {row.map((element, j) => (
            <Block key={`${i} ${j}`} color="red" filled={element} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Matrix;
