export default function NumberUpDown({ min, max, setValue, ...props }) {
  return (
    <input
      className="flex w-full px-3 py-1 rounded-md outline outline-primary-default outline-1 focus:outline-2"
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
