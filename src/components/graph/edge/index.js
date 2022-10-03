import classNames from "classnames";
import { useMemo } from "react";

export default function Edge({ data = {} }) {
  const { weight, color } = data;
  const a = data.a.position;
  const b = data.b.position;

  const length = useMemo(
    () => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2),
    [a, b]
  );

  const angle = useMemo(
    () => (Math.atan((b.y - a.y) / (b.x - a.x)) * 180) / Math.PI,
    [a, b]
  );

  const position = a.x <= b.x ? { x: a.x, y: a.y } : { x: b.x, y: b.y };

  const style = {
    width: length,
    height: color === "target" ? "3px" : "2px",
    left: position.x + 30,
    top: position.y + 30,
    transform: `rotate(${angle}deg)`,
  };

  const className = classNames("absolute origin-top-left", {
    "bg-gray-400": !color,
    "bg-yellow-400": color === "target",
    "bg-green-400": color === "result",
    "bg-red-400": color === "wrong",
  });

  return (
    <div className={className} style={style}>
      <span className="absolute left-1/2 -top-8 text-sm select-none">
        {weight}
      </span>
    </div>
  );
}
