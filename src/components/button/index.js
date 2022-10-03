import classNames from "classnames";

export default function Button({
  children,
  type = "default",
  size = "lg",
  ...props
}) {
  const className = classNames(
    "flex items-center rounded-md font-medium text-white bg-secondary-default hover:bg-secondary-light focus:shadow-md focus:shadow-secondary-dark",
    {
      "h-9 pl-3 pr-4 space-x-1.5 text-sm": size === "sm",
      "h-10 pl-4 pr-5 space-x-2 text-md": size === "md",
      "h-14 pl-5 pr-6 space-x-2 text-lg": size === "lg",
    }
  );
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
