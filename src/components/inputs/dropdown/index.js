export default function Dropdown({ data = [], target = 0, ...props }) {
  return (
    <select
      className="flex w-full px-3 py-1 rounded-md outline outline-primary-default outline-1 focus:outline-2"
      {...props}
    >
      {data.map((value, index) => (
        <option value={index} key={index} selected={index === target}>
          {value.name ? value.name : index}
        </option>
      ))}
    </select>
  );
}
