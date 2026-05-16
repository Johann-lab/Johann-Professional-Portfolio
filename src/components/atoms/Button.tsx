interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
}

const variantStyles = {
  primary: "bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white border-[#3B82F6] hover:shadow-lg hover:from-[#1E3A8A] hover:to-[#1E40AF] active:scale-95",
  secondary: "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white border-[#A78BFA] hover:shadow-lg hover:from-[#6D28D9] hover:to-[#7C3AED] active:scale-95",
  outline: "bg-white dark:bg-[#1E293B] text-[#1E40AF] dark:text-[#7C3AED] border-[#1E40AF] dark:border-[#7C3AED] hover:bg-[#EEF2FF] dark:hover:bg-[#0F172A] hover:shadow-md active:scale-95",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg font-semibold",
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
    "font-semibold rounded-lg border transition-all duration-300 inline-flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:shadow-none";
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