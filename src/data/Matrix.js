import { useEffect, useState } from "react";

function RandomWeight(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function EmptyMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    let row = Array(size).fill(0);
    matrix.push(row);
  }
  return matrix;
}

function RandomAdjacencyMatrix(size, min = 1, max = 100) {
  let matrix = EmptyMatrix(size);
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      if (Math.floor(Math.random() * 2) == 1)
        matrix[i][j] = matrix[j][i] = RandomWeight(min, max);
    }
  }
  return matrix;
}

function NormalizeRows(rows, size) {
  let result = rows.slice();

  if (result.length < size)
    while (result.length < size) {
      let newRow = Array(size).fill(0);
      result.push(newRow);
    }
  else if (result.length > size) while (result.length > size) result.pop();

  return result;
}

function NormalizeRow(row, size) {
  let result = row.slice();

  if (row.length < size) {
    while (row.length < size) row.push(0);
  } else if (row.length > size) {
    while (row.length > size) row.pop();
  }

  return result;
}

function NormalizeMatrix(matrix, size) {
  let result = NormalizeRows(matrix, size);

  result.forEach((row) => {
    row = NormalizeRow(row, size);
  });

  return result;
}

export default function Matrix() {
  const [size, setSize] = useState(5);
  const [matrix, setMatrix] = useState(EmptyMatrix(size));

  useEffect(() => {
    setMatrix(NormalizeMatrix(matrix, size));
  }, [size]);

  function clearMatrix() {
    setMatrix(EmptyMatrix(size));
  }

  function buildRandomMatrix() {
    setMatrix(RandomAdjacencyMatrix(size));
  }

  function updateMatrix(matrix) {
    setMatrix(matrix);
  }

  return {
    size,
    setSize,
    matrix,
    clearMatrix,
    buildRandomMatrix,
    updateMatrix,
  };
}
