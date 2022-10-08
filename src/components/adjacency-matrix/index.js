import classNames from "classnames";

export default function AdjacencyMatrix({
  vertices = [],
  data = {},
  setData = () => {},
}) {
  return (
    <table className="border-separate border-spacing-2">
      <thead>
        <tr>
          <th />
          {vertices.map((vertex, index) => (
            <th key={`vertices[${index}]`}>
              {vertex.name ? vertex.name : index}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={`matrix[${i}]`}>
            <th>{vertices[i] ? vertices[i].name : i}</th>
            {row.map((weight, j) => (
              <td key={`matrix[${i}][${j}]`}>
                <input
                  className={classNames("h-8 w-full text-center rounded-md", {
                    "bg-transparent outline-none": j <= i,
                    "rounded-md text-gray-600 outline outline-1 focus:outline-2 focus:outline-primary-default":
                      i < j,
                  })}
                  value={weight}
                  readOnly={j <= i}
                  minLength="1"
                  maxLength="2"
                  onInput={(e) => {
                    const newData = data.slice();
                    const value = parseInt(e.target.value);
                    newData[i][j] = newData[j][i] = value ? value : 0;
                    setData(newData);
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
