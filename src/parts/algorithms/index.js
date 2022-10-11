import { useAppContext } from "../../data/provider";
import ModalWindow from "../../components/modal-window";
import Input from "../../components/inputs/input";
import RadioGroup from "../../components/inputs/radio-group";
import Dropdown from "../../components/inputs/dropdown";
import Button from "../../components/button";

export default function Algorithms() {
  const {
    inModalWindow,
    setInModalWindow,
    setInSidebar,
    delay,
    setDelay,
    algorithm,
    setAlgorithm,
    graph,
    start,
    setStart,
    KruskalsAlgorithm,
    PrimsAlgorithm,
  } = useAppContext();

  return (
    <ModalWindow inProp={inModalWindow} setInProp={setInModalWindow}>
      <div className="flex flex-col min-w-[320px] space-y-5">
        <div className="flex flex-col space-y-2">
          <label>Timeout</label>
          <div className="flex flex-row space-x-3 items-center">
            <Input
              type="number"
              min={1}
              max={5}
              value={delay}
              onInput={(e) => {
                const value = parseInt(e.target.value);
                if (value >= 1 && value <= 5) setDelay(value);
              }}
            />
            <span>sec.</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label>Algorithms</label>
          <RadioGroup
            data={[
              { value: "kruskal", label: "Kruskal's" },
              { value: "prim", label: "Prim's" },
            ]}
            target={algorithm}
            setTarget={setAlgorithm}
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label>Start vertex</label>
          <Dropdown
            data={graph.vertices}
            target={start}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setStart(value);
            }}
          />
        </div>
        <div className="flex flex-row">
          <Button
            onClick={() => {
              setInSidebar(false);
              setInModalWindow(false);
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
            Play
          </Button>
        </div>
      </div>
    </ModalWindow>
  );
}
