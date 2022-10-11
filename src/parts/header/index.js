import { IoArrowBack, IoMenu } from "react-icons/io5";
import { useAppContext } from "../../data/provider";

export default function Header() {
  const { inSidebar, setInSidebar, onShow } = useAppContext();
  return (
    <header className="flex flex-row items-center px-5 py-4 space-x-3 text-primary-default">
      <button
        className="flex items-center justify-center h-11 w-11 rounded-full text-3xl hover:bg-black hover:bg-opacity-5 focus:outline-none"
        onClick={() => {
          if (!onShow) setInSidebar(!inSidebar);
        }}
      >
        {!inSidebar ? <IoMenu /> : <IoArrowBack />}
      </button>
      <span className="text-2xl font-medium">GraphAlgorithms</span>
    </header>
  );
}
