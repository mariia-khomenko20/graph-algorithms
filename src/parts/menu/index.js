import { useAppContext } from "../../data/provider";
import Sidebar from "../../components/sidebar";
import Button from "../../components/button";
import Input from "../../components/inputs/input";
import AdjacencyMatrix from "../../components/adjacency-matrix";
import { BsFillPlayFill } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

export default function Menu() {
  const {
    inSidebar,
    setInModalWindow,
    verticesAmount,
    setVerticesAmount,
    matrix,
    setMatrix,
    EmptyMatrix,
    RandomMatrix,
    graph,
  } = useAppContext();

  return (
    <Sidebar inProp={inSidebar}>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <label>Vertices amount</label>
          <Input
            type="number"
            min={3}
            max={7}
            value={verticesAmount}
            onInput={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 3 && value <= 7) setVerticesAmount(value);
            }}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-row items-center justify-between">
            <label>Adjacency matrix</label>
            <div className="flex flex-row space-x-5">
              <Button
                size="sm"
                onClick={() => setMatrix(EmptyMatrix(verticesAmount))}
              >
                <AiFillDelete />
                <span>Clear</span>
              </Button>
              <Button
                size="sm"
                onClick={() => setMatrix(RandomMatrix(verticesAmount))}
              >
                <FaRandom />
                <span>Random</span>
              </Button>
            </div>
          </div>
          <div className="flex">
            <AdjacencyMatrix
              vertices={graph.vertices}
              data={matrix}
              setData={setMatrix}
            />
          </div>
        </div>
        <div className="flex flex-row">
          <Button
            onClick={() => {
              setInModalWindow(true);
            }}
          >
            <BsFillPlayFill className="text-xl" />
            <span>Algorithms</span>
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}
