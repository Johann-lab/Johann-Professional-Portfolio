interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const defaultColors: Record<string, string> = {
  default: "#1E40AF",
  blue: "#1E40AF",
  purple: "#7C3AED",
  slate: "#64748B",
  navy: "#0F172A",
  red: "#DC2626",
  green: "#059669",
  orange: "#EA580C",
};

export default function Badge({
  children,
  color = "default",
  className = "",
}: BadgeProps) {
  const bgColor = defaultColors[color] || color;

  return (
    <span
      className={`px-3 py-1.5 text-xs font-semibold text-white rounded-md shadow-sm hover:shadow-md hover:scale-105 transition-all ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {children}
    </span>
  );
}