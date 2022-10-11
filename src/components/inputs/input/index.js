export default function Input({ height = "40px", ...props }) {
  const style = { height: height };
  return (
    <input
      className="w-full h-10 pl-4 rounded-md text-gray-600 outline outline-1 focus:outline-2 focus:outline-primary-default"
      {...props}
    />
  );
}
