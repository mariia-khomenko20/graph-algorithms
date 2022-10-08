export default function NumberUpDown({ min, max, setValue, ...props }) {
  return (
    <input
      className="w-full h-10 pl-4 rounded-md text-gray-600 outline outline-1 focus:outline-2 focus:outline-primary-default"
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
