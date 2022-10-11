export default function RadioGroup({
  data = [{ label: "", value: "" }],
  target,
  setTarget = () => {},
}) {
  return (
    <fieldset>
      {data.map((radio, index) => (
        <div className="flex flex-row items-center space-x-1" key={index}>
          <input
            type="radio"
            value={radio.value}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            checked={radio.value === target}
          />
          <span>{radio.label}</span>
        </div>
      ))}
    </fieldset>
  );
}
