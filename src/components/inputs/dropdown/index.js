import className from "../className";

export default function Dropdown({ data = [], target = 0, ...props }) {
  return (
    <select className={`${className} h-10`} {...props}>
      {data.map((value, index) => (
        <option value={index} key={index} selected={index === target}>
          {value.name ? value.name : index}
        </option>
      ))}
    </select>
  );
}
