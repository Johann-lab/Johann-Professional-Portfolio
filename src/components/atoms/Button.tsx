interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

const variantStyles = {
  primary: "bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white border-[#3B82F6] hover:shadow-md hover:from-[#1E3A8A] hover:to-[#1E40AF]",
  secondary: "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white border-[#A78BFA] hover:shadow-md hover:from-[#6D28D9] hover:to-[#7C3AED]",
  outline: "bg-white text-[#1E40AF] border-[#1E40AF] hover:bg-[#EEF2FF] hover:border-[#1E40AF]",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-bold",
};

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  href,
}: ButtonProps) {
  const baseStyles =
    "font-semibold rounded-lg border transition-all inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:shadow-none";
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={styles}>
      {children}
    </button>
  );
}