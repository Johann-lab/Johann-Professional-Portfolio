import { useTheme } from "@/context/ThemeContext";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavLink({
  href,
  children,
  isActive = false,
  onClick,
}: NavLinkProps) {
  const { isDark } = useTheme();

  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-medium text-base transition-all duration-300 ${
        isActive
          ? "text-[#1E40AF]"
          : isDark ? "text-white hover:text-[#1E40AF]" : "text-[#0F172A] hover:text-[#1E40AF]"
      }`}
    >
      {children}
    </a>
  );
}