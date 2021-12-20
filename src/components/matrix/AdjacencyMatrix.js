import { useEffect, useState } from "react";

export function Cell({ className, ...props }) {
  return (
    <input
      className={`w-full px-2 py-1 focus:outline-none ${className}`}
      {...props}
    />
  );
}

export default function AdjacencyMatrix({
  matrix = [],
  updateMatrix = () => {},
  vertices = [],
  ...props
}) {
  let cellWidth = `${100 / matrix.length}%`;

  return (
    <div className="flex w-full">
      <table>
        <thead>
          <tr key="header">
            <th />
            {vertices.map((head, i) => (
              <th key={head.name}>{head.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={`matrix[${i}]`}>
              <th>{vertices[i] ? vertices[i].name : null}</th>
              {row.map((column, j) => (
                <td key={`matrix[${i}][${j}]`} style={{ width: cellWidth }}>
                  {i < j ? (
                    <Cell
                      value={column}
                      onInput={(e) => {
                        let value = e.target.value.replace(/[^0-9]/g, "");
                        if (value.length < 1) value = 0;
                        let buffer = matrix.slice();
                        buffer[i][j] = buffer[j][i] = parseInt(value);
                        updateMatrix(buffer);
                      }}
                      width={cellWidth}
                      maxLength="2"
                    />
                  ) : (
                    <Cell
                      value={column}
                      readOnly
                      className="bg-transparent"
                      width={cellWidth}
                      maxLength="2"
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
