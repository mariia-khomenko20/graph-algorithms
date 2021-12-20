import { useEffect, useState } from "react";

export function CopyGraph(graph) {
  let vertices = graph.vertices.slice();
  let edges = graph.edges.slice();
  return { vertices: vertices, edges: edges };
}

export function VerticesSetting() {
  const size = 60;
  const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  return { size, names };
}

export function EdgesSetting() {
  const colors = {
    default: "#240046",
    target: "#ff9e00",
    result: "#38b000",
  };
  return { colors };
}

function GeneratePosition() {
  const view = document.getElementById("view")
    ? document.getElementById("view").getBoundingClientRect()
    : null;
  const { size } = VerticesSetting();
  let maxX = (view ? view.width : 500) - size;
  let maxY = (view ? view.height : 500) - size;
  let x = Math.random() * (maxX - 1);
  let y = Math.random() * (maxY - 1);
  return { x, y };
}

function NormalizeVertices(vertices, size) {
  let result = vertices.slice();
  if (result.length < size) {
    const { names } = VerticesSetting();
    while (result.length < size) {
      let index = result.length;
      result.push({
        name: names[index],
        position: GeneratePosition(),
        kruskal: index,
        prim: false,
      });
    }
  } else if (result.length > size) {
    while (result.length > size) result.pop();
  }
  return result;
}

function ReadEdges(matrix) {
  let edges = [];
  const { colors } = EdgesSetting();
  for (let i = 0; i < matrix.length; i++) {
    for (let j = i + 1; j < matrix[i].length; j++) {
      let weight = matrix[i][j];
      if (weight > 0)
        edges.push({ a: i, b: j, weight: weight, color: colors.default });
    }
  }
  return edges;
}

export default function Graph(matrix) {
  const [graph, setGraph] = useState({ vertices: [], edges: [] });

  useEffect(() => {
    let newVertices = NormalizeVertices(graph.vertices, matrix.length);
    let newEdges = ReadEdges(matrix);
    setGraph({ vertices: newVertices, edges: newEdges });
  }, [matrix]);

  function updateGraph(graph) {
    setGraph(graph);
  }

  function resetGraph() {
    const { colors } = EdgesSetting();
    let { vertices, edges } = CopyGraph(graph);
    vertices.forEach((vertex) => {
      vertex.kruskal = vertices.indexOf(vertex);
      vertex.prim = false;
    });
    edges.forEach((edge) => {
      edge.color = colors.default;
    });
    updateGraph({ vertices: vertices, edges: edges });
  }

  return { graph, updateGraph, resetGraph };
}
