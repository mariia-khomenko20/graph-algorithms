export default function RadioGroup({
  data = [{ label: "", value: "" }],
  target,
  setTarget = () => {},
}) {
  return (
    <fieldset>
      {data.map((radio, index) => (
        <div className="flex flex-row items-center space-x-1">
          <input
            type="radio"
            value={radio.value}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            checked={radio.value === target}
          />
          <label>{radio.label}</label>
        </div>
      ))}
    </fieldset>
  );
}
