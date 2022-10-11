import Graph from "../../components/graph";
import { useAppContext } from "../../data/provider";

export default function GraphContainer() {
  const { graph, setGraph } = useAppContext();

  return <Graph graph={graph} setGraph={setGraph} />;
}
