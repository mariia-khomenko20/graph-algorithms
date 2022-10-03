import { useEffect, useState } from "react";

export default function useData() {
  const [verticesAmount, setVerticesAmount] = useState(5);
  const [matrix, setMatrix] = useState([]);
  const [graph, setGraph] = useState({ vertices: [], edges: [] });
  const [delay, setDelay] = useState(1);
  const [algorithm, setAlgorithm] = useState("kruskal");
  const [startPrim, setStartPrim] = useState(0);

  function EmptyMatrix(size) {
    const newMatrix = [];
    while (newMatrix.length < size) {
      const newRow = Array(size).fill(0);
      newMatrix.push(newRow);
    }
    return newMatrix;
  }

  function RandomMatrix(size) {
    const newMatrix = EmptyMatrix(size);
    for (let i = 0; i < newMatrix.length; i++) {
      for (let j = i + 1; j < newMatrix[i].length; j++) {
        newMatrix[i][j] = newMatrix[j][i] =
          Math.random() > 0.5 ? Math.floor(Math.random() * 99) + 1 : 0;
      }
    }
    return newMatrix;
  }

  function SortEdges(edges) {
    const result = edges.slice();
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        if (result[j].weight < result[i].weight) {
          let buffer = result[i];
          result[i] = result[j];
          result[j] = buffer;
        }
      }
    }
    return result;
  }

  function pause() {
    return new Promise((res) => setTimeout(res, delay * 1000));
  }

  function Show() {
    setGraph({ ...graph });
  }

  function changeColor(a, b) {
    const { vertices, edges } = graph;
    for (let vertex of vertices) {
      if (vertex.color === a) vertex.color = b;
    }
    for (let edge of edges) {
      if (edge.color === a) edge.color = b;
    }
    setGraph({ vertices, edges });
  }

  function Reset() {
    const { vertices, edges } = graph;
    for (let vertex of vertices) {
      vertex.color = vertex.prim = vertex.kruskal = null;
    }
    for (let edge of edges) {
      edge.color = null;
    }
    setGraph({ vertices, edges });
  }

  async function KruskalsAlgorithm() {
    Reset();
    function changeKruskal(a, b) {
      for (let vertex of vertices) {
        if (vertex.kruskal === a) vertex.kruskal = b;
      }
    }

    const { vertices } = graph;
    const edges = SortEdges(graph.edges);
    for (let index = 0; index < vertices.length; index++) {
      vertices[index].kruskal = index;
    }
    for (let edge of edges) {
      edge.color = "target";
      Show();
      await pause();
      const a = edge.a.kruskal;
      const b = edge.b.kruskal;
      if (a != b) {
        edge.color = edge.a.color = edge.b.color = "result";
        changeKruskal(a, b);
      } else {
        edge.color = "wrong";
      }
      Show();
      await pause();
    }
  }

  async function PrimsAlgorithm() {
    Reset();
    const { vertices, edges } = graph;
    const start = vertices[startPrim];
    start.color = "result";
    start.prim = true;
    Show();
    await pause();
    for (let index = 0; index < vertices.length; index++) {
      let min = null;
      for (let edge of edges) {
        const { a, b, weight } = edge;
        if (a.prim != b.prim) {
          edge.color = "target";
          if (!min || weight < min.weight) min = edge;
        }
      }
      Show();
      await pause();
      const { a, b } = min;
      a.prim = b.prim = true;
      a.color = b.color = min.color = "result";
      changeColor("target", null);
      Show();
      await pause();
    }
  }

  useEffect(() => {
    const newMatrix = matrix.slice();
    if (newMatrix.length < verticesAmount)
      while (newMatrix.length < verticesAmount) {
        const newRow = Array(verticesAmount).fill(0);
        newMatrix.push(newRow);
      }
    else if (newMatrix.length > verticesAmount)
      while (newMatrix.length > verticesAmount) {
        newMatrix.pop();
      }

    newMatrix.forEach((row) => {
      if (row.length < verticesAmount)
        while (row.length < verticesAmount) {
          row.push(0);
        }
      else if (row.length > verticesAmount)
        while (row.length > verticesAmount) {
          row.pop();
        }
    });
    setMatrix(newMatrix);
  }, [verticesAmount]);

  useEffect(() => {
    const { vertices } = graph;
    if (vertices.length < matrix.length) {
      const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      while (vertices.length < matrix.length) {
        const index = vertices.length;
        vertices.push({ name: names[index], position: { x: 0, y: 0 } });
      }
    } else if (vertices.length > matrix.length)
      while (vertices.length > matrix.length) {
        vertices.pop();
      }

    const edges = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i + 1; j < matrix[i].length; j++) {
        if (matrix[i][j] > 0)
          edges.push({
            a: vertices[i],
            b: vertices[j],
            weight: matrix[i][j],
          });
      }
    }
    setGraph({ vertices, edges });
  }, [matrix]);

  return {
    verticesAmount,
    setVerticesAmount,
    matrix,
    setMatrix,
    graph,
    setGraph,
    EmptyMatrix,
    RandomMatrix,
    delay,
    setDelay,
    algorithm,
    setAlgorithm,
    KruskalsAlgorithm,
    PrimsAlgorithm,
    startPrim,
    setStartPrim,
  };
}
