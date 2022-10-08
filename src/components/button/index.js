import classNames from "classnames";

export default function Button({
  children,
  size = "lg",
  flex = true,
  ...props
}) {
  const className = classNames(
    "flex items-center justify-center rounded-md font-medium text-white bg-primary-default hover:bg-primary-light focus:outline-none",
    {
      "h-9 pl-3 pr-4 space-x-1.5 text-sm": size === "sm",
      "h-10 pl-4 pr-5 space-x-2 text-md": size === "md",
      "h-14 pl-5 pr-6 space-x-2 text-lg": size === "lg",
      "w-full": flex,
    }
  );
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
