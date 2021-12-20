import { useState } from "react";
import { CopyGraph, EdgesSetting } from "./Graph";

function Random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function PrimAlgorithm(initial, updateGraph, timer) {
  const [status, setStatus] = useState(true);
  const { vertices, edges } = CopyGraph(initial);
  const { colors } = EdgesSetting();

  function Update() {
    updateGraph({ vertices: vertices, edges: edges });
  }

  function recolorEdges() {
    edges.forEach((edge) => {
      if (edge.color === colors.target) edge.color = colors.default;
    });
  }

  function Next(count) {
    if (count < vertices.length) {
      let min = null;
      edges.forEach((edge) => {
        const { a, b } = edge;
        if (
          vertices[a].prim != vertices[b].prim &&
          (vertices[a].prim === true || vertices[b].prim === true)
        ) {
          edge.color = colors.target;
          if (min === null || edge.weight < min.weight) min = edge;
        }
      });
      Update();
      setTimeout(() => {
        const { a, b } = min;
        min.color = colors.result;
        vertices[a].prim = vertices[b].prim = true;
        recolorEdges();
        Update();
        Next((count += 1));
      }, timer);
    } else setStatus(true);
  }

  function Do() {
    setStatus(false);
    let start = Random(0, vertices.length);
    vertices[start].prim = true;
    Next(1);
  }

  return { status, Do };
}
