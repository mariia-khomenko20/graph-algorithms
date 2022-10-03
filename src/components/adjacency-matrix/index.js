import classNames from "classnames";

export default function AdjacencyMatrix({
  vertices = [],
  data = {},
  updateData = () => {},
}) {
  return (
    <table
      className="w-full border-separate border-spacing-1"
      style={{ height: "230px" }}
    >
      <thead>
        <tr>
          <th />
          {vertices.map((vertex, index) => (
            <th key={index}>{vertex.name ? vertex.name : index}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <th>{vertices[i] ? vertices[i].name : i}</th>
            {row.map((weight, j) => (
              <td key={j}>
                <input
                  className={classNames("flex w-full text-center", {
                    "bg-transparent outline-none focus:outline-none": j <= i,
                    "bg-white rounded-md outline outline-secondary-dark outline-2 focus:shadow-md focus:shadow-secondary-default":
                      j > i,
                  })}
                  value={weight}
                  minLength={1}
                  maxLength={2}
                  readOnly={j <= i}
                  onInput={(e) => {
                    const regex = /[0-9]|\./;
                    const value = e.target.value ? e.target.value : 0;
                    if (!regex.test(value)) e.preventDefault();
                    else {
                      const newMatrix = data.slice();
                      newMatrix[i][j] = newMatrix[j][i] = parseInt(value);
                      updateData(newMatrix);
                    }
                  }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
