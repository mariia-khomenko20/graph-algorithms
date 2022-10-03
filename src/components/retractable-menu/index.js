import { CSSTransition } from "react-transition-group";

export default function RetractableMenu({ onMenu = false, children }) {
  return (
    <CSSTransition
      in={onMenu}
      timeout={500}
      classNames="retractable-menu"
      unmountOnExit
    >
      <div className="retractable-menu absolute px-10 py-7 bg-slate-100 bg-opacity-75 shadow-md shadow-slate-300">
        {children}
      </div>
    </CSSTransition>
  );
}
