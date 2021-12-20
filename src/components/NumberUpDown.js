export default function NumberUpDown({ ...props }) {
  return (
    <input className="px-2 py-1 focus:outline-none" type="number" {...props} />
  );
}
