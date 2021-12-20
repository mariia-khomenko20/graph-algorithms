import { useEffect, useRef } from "react";
import { CopyGraph } from "../../data/Graph";
import Vertex from "./Vertex";

export default function View({
  graph = { vertices: [], edges: [] },
  updateGraph = () => {},
  vertexSize = 60,
}) {
  const canvas = useRef();
  const { vertices, edges } = graph;
  useEffect(() => {
    const view = canvas.current;
    view.width = view.clientWidth;
    view.height = view.clientHeight;
    const context = view.getContext("2d");
    edges.forEach((edge) => {
      drawEdge(edge, context);
    });
  }, [graph]);

  function drawEdge(edge, context) {
    const { a, b, color } = edge;
    const aVert = vertices[a];
    const bVert = vertices[b];
    context.beginPath();
    context.moveTo(
      aVert.position.x + vertexSize / 2,
      aVert.position.y + vertexSize / 2
    );
    context.lineTo(
      bVert.position.x + vertexSize / 2,
      bVert.position.y + vertexSize / 2
    );
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.stroke();
  }

  function getWeight(edge, key) {
    const { a, b, weight } = edge;
    const aVert = vertices[a];
    const bVert = vertices[b];
    let x = aVert.position.x + (bVert.position.x - aVert.position.x) / 2;
    let y = aVert.position.y + (bVert.position.y - aVert.position.y) / 2 - 10;
    return (
      <span
        className="absolute select-none"
        style={{ left: x, top: y }}
        key={key}
      >
        {weight}
      </span>
    );
  }

  return (
    <div className="flex relative w-full h-full bg-gray-50" id="view">
      <canvas ref={canvas} />
      {vertices.map((vertex, i) => (
        <Vertex
          key={`vertex[${i}]`}
          vertex={vertex}
          size={vertexSize}
          setPosition={(position) => {
            let index = graph.vertices.indexOf(vertex);
            let newGraph = CopyGraph(graph);
            newGraph.vertices[index].position = position;
            updateGraph(newGraph);
          }}
        />
      ))}
      {edges.map((edge, i) => getWeight(edge, `weight[${i}]`))}
    </div>
  );
}
