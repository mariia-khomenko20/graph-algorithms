export default function Dropdown({ data = [], target = 0, ...props }) {
  return (
    <select
      className="w-full h-10 pl-4 rounded-md text-gray-600 outline outline-1 focus:outline-2 focus:outline-primary-default"
      value={target}
      {...props}
    >
      {data.map((value, index) => (
        <option value={index} key={index}>
          {value.name ? value.name : index}
        </option>
      ))}
    </select>
  );
}
