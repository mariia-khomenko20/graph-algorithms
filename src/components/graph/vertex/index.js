import classNames from "classnames";
import { useEffect, useState } from "react";

var lastPosition = null;

export default function Vertex({ data = {}, setPosition = () => {} }) {
  const { name, position, color } = data;

  useEffect(() => {
    const container = document.getElementById("graph-container");
    const maxX = container ? container.clientWidth - 60 : 500;
    const maxY = container ? container.clientHeight - 60 : 500;
    setPosition({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    });
  }, []);

  const onStartMove = (e) => {
    lastPosition = { x: e.clientX, y: e.clientY };
  };

  const onMove = (e) => {
    if (lastPosition) {
      const x = position.x + e.clientX - lastPosition.x;
      const y = position.y + e.clientY - lastPosition.y;
      setPosition({ x: x > 0 ? x : 0, y: y > 0 ? y : 0 });
      lastPosition = { x: e.clientX, y: e.clientY };
    }
  };

  const onEndMove = () => {
    lastPosition = null;
  };

  const style = {
    width: "60px",
    height: "60px",
    left: position.x,
    top: position.y,
  };

  const className = classNames(
    "absolute flex items-center justify-center rounded-full text-lg font-bold text-white select-none",
    {
      "bg-gray-400": !color,
      "bg-yellow-400": color === "target",
      "bg-green-400": color === "result",
    }
  );

  return (
    <div
      className={className}
      style={style}
      onMouseDown={onStartMove}
      onMouseMove={onMove}
      onMouseLeave={onEndMove}
      onMouseUp={onEndMove}
    >
      <span>{name}</span>
    </div>
  );
}
