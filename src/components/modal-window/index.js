import { CSSTransition } from "react-transition-group";
import { IoMdClose } from "react-icons/io";

export default function ModalWindow({
  onModalWindow = false,
  setOnModalWindow = () => {},
  children,
}) {
  return (
    <CSSTransition
      in={onModalWindow}
      timeout={300}
      classNames="modal-window"
      unmountOnExit
    >
      <div className="modal-window fixed flex items-center justify-center w-screen h-screen bg-black bg-opacity-50">
        <div className="relative flex px-12 py-10 rounded-md bg-white">
          <button
            className="absolute top-1 right-1 flex p-2 rounded-full text-lg text-dark bg-transparent hover:bg-black hover:bg-opacity-5"
            onClick={() => {
              setOnModalWindow(onModalWindow ? false : true);
            }}
          >
            <IoMdClose />
          </button>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}
