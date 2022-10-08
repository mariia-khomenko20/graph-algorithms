import "./styles/App.css";
import { BsFillPlayFill, BsGearFill, BsMenuApp } from "react-icons/bs";
import { FaRandom } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoArrowBack, IoMenu } from "react-icons/io5";
import Button from "./components/button";
import { useEffect, useState } from "react";
import OverlayMenu from "./components/overlay-menu";
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
    onShow,
    setOnShow,
  } = useData();

  useEffect(() => {
    setMatrix(RandomMatrix(verticesAmount));
  }, []);

  const MenuRow = ({ children, ...props }) => {
    return (
      <div className="flex flex-col space-y-2" {...props}>
        {children}
      </div>
    );
  };

  const Label = ({ children }) => {
    return <label className="font-medium text-gray-500">{children}</label>;
  };

  return (
    <div className="flex flex-col w-full h-screen bg-slate-100">
      <header className="flex flex-row items-center px-3 py-3 space-x-2">
        <button
          className="flex items-center justify-center w-11 h-11 rounded-full text-3xl text-primary-default bg-transparent hover:bg-black hover:bg-opacity-5 focus:outline-none"
          onClick={() => {
            setOnMenu(onMenu ? false : true);
          }}
        >
          {onMenu ? <IoArrowBack /> : <IoMenu />}
        </button>
        <span className="text-2xl font-medium text-primary-default">
          GraphAlgorithms
        </span>
      </header>
      <main className="relative flex flex-1 flex-row">
        <GraphContainer graph={graph} setGraph={setGraph} />
        <OverlayMenu inProp={onMenu}>
          <div className="flex flex-col space-y-9">
            <MenuRow>
              <Label>Vertices amount</Label>
              <NumberUpDown
                value={verticesAmount}
                min={3}
                max={7}
                setValue={setVerticesAmount}
              />
            </MenuRow>
            <MenuRow>
              <div className="flex flex-row items-center justify-between">
                <Label>Adjacency matrix</Label>
                <div className="flex flex-row space-x-5">
                  <Button
                    size="sm"
                    onClick={() => setMatrix(EmptyMatrix(verticesAmount))}
                  >
                    <AiFillDelete className="text-md" />
                    <span>Clear</span>
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setMatrix(RandomMatrix(verticesAmount))}
                  >
                    <FaRandom className="text-md" />
                    <span>Random</span>
                  </Button>
                </div>
              </div>
            </MenuRow>
            <MenuRow>
              <AdjacencyMatrix
                vertices={graph.vertices}
                data={matrix}
                setData={setMatrix}
              />
            </MenuRow>
            <div className="flex flex-row justify-center">
              <Button
                onClick={() => {
                  setOnModalWindow(onModalWindow ? false : true);
                }}
              >
                <BsFillPlayFill className="text-xl" />
                <span>Algorithms</span>
              </Button>
            </div>
          </div>
        </OverlayMenu>
      </main>
      <ModalWindow inProp={onModalWindow} setInProp={setOnModalWindow}>
        <div className="flex flex-col space-y-5 w-64">
          <MenuRow>
            <Label>Timeout</Label>
            <div className="flex flex-row space-x-3 items-center">
              <NumberUpDown value={delay} min={1} max={5} setValue={setDelay} />
              <span>sec.</span>
            </div>
          </MenuRow>
          <MenuRow>
            <Label>Algorithm</Label>
            <RadioGroup
              data={[
                { value: "kruskal", label: "Kruskal's" },
                { value: "prim", label: "Prim's" },
              ]}
              target={algorithm}
              setTarget={setAlgorithm}
            />
          </MenuRow>
          <MenuRow>
            <Label>Start vertex</Label>
            <Dropdown
              data={graph.vertices}
              target={startPrim}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setStartPrim(value);
              }}
            />
          </MenuRow>
          <MenuRow>
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
          </MenuRow>
        </div>
      </ModalWindow>
    </div>
  );
}

export default App;
