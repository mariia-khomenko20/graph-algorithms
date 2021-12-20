export default function Cell({ width = "40px", className, ...props }) {
  return (
    <td style={{ width: width }}>
      <input
        className={`w-full px-2 py-1 focus:outline-none ${className}`}
        {...props}
      />
    </td>
  );
}
