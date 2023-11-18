import { cn } from "@/utils/classMerge";

const Button = ({
  type = "button",
  Icon,
  text,
  varientColor,
  size,
  disabled,
}: {
  type?: "button" | "submit" | "reset";
  Icon?: React.FunctionComponent<{ className?: string }>;
  text: string;
  varientColor?: string;
  size?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        `border ${Icon ? "flex items-center gap-2" : ""} ${
          varientColor == "primary"
            ? "border-[var(--clr-primary)] text-primary"
            : varientColor == "delete"
            ? "border-red-500 text-red-500"
            : "text-neutral-white-light bg-neutral-black"
        } ${
          size == "sm" ? "text-sm" : size == "lg" ? "text-lg" : ""
        } rounded-lg font-semibold px-10 py-4`
      )}
      type={type}
    >
      {Icon && <Icon />}
      {text}
    </button>
  );
};

export default Button;
