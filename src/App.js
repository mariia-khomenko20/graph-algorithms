import "./App.css";
import { useState } from "react";
import AdjacencyMatrix from "./components/matrix/AdjacencyMatrix";
import NumberUpDown from "./components/NumberUpDown";
import Matrix from "./data/Matrix";
import Button from "./components/Button";
import Graph, { VerticesSetting } from "./data/Graph";
import View from "./components/graph/View";
import KruskalAlgorithm from "./data/KruskalAlgorithm";
import PrimAlgorithm from "./data/PrimAlgorithm";

function App() {
  const {
    size,
    setSize,
    matrix,
    clearMatrix,
    buildRandomMatrix,
    updateMatrix,
  } = Matrix();
  const { graph, updateGraph, resetGraph } = Graph(matrix);
  const [algorithm, setAlgorithm] = useState("kruskal");
  const [timer, setTimer] = useState(3);
  const { size: vertexSize } = VerticesSetting();
  const { Do: doKruskal, status: kruskalStatus } = KruskalAlgorithm(
    graph,
    updateGraph,
    timer * 1000
  );
  const { Do: doPrim, status: primStatus } = PrimAlgorithm(
    graph,
    updateGraph,
    timer * 1000
  );

  function changeAlgorithm(e) {
    setAlgorithm(e.target.value);
  }
  return (
    <div className="flex flex-row min-h-screen max-h-screen min-w-full max-w-full">
      <div className="flex flex-col bg-gray-200 w-1/3 px-10 py-10 space-y-7 overflow-y-scroll">
        <div className="flex flex-row items-center space-x-3">
          <span>Количество вершин:</span>
          <NumberUpDown
            value={size}
            min="3"
            max="10"
            onInput={(e) => {
              let value = parseInt(e.target.value);
              if (value < 3) value = 3;
              else if (value > 10) value = 10;
              setSize(value);
            }}
          />
        </div>
        <div className="flex flex-row">
          <AdjacencyMatrix
            vertices={graph.vertices}
            matrix={matrix}
            updateMatrix={updateMatrix}
          />
        </div>
        <div className="flex flex-row items-center justify-center space-x-5">
          <Button
            onClick={() => {
              buildRandomMatrix();
            }}
          >
            Случайная
          </Button>
          <Button
            onClick={() => {
              clearMatrix();
            }}
          >
            Очистить
          </Button>
        </div>
        <div className="flex flex-row items-center space-x-3">
          <span>Задержка анимации:</span>
          <NumberUpDown
            value={timer}
            min="1"
            max="7"
            onInput={(e) => {
              setTimer(parseInt(e.target.value));
            }}
          />
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex text-lg">Алгоритм:</div>
          <div className="flex flex-row items-center space-x-2">
            <input
              type="radio"
              value="kruskal"
              checked={algorithm === "kruskal"}
              onChange={changeAlgorithm}
            />
            <span>Крускала</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <input
              type="radio"
              value="prim"
              checked={algorithm === "prim"}
              onChange={changeAlgorithm}
            />
            <span>Прима</span>
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-3">
          <Button
            className="px-12"
            onClick={() => {
              if (kruskalStatus === true && primStatus === true) {
                resetGraph();
                switch (algorithm) {
                  case "kruskal":
                    doKruskal();
                    break;
                  case "prim":
                    doPrim();
                    break;
                }
              }
            }}
          >
            Старт
          </Button>
          <Button
            className="px-12"
            onClick={() => {
              if (kruskalStatus === true && primStatus === true) resetGraph();
            }}
          >
            Сбросить
          </Button>
        </div>
      </div>
      <div className="flex w-2/3">
        <View graph={graph} updateGraph={updateGraph} vertexSize={vertexSize} />
      </div>
    </div>
  );
}

export default App;
