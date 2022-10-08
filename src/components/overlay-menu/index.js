import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function OverlayMenu({ inProp = false, children }) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={300}
      classNames="overlay-menu"
      unmountOnExit
    >
      <div
        ref={nodeRef}
        className="absolute w-[450px] h-full p-7 bg-slate-50 shadow-md shadow-slate-400"
      >
        {children}
      </div>
    </CSSTransition>
  );
}
