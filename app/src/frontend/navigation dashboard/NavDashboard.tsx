"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavLink } from "@/components/molecules";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "Work", href: "/work", icon: "💼" },
  { label: "Logs", href: "/logs/week-1-introduction", icon: "📝" },
];

export default function NavDashboard() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0F172A] to-[#1E293B] border-b border-[#334155] shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-lg tracking-widest">
              JG
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                icon={item.icon}
                isActive={pathname === item.href}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden bg-[#1E40AF] text-white px-3 py-1 rounded-md font-semibold text-sm border border-[#3B82F6] hover:shadow-md transition-shadow"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-3 px-4 text-white hover:bg-[#1E40AF] rounded-md font-medium transition-all text-sm ${
                  pathname === item.href
                    ? "bg-[#1E40AF] text-white"
                    : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}