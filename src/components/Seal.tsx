/** 朱红方印：敕封/评级盖印。纯 CSS，篆体感白字。 */
export default function Seal({
  text,
  className = "",
  size = "md",
}: {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "lg"
      ? "h-12 w-12 text-xl"
      : size === "sm"
        ? "h-6 w-6 text-[11px]"
        : "h-9 w-9 text-sm";
  return (
    <span className={`seal ${sizeClass} ${className}`} aria-hidden>
      {text}
    </span>
  );
}
