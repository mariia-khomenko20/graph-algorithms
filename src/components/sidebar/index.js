import { createRef, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export default function Sidebar({ inProp = false, children }) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={inProp}
      timeout={300}
      classNames="slide"
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
