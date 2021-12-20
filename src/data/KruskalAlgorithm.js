import { useState } from "react";
import { CopyGraph, EdgesSetting } from "./Graph";

export default function KruskalAlgorithm(initial, updateGraph, timer) {
  const [status, setStatus] = useState(true);
  const { vertices, edges } = CopyGraph(initial);
  const { colors } = EdgesSetting();

  function Update() {
    updateGraph({ vertices: vertices, edges: edges });
  }

  function SortEdges() {
    for (let i = 0; i < edges.length; i++) {
      for (let j = i + 1; j < edges.length; j++) {
        if (edges[j].weight < edges[i].weight) {
          let buffer = edges[i];
          edges[i] = edges[j];
          edges[j] = buffer;
        }
      }
    }
  }

  function Change(a, b) {
    vertices.forEach((vertex) => {
      if (vertex.kruskal === b) vertex.kruskal = a;
    });
    return vertices;
  }

  function Next(index) {
    if (index < edges.length) {
      let edge = edges[index];
      edge.color = colors.target;
      Update();

      setTimeout(() => {
        let { a, b } = edge;
        if (vertices[a].kruskal != vertices[b].kruskal) {
          edge.color = colors.result;
          Change(vertices[a].kruskal, vertices[b].kruskal);
        } else {
          edge.color = colors.default;
        }
        Update();
        Next((index += 1));
      }, timer);
    } else setStatus(true);
  }

  function Do() {
    setStatus(false);
    SortEdges();
    Next(0);
  }

  return { status, Do };
}
