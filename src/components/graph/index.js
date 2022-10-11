import Edge from "./edge";
import Vertex from "./vertex";

export default function Graph({
  graph = { vertices: [], edges: [] },
  setGraph = () => {},
}) {
  const { vertices, edges } = graph;

  return (
    <div
      className="relative w-full h-full rounded-md shadow-md bg-white overflow-auto"
      id="graph-container"
    >
      {edges.map((edge, index) => (
        <Edge key={`edge-${index}`} data={edge} />
      ))}
      {vertices.map((vertex, index) => (
        <Vertex
          key={`vertex-${index}`}
          data={vertex}
          setPosition={(newPosition) => {
            vertex.position = newPosition;
            setGraph({ vertices, edges });
          }}
        />
      ))}
    </div>
  );
}
