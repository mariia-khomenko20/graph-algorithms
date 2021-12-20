var lastPosition = null;
var canMove = false;

function Validate(x, y, size, panel) {
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + size > panel.width) x = panel.width - size;
  if (y + size > panel.height) y = panel.height - size;
  return { x: x, y: y };
}

export default function Vertex({
  vertex = null,
  size = 60,
  setPosition = () => {},
  ...props
}) {
  function onMouseDown(e) {
    canMove = true;
    lastPosition = { x: e.clientX, y: e.clientY };
  }

  function onMouseMove(e) {
    if (canMove === true) {
      const view = document.getElementById("view").getBoundingClientRect();
      const position = vertex.position;
      let x = position.x + (e.clientX - lastPosition.x);
      let y = position.y + (e.clientY - lastPosition.y);

      setPosition(Validate(x, y, size, view));
      lastPosition = { x: e.clientX, y: e.clientY };
    }
  }

  function onMouseUp(e) {
    canMove = false;
  }
  return (
    <div
      className="absolute flex justify-center items-center rounded-full 
        text-white font-bold select-none
        bg-main-default border-main-dark border-4 hover:bg-main-light"
      style={{
        width: size + "px",
        height: size + "px",
        left: vertex.position.x + "px",
        top: vertex.position.y + "px",
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {vertex.name}
    </div>
  );
}
