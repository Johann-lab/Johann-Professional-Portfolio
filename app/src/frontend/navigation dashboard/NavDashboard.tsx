"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLink } from "@/components/molecules";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}

interface NavDashboardProps {
  onOpenMihModal?: () => void;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Work", href: "/work", icon: "💼" },
  { label: "Logs", href: "/logs", icon: "📝" },
];

export default function NavDashboard({ onOpenMihModal }: NavDashboardProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b shadow-lg transition-all duration-300 ${
      isDark 
        ? "bg-[#0F172A]/95 border-[#334155]/30" 
        : "bg-white/95 border-[#E2E8F0]/50"
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-sm font-bold text-white shadow-md">
              JG
            </div>
            <span className="text-xl font-semibold tracking-tight">
              <span className={isDark ? "text-white" : "text-black"}>Johann</span>{" "}
              <span className="text-[#1E40AF]">Gacayan</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 font-semibold rounded-lg transition-all bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white hover:shadow-lg hover:scale-105"
                >
                  <span>{item.icon}</span>
                  {item.label}
                </a>
              ) : (
                <NavLink
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  {item.label}
                </NavLink>
              )
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/#mih-intern"
              className="hidden md:flex items-center gap-2 text-2xl font-bold"
              onClick={(e) => {
                if (onOpenMihModal) {
                  e.preventDefault();
                  onOpenMihModal();
                }
              }}
            >
              <span className={isDark ? "text-white" : "text-black"}>MIH</span>{" "}
              <span className="text-[#1E40AF]">Intern</span>
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-all hover:scale-110 ${
                isDark 
                  ? "bg-white/10 text-yellow-400 hover:bg-white/20" 
                  : "bg-[#0F172A]/10 text-[#0F172A] hover:bg-[#0F172A]/20"
              }`}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 hover:text-[#1E40AF] transition-colors ${
                isDark ? "text-white" : "text-[#0F172A]"
              }`}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className={`md:hidden pb-6 ${isDark ? "bg-[#0F172A]" : "bg-white"}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-2 font-medium transition-all text-sm hover:text-[#1E40AF] rounded-lg mx-2 mb-2 ${
                  pathname === item.href
                    ? "text-[#1E40AF]"
                    : isDark ? "text-white" : "text-[#0F172A]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}
            <Link
              href="/#mih-intern"
              className="block py-3 px-2 text-lg font-bold mx-2 mb-2"
              onClick={(e) => {
                setIsMenuOpen(false);
                if (onOpenMihModal) {
                  e.preventDefault();
                  onOpenMihModal();
                }
              }}
            >
              <span className={isDark ? "text-white" : "text-black"}>MIH</span>{" "}
              <span className="text-[#1E40AF]">Intern</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}