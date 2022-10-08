import { CSSTransition } from "react-transition-group";
import { useRef } from "react";
import { IoMdClose } from "react-icons/io";

export default function ModalWindow({
  inProp = false,
  setInProp = () => {},
  children,
}) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={300}
      classNames="modal-window"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="fixed flex items-center justify-center w-screen h-screen bg-black bg-opacity-50"
      >
        <div className="relative flex px-12 py-10 rounded-md bg-white">
          <button
            className="absolute top-1 right-1 flex p-2 rounded-full text-lg text-dark bg-transparent hover:bg-black hover:bg-opacity-5"
            onClick={() => {
              setInProp(inProp ? false : true);
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
