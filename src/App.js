import "./styles/App.css";
import AppProvider, { useAppContext } from "./data/provider";
import GraphContainer from "./parts/graph-container";
import Header from "./parts/header";
import Menu from "./parts/menu";
import Algorithms from "./parts/algorithms";

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col w-full h-screen bg-slate-50">
        <Header />
        <main className="relative flex flex-1 flex-row">
          <GraphContainer />
          <Menu />
        </main>
        <Algorithms />
      </div>
    </AppProvider>
  );
}

export default App;
