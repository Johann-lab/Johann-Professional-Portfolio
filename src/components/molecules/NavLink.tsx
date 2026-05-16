interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: string;
  isActive?: boolean;
  onClick?: () => void;
}

export default function NavLink({
  href,
  children,
  icon,
  isActive = false,
  onClick,
}: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-150 ${
        isActive
          ? "bg-[#1E40AF] text-white shadow-md"
          : "text-[#94A3B8] hover:text-white hover:bg-[#1E40AF]/20"
      }`}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </a>
  );
}