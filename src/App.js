import "./styles/App.css";
import { BsFillPlayFill, BsGearFill, BsMenuApp } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoMdArrowBack, IoMdMenu } from "react-icons/io";
import Button from "./components/button";
import { useEffect, useState } from "react";
import RetractableMenu from "./components/retractable-menu";
import ModalWindow from "./components/modal-window";
import GraphContainer from "./components/graph";
import useData from "./data";
import AdjacencyMatrix from "./components/adjacency-matrix";
import RadioGroup from "./components/inputs/radio-group";
import NumberUpDown from "./components/inputs/number-up-down";
import Dropdown from "./components/inputs/dropdown";

function App() {
  const [onMenu, setOnMenu] = useState(false);
  const [onModalWindow, setOnModalWindow] = useState(false);

  const {
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
  } = useData();

  useEffect(() => {
    setMatrix(RandomMatrix(verticesAmount));
  }, []);

  const MenuRow = ({ children }) => {
    return <div className="flex flex-row space-x-3">{children}</div>;
  };

  const Label = ({ children }) => {
    return <label className="">{children}</label>;
  };

  return (
    <div className="flex flex-col w-full h-screen bg-slate-100">
      <header className="flex flex-row items-center space-x-2 bg-primary-default text-secondary-default">
        <div className="flex flex-row items-center">
          <button
            className="flex flex-row items-center justify-center bg-transparent hover:bg-black hover:bg-opacity-10"
            onClick={() => {
              setOnMenu(onMenu ? false : true);
            }}
          >
            {!onMenu ? <IoMdMenu /> : <IoMdArrowBack />}
          </button>
        </div>
        <span className="text-2xl font-bold">GraphAlgorithms</span>
      </header>
      <main className="flex flex-row w-full h-full">
        <div className="flex w-full h-full p-4">
          <GraphContainer graph={graph} setGraph={setGraph} />
        </div>
        <RetractableMenu onMenu={onMenu}>
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col space-y-3">
              <label>Vertices amount</label>
              <NumberUpDown
                value={verticesAmount}
                min={3}
                max={7}
                setValue={setVerticesAmount}
              />
            </div>
            <div className="flex flex-col space-y-3">
              <label>Adjacency matrix</label>
              <div className="flex flex-row space-x-10">
                <Button onClick={() => setMatrix(EmptyMatrix(verticesAmount))}>
                  <AiFillDelete className="text-xl" />
                  <span>Clear</span>
                </Button>
                <Button onClick={() => setMatrix(RandomMatrix(verticesAmount))}>
                  <FaRandom className="text-xl" />
                  <span>Random</span>
                </Button>
              </div>
              <AdjacencyMatrix
                vertices={graph.vertices}
                data={matrix}
                updateData={setMatrix}
              />
            </div>
            <div className="flex flex-row justify-center">
              <Button
                onClick={() => {
                  setOnModalWindow(onModalWindow ? false : true);
                }}
              >
                <BsFillPlayFill />
                <span>Algorithms</span>
              </Button>
            </div>
          </div>
        </RetractableMenu>
      </main>
      <ModalWindow
        onModalWindow={onModalWindow}
        setOnModalWindow={setOnModalWindow}
      >
        <div className="flex flex-col space-y-5">
          <div className="flex flex-col space-y-2">
            <label>Timeout</label>
            <div className="flex flex-row space-x-2 items-center">
              <NumberUpDown value={delay} min={1} max={5} setValue={setDelay} />
              <span>sec.</span>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label>Algorithm</label>
            <RadioGroup
              data={[
                { value: "kruskal", label: "Kruskal's algorithm" },
                { value: "prim", label: "Prim's algorithm" },
              ]}
              target={algorithm}
              setTarget={setAlgorithm}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label>Start vertex (for Prim)</label>
            <Dropdown
              data={graph.vertices}
              target={startPrim}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setStartPrim(value);
              }}
            />
          </div>
          <div className="flex flex-row justify-center">
            <Button
              onClick={() => {
                setOnMenu(false);
                setOnModalWindow(false);
                switch (algorithm) {
                  case "kruskal":
                    KruskalsAlgorithm();
                    break;
                  case "prim":
                    PrimsAlgorithm();
                    break;
                }
              }}
            >
              Start
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  );
}

export default App;
