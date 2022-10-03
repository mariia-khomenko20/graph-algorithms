import className from "../className";

export default function NumberUpDown({ min, max, setValue, ...props }) {
  return (
    <input
      className={className}
      type="number"
      min={min}
      max={max}
      onInput={(e) => {
        const value = parseInt(e.target.value);
        if (value >= min && value <= max) setValue(value);
      }}
      {...props}
    />
  );
}
