export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`w-auto px-6 py-3 
        text-white font-bold 
        bg-main-default border-2 hover:bg-main-light
        rounded-full
        focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
