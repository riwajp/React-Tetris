import Block from "./Block";
import { blockIndices } from "../../utils";
function Matrix({ matrix, land_index, id }) {
  let block_indices = blockIndices(matrix, id?.current);

  let land_indices = block_indices.map((b) => [b[1] + land_index, b[0]]);
  return (
    <div>
      {matrix?.map((row, i) => (
        <div key={i} className="row">
          {row?.map((element, j) => (
            <Block
              key={`${i} ${j}`}
              color={element == 0 ? "" : element.color}
              filled={element != 0}
              border={i == 3}
              land_block={
                land_indices.filter((b) => b[0] == i && b[1] == j).length
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Matrix;
