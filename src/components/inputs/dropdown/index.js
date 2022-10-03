import className from "../className";

export default function Dropdown({ data = [], target = 0, ...props }) {
  return (
    <select className={`${className} h-10`} {...props} value={target}>
      {data.map((value, index) => (
        <option value={index} key={index}>
          {value.name ? value.name : index}
        </option>
      ))}
    </select>
  );
}
