"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavDashboard from "./navigation dashboard/NavDashboard";
import MihLocationMap from "./components/MihLocationMap";
import { ProjectCard } from "@/components/molecules";
import { Button } from "@/components/atoms";
import { getFeaturedProjects } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { isDark } = useTheme();
  const featuredProjects = getFeaturedProjects();
  const [profileImageIndex, setProfileImageIndex] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [isMihModalOpen, setIsMihModalOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const profileImages = [
    { image: "/profile-image-1.png", label: "Full-Stack Developer" },
    { image: "/profile-image-2.jpg", label: "Code Architect" },
  ];

  const weekDetails = [
    { week: 1, title: "Week 1", desc: "Foundation & Architecture", summary: "Team onboarding and orientation with project scope introduction. Technology stack setup (Next.js, MongoDB, Sui SDK, Pinata Storage) and database initialization with unified role-based user system." },
    { week: 2, title: "Week 2", desc: "Core Development", summary: "GitHub version control seminar. Implemented user project viewing, Leaflet API map integration, CSV upload feature with data preview, and MongoDB structure optimization." },
    { week: 3, title: "Week 3", desc: "API Integration", summary: "Database architecture refinement with multi-connection setup for scalability. Enhanced Shadow Profile feature, created university signup page, and implemented notification system with UI improvements." },
    { week: 4, title: "Week 4", desc: "Full Integration", summary: "Coach platform redesign with improved input validation and auto-responsive email feature. Added coach dashboard with user search functionality and role-based access control." },
    { week: 5, title: "Week 5", desc: "Optimization", summary: "Completed notification system with Level 3 nested comment system supporting likes, replies, and deletion. Implemented favorites feature and strengthened security by protecting API keys." },
    { week: 6, title: "Week 6", desc: "Feature Enhancement", summary: "Redesigned admin interface for all roles with consistent layout. Fixed security vulnerabilities (exposed IDs) and created archive file management page for documentation storage." },
    { week: 7, title: "Week 7", desc: "Testing & QA", summary: "Introduced chat system with one-on-one conversations and rate limiting. Refined system logic, enhanced comment features, and improved security by removing legacy code." },
    { week: 8, title: "Week 8", desc: "Performance Tuning", summary: "Optimized data by removing unnecessary fields. Re-implemented real-time notifications and added online status indicator. Integrated map-based location selection in registration." },
    { week: 9, title: "Week 9", desc: "Documentation", summary: "Enhanced Leaflet map with location data visualization. Implemented shadcn/ui profile sheet, completed project handover documentation, and transitioned to new project with WSL setup." },
    { week: 10, title: "Week 10", desc: "Security Review", summary: "Enhanced Integration Audit module with validation flags for better monitoring. Improved analytics with visibility, mention, and ranking rate calculations. Implemented query deletion UI and backend functionality." },
    { week: 11, title: "Week 11", desc: "Deployment Prep", summary: "Prepared deployment infrastructure and configuration. Set up CI/CD pipelines. Created deployment documentation and runbooks." },
    { week: 12, title: "Week 12", desc: "Launch & Monitoring", summary: "Successfully launched the application to production. Set up monitoring, alerting, and analytics. Monitored system performance and user engagement." },
    { week: 13, title: "Week 13", desc: "Maintenance & Support", summary: "Provided ongoing maintenance and support. Gathered user feedback and identified improvements. Planned for future enhancements and scalability." },
  ];

  const weekIcons = [
    { svg: "M19 12h-2m-4 0H9m4-9V3m0 18v-2M7.05 7.05L5.636 5.636m9.728 9.728l1.414 1.414M7.05 16.95L5.636 18.364m9.728-9.728l1.414-1.414M5 12a7 7 0 1114 0 7 7 0 01-14 0z", label: "Blueprint" },
    { svg: "M10 20v-6h4v6m0-11V3m0 8h.01M3 10h18M3 14h18", label: "Code" },
    { svg: "M13.828 10.172a4 4 0 00-5.656 0l-4.243 4.243a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4.242-4.243a4 4 0 00-5.656-5.656l-1.1 1.1", label: "Link" },
    { svg: "M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Check" },
    { svg: "M13 10V3L4 14h7v7l9-11h-7z", label: "Bolt" },
    { svg: "M12 6V4m6 2a8 8 0 11-16 0 8 8 0 0116 0zm0 8v2m-6-2a8 8 0 01-16 0 8 8 0 0116 0zm-6-2h2m6 0h2", label: "Star" },
    { svg: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2", label: "Check" },
    { svg: "M13 10V3L4 14h7v7l9-11h-7z", label: "Bolt" },
    { svg: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", label: "Doc" },
    { svg: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z", label: "Lock" },
    { svg: "M13 10V3L4 14h7v7l9-11h-7z", label: "Deploy" },
    { svg: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", label: "Chart" },
    { svg: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", label: "Support" },
  ];

  const contactLinks = [
    {
      icon: (
        <img src="https://thesvg.org/icons/gmail/default.svg" alt="Gmail" className="w-6 h-6 brightness-0 invert shrink-0" />
      ),
      href: "mailto:johann@example.com",
      label: "Gmail",
      username: "gacayanjohann@gmail.com",
      bgColorLight: "bg-red-500",
      bgColorDark: "bg-red-600"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/linkedin/default.svg" alt="LinkedIn" className="w-6 h-6 brightness-0 invert shrink-0" />
      ),
      href: "https://www.linkedin.com/in/gacayan-johann-kien-s-9a4434283/",
      label: "LinkedIn",
      target: "_blank",
      username: "Gacayan Johann",
      bgColorLight: "bg-blue-600",
      bgColorDark: "bg-blue-700"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/discord/default.svg" alt="Discord" className="w-6 h-6 brightness-0 invert shrink-0" />
      ),
      href: "https://discord.com/users/726681678894071889",
      label: "Discord",
      target: "_blank",
      username: "726681678894071889",
      bgColorLight: "bg-indigo-600",
      bgColorDark: "bg-indigo-700"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/github/default.svg" alt="GitHub" className="w-6 h-6 shrink-0" />
      ),
      href: "https://github.com/Johann-lab",
      label: "GitHub",
      target: "_blank",
      username: "Johann-lab",
      bgColorLight: "bg-white",
      bgColorDark: "bg-gray-200",
      textColor: "text-gray-900"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/facebook/default.svg" alt="Facebook" className="w-6 h-6 shrink-0" />
      ),
      href: "https://www.facebook.com/JohannGacayan/",
      label: "Facebook",
      target: "_blank",
      username: "Johann Gacayan",
      bgColorLight: "bg-blue-500",
      bgColorDark: "bg-blue-600"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/vercel/default.svg" alt="Vercel" className="w-6 h-6 brightness-0 invert shrink-0" />
      ),
      href: "https://vercel.com/johann-labs-projects",
      label: "Vercel",
      target: "_blank",
      username: "johann-labs-projects",
      bgColorLight: "bg-black",
      bgColorDark: "bg-gray-900"
    },
  ];

  const handleProfileHover = () => {
    setProfileImageIndex((prev) => (prev + 1) % profileImages.length);
  };

  const mihSocialLinks = [
    {
      icon: (
        <img src="https://thesvg.org/icons/facebook/default.svg" alt="Facebook" className="w-4 h-4 flex-shrink-0" />
      ),
      href: "https://www.facebook.com/makerspaceinnovhub",
      label: "Facebook",
      target: "_blank",
      username: "makerspaceinnovhub",
      bgColorLight: "bg-blue-500",
      bgColorDark: "bg-blue-600"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/linkedin/default.svg" alt="LinkedIn" className="w-4 h-4 brightness-0 invert flex-shrink-0" />
      ),
      href: "https://www.linkedin.com/company/makerspace-innovhub-opc/people/",
      label: "LinkedIn",
      target: "_blank",
      username: "Makerspace InnovHub",
      bgColorLight: "bg-blue-700",
      bgColorDark: "bg-blue-800"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/x/default.svg" alt="X" className="w-4 h-4 flex-shrink-0" />
      ),
      href: "https://x.com/makerspaceinnov",
      label: "X",
      target: "_blank",
      username: "makerspaceinnov",
      bgColorLight: "bg-sky-500",
      bgColorDark: "bg-sky-600"
    },
    {
      icon: (
        <img src="https://thesvg.org/icons/whatsapp/default.svg" alt="WhatsApp" className="w-4 h-4 flex-shrink-0" />
      ),
      href: "https://wa.me/639171798813",
      label: "WhatsApp",
      target: "_blank",
      username: "+63917-179-8813",
      bgColorLight: "bg-emerald-600",
      bgColorDark: "bg-emerald-700"
    },
  ];

  const mihContacts = [
    {
      icon: <img src="https://thesvg.org/icons/gmail/default.svg" alt="Gmail" className="w-4 h-4 brightness-0 invert" />,
      href: "mailto:info@makerspace.ph",
      label: "Gmail",
      username: "info@makerspace.ph",
      bgColorLight: "bg-red-500",
      bgColorDark: "bg-red-600",
    },
    {
      icon: <img src="/logos/makerspacelogo.png" alt="Makerspace" className="w-4 h-4 object-contain" />,
      href: "https://www.makerspace.ph/",
      label: "Open MIH",
      target: "_blank",
      username: "Makerspace InnovHub OPC",
      bgColorLight: "bg-gradient-to-br from-[#1E40AF] to-[#7C3AED]",
      bgColorDark: "bg-[#1E40AF]",
    },
  ];

  const socialsCombined = [...mihContacts, ...mihSocialLinks];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.email || !formData.message) {
      setFormStatus("error");
      setFormMessage("Please fill in all fields");
      return;
    }

    setFormStatus("loading");

    try {
      // Simulate sending email (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setFormStatus("success");
      setFormMessage("Thank you! I'll get back to you soon.");
      setFormData({ email: "", message: "" });
      
      setTimeout(() => {
        setFormStatus("idle");
        setFormMessage("");
      }, 5000);
    } catch {
      setFormStatus("error");
      setFormMessage("Failed to send message. Please try again.");
      setTimeout(() => {
        setFormStatus("idle");
        setFormMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY * 0.8;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, []);

  useEffect(() => {
    const openModalFromHash = () => {
      setIsMihModalOpen(window.location.hash === "#mih-intern");
    };

    openModalFromHash();
    window.addEventListener("hashchange", openModalFromHash);

    return () => window.removeEventListener("hashchange", openModalFromHash);
  }, []);

  return (
    <div className={`min-h-screen animate-in fade-in duration-1000 transition-colors ${
      isDark 
        ? "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]" 
        : "bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#FFFFFF]"
    }`}>
      <NavDashboard onOpenMihModal={() => setIsMihModalOpen(true)} />

      {isMihModalOpen && (
        <div className="fixed inset-0 z-[60] grid place-items-center px-4 py-6">
          <button
            aria-label="Close MIH Intern modal"
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => {
              setIsMihModalOpen(false);
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            }}
          />
          <div
            id="mih-intern"
            className={`relative z-10 w-full max-w-4xl max-h-[calc(100vh-2rem)] overflow-y-auto rounded-3xl border shadow-2xl ${
              isDark ? "bg-[#0F172A] border-[#334155]" : "bg-white border-[#E2E8F0]"
            }`}
          >
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/10">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#1E40AF] font-semibold">MIH Intern</p>
                <h2 className={`mt-2 text-2xl font-bold ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                  Public details
                </h2>
              </div>
              <button
                onClick={() => {
                  setIsMihModalOpen(false);
                  window.history.replaceState(null, "", window.location.pathname + window.location.search);
                }}
                className={`rounded-full px-3 py-1 text-sm font-semibold transition-colors ${
                  isDark ? "bg-white/10 text-white hover:bg-white/20" : "bg-[#0F172A]/10 text-[#0F172A] hover:bg-[#0F172A]/20"
                }`}
              >
                Close
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div className={`rounded-3xl border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/5" : "border-[#E2E8F0] bg-[#F8FAFC]"}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E40AF]">Location</p>
                <div className="mt-4 flex items-start gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-[#1E40AF] shadow-[0_0_0_6px_rgba(30,64,175,0.15)]" />
                  <div>
                    <p className={`text-2xl font-bold ${isDark ? "text-white" : "text-[#0F172A]"}`}>
                      Makerspace Innovhub OPC
                    </p>
                    <p className={`mt-2 text-sm leading-6 ${isDark ? "text-[#CBD5E1]" : "text-[#475569]"}`}>
                      The location is shown below on the map for quick reference.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <MihLocationMap />
              </div>

              <div className={`rounded-3xl border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/5" : "border-[#E2E8F0] bg-[#F8FAFC]"}`}>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#1E40AF]">Makerspace InnovHub OPC</p>
                <div className="mt-5 flex flex-wrap gap-4">
                  {socialsCombined.map((item, i) => (
                    <div key={i} className="group">
                      <a
                        href={item.href}
                        target={item.target}
                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                        title={item.label}
                        className={`inline-flex items-center gap-4 p-4 rounded-full text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:brightness-110 border-2 border-transparent group-hover:px-6 ${
                          isDark ? "group-hover:border-white group-hover:shadow-white/30" : "group-hover:border-[#1E40AF] group-hover:shadow-black/20"
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full ${isDark ? item.bgColorDark : item.bgColorLight} shadow-inner`}>
                          {item.icon}
                        </div>
                        <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1E40AF]"} opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden group-hover:inline-block`}>
                          {item.username}
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Open MIH footer button removed per request */}
          </div>
        </div>
      )}

      <section
        id="home"
        className="pt-32 pb-20 px-4 min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#7C3AED] opacity-3 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1E40AF] opacity-3 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-items-center md:justify-items-stretch">
            <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 delay-100 w-full">
              <div className="inline-block bg-[#1E40AF] text-white px-4 py-2 font-semibold text-xs tracking-wider rounded-md shadow-sm">
                FULL-STACK DEVELOPER
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className={isDark ? "text-white" : "text-black"}>Johann</span>
                <br />
                <span className="text-[#1E40AF]">Gacayan</span>
              </h1>
              <p className={`text-lg max-w-md leading-relaxed ${
                isDark ? "text-[#CBD5E1]" : "text-[#475569]"
              }`}>
                I design and develop modular, enterprise-grade applications with precision and clarity. Every project is built with scalability, maintainability, and excellence as core principles.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button href="/work" variant="primary" size="lg" className="hover:scale-105 transition-transform">
                  View Work
                </Button>
                <Button href="/logs" variant="outline" size="lg" className="hover:scale-105 transition-transform">
                  Read Logs
                </Button>
              </div>
            </div>

            <div className="flex justify-center animate-in fade-in slide-in-from-right-8 duration-700 delay-100 w-full">
              <div className="relative w-full max-w-sm">
                <Image 
                  src={profileImages[profileImageIndex].image}
                  alt="Profile"
                  width={400}
                  height={400}
                  className="w-full rounded-3xl border-4 border-[#7C3AED] shadow-2xl hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] transition-all duration-300 transform hover:scale-105 cursor-pointer object-cover"
                  onMouseEnter={handleProfileHover}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className={`py-40 px-4 relative transition-colors ${
        isDark ? "bg-[#0F172A]" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              Featured <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className={`text-lg max-w-3xl mx-auto leading-relaxed ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}>
              Carefully crafted solutions demonstrating technical excellence and strategic thinking across diverse domains.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.slice(0, 3).map((project, i) => (
              <div key={project.id} className="animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${200 + i * 100}ms` }}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <div className="text-center">
            <Button href="/work" variant="secondary" size="lg" className="hover:scale-105 transition-transform">
              View All Projects →
            </Button>
          </div>
        </div>
      </section>

      <section id="timeline" className={`py-40 px-4 transition-colors ${
        isDark ? "bg-gradient-to-b from-[#0F172A] to-[#1E293B]" : "bg-gradient-to-b from-white to-[#F8FAFC]"
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              Development <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Timeline</span>
            </h2>
          </div>
          <div className="relative">
            <div className="overflow-x-auto pb-4 custom-scrollbar" ref={scrollContainerRef}>
              <div className="flex gap-6 min-w-max px-4">
                {weekDetails.map((item, i) => (
                  <div key={i} className="flex-shrink-0 w-72 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer group" style={{ animationDelay: `${i * 30}ms` }} onClick={() => setSelectedWeek(item.week)}>
                    <div className="flex flex-col items-center gap-4 h-full">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300" />
                        <div className="relative w-20 h-20 bg-gradient-to-br from-[#1E40AF] via-[#2E5FD8] to-[#1E3A8A] rounded-lg flex items-center justify-center font-bold text-white shadow-lg group-hover:shadow-2xl transition-all duration-300">
                          <span className="text-4xl">{item.week}</span>
                        </div>
                      </div>
                      <div className={`bg-gradient-to-br p-5 rounded-xl border shadow-md hover:shadow-xl hover:border-[#7C3AED] transition-all duration-300 w-full group-hover:scale-105 group-hover:-translate-y-1 ${
                        isDark 
                          ? "from-[#1E293B] via-[#1E293B] to-[#0F172A] border-[#334155] shadow-black/40" 
                          : "from-white via-[#FAFBFC] to-[#F3F4F6] border-[#E2E8F0] shadow-gray-100/50"
                      }`}>
                        <h3 className={`font-bold text-center text-base mb-2 group-hover:text-[#1E40AF] transition-colors ${
                          isDark ? "text-white" : "text-[#0F172A]"
                        }`}>{item.title}</h3>
                        <div className={`h-0.5 w-8 bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] mx-auto mb-3 group-hover:w-12 transition-all duration-300 ${
                          isDark ? "opacity-80" : ""
                        }`} />
                        <p className={`text-center text-xs leading-relaxed ${
                          isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                        }`}>{item.desc}</p>
                        <div className={`mt-4 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isDark ? "text-[#7C3AED]" : "text-[#1E40AF]"
                        }`}>
                          <span className="text-sm font-semibold">View Details</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedWeek && (
        <div className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300 ${
          isDark ? "bg-black/40" : "bg-white/20"
        }`} onClick={() => setSelectedWeek(null)}>
          <div className={`rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-in zoom-in slide-in-from-bottom-8 duration-300 ${
            isDark ? "bg-[#0F172A]" : "bg-white"
          }`} onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-br from-[#1E40AF] via-[#3B5FD8] to-[#7C3AED] p-8 rounded-t-2xl relative overflow-hidden group">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              </div>
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={weekIcons[selectedWeek - 1].svg} />
                    </svg>
                    <h3 className="text-4xl font-bold text-white">{weekDetails[selectedWeek - 1].title}</h3>
                  </div>
                  <div className="h-1 w-24 bg-gradient-to-r from-white to-transparent rounded-full" />
                </div>
                <button
                  onClick={() => setSelectedWeek(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-3 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-[#7C3AED] uppercase tracking-wider mb-3">Summary</h4>
                <p className={`text-lg leading-relaxed ${
                  isDark ? "text-[#CBD5E1]" : "text-[#475569]"
                }`}>
                  {weekDetails[selectedWeek - 1].summary}
                </p>
              </div>
              <div className={`h-px bg-gradient-to-r via-[#7C3AED] ${
                isDark ? "from-[#334155] to-[#334155]" : "from-[#E2E8F0] to-[#E2E8F0]"
              }`} />
              <div>
                <div className={`bg-gradient-to-br p-6 rounded-xl border-2 hover:border-[#7C3AED] transition-all duration-300 ${
                  isDark 
                    ? "from-[#1E293B] to-[#0F172A] border-[#334155]" 
                    : "from-[#F0F4FF] to-[#F8FAFC] border-[#E2E8F0]"
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E40AF] to-[#7C3AED] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className={`text-sm font-bold uppercase tracking-wider ${
                      isDark ? "text-white" : "text-[#0F172A]"
                    }`}>Focus Area</p>
                  </div>
                  <p className={`leading-relaxed font-medium ${
                    isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                  }`}>{weekDetails[selectedWeek - 1].desc}</p>
                </div>
              </div>
              <Link
                href="/logs"
                className="block w-full mt-6 px-6 py-3 text-center bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedWeek(null)}
              >
                Go to Logs
              </Link>
            </div>
          </div>
        </div>
      )}

      <section id="about" className={`py-40 px-4 transition-colors ${
        isDark ? "bg-[#1E293B]" : "bg-white"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className={`text-5xl md:text-6xl font-bold mb-4 ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              Core <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Expertise</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "▪",
                title: "Architecture",
                desc: "Build the systems behind featured work like Sillag and Portfolio, where Next.js, TypeScript, and MongoDB need a clean, scalable structure.",
              },
              {
                icon: "▪",
                title: "Engineering",
                desc: "Turn project ideas into polished products such as PromptGraph and the portfolio site, combining React, Python, and API-driven workflows.",
              },
              {
                icon: "▪",
                title: "Optimization",
                desc: "Refine featured projects for speed, responsiveness, and clarity so each stack choice supports the final user experience.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-8 rounded-lg hover:shadow-md transition-all group animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                  isDark 
                    ? "bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#334155] hover:border-[#7C3AED]" 
                    : "bg-gradient-to-br from-[#F8FAFC] to-[#EEF2FF] border border-[#E2E8F0] hover:border-[#7C3AED]"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-3xl mb-4 font-bold text-[#7C3AED] group-hover:text-[#1E40AF] transition-colors">{item.icon}</div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  isDark ? "text-white" : "text-[#0F172A]"
                }`}>
                  {item.title}
                </h3>
                <p className={`leading-relaxed ${
                  isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
                }`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-40 px-4 bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#2D1B69]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Let&apos;s Work <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Together</span>
          </h2>
          <p className="text-[#CBD5E1] mb-12 text-lg leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            Ready to discuss your next project or explore collaboration opportunities? I&apos;d be delighted to hear from you.
          </p>
          <div className="flex justify-center gap-8 flex-wrap animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {[
              {
                icon: (
                  <img src="https://thesvg.org/icons/gmail/default.svg" alt="Gmail" className="w-8 h-8 brightness-0 invert flex-shrink-0" />
                ),
                href: "mailto:johann@example.com",
                label: "Gmail",
                username: "gacayanjohann@gmail.com",
                bgColorLight: "bg-red-500",
                bgColorDark: "bg-red-600"
              },
              {
                icon: (
                  <img src="https://thesvg.org/icons/linkedin/default.svg" alt="LinkedIn" className="w-8 h-8 brightness-0 invert flex-shrink-0" />
                ),
                href: "https://linkedin.com/in/johann",
                label: "LinkedIn",
                target: "_blank",
                username: "Gacayan Johann",
                bgColorLight: "bg-blue-600",
                bgColorDark: "bg-blue-700"
              },
            ].map((contact, i) => (
              <div key={i} className="group">
                <a
                  href={contact.href}
                  target={contact.target}
                  rel={contact.target === "_blank" ? "noopener noreferrer" : undefined}
                  title={contact.label}
                  className={`inline-flex items-center gap-3 p-4 rounded-full ${isDark ? contact.bgColorDark : contact.bgColorLight} text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:brightness-110 border-2 border-transparent group-hover:px-6 ${
                    isDark ? "group-hover:border-white group-hover:shadow-white/30" : "group-hover:border-[#1E40AF] group-hover:shadow-black/20"
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {contact.icon}
                  <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1E40AF]"} opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden group-hover:inline-block`}>
                    {contact.username}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-info" className={`py-40 px-4 transition-colors ${
        isDark ? "bg-gradient-to-b from-[#0F172A] to-[#1E293B]" : "bg-gradient-to-b from-white to-[#F8FAFC]"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              isDark ? "text-white" : "text-[#0F172A]"
            }`}>
              <span className="bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] bg-clip-text text-transparent">Get in Touch</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-[#CBD5E1]" : "text-[#64748B]"
            }`}>
              Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you within 24-48 hours.
            </p>
          </div>

          <div className={`rounded-2xl border-2 p-8 md:p-12 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-4 duration-700 ${
            isDark
              ? "bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] border-[#334155]"
              : "bg-gradient-to-br from-[#F8FAFC] via-white to-[#F3F4F6] border-[#E2E8F0]"
          }`}>
            <form onSubmit={handleContactSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  isDark ? "text-white" : "text-[#0F172A]"
                }`}>
                  Your Email
                </label>
                <div className="relative group">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className={`w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:scale-105 ${
                      isDark
                        ? "bg-[#0F172A] border-[#334155] text-white placeholder-[#64748B] focus:border-[#7C3AED] focus:shadow-lg focus:shadow-[#7C3AED]/20"
                        : "bg-white border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1E40AF] focus:shadow-lg focus:shadow-[#1E40AF]/10"
                    }`}
                  />
                  <svg className={`absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                    isDark ? "text-[#64748B]" : "text-[#94A3B8]"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>

              {/* Message Textarea */}
              <div className="space-y-2">
                <label className={`block text-sm font-semibold ${
                  isDark ? "text-white" : "text-[#0F172A]"
                }`}>
                  Your Message
                </label>
                <div className="relative group">
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your project or idea..."
                    rows={6}
                    className={`w-full px-6 py-4 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:scale-105 resize-none ${
                      isDark
                        ? "bg-[#0F172A] border-[#334155] text-white placeholder-[#64748B] focus:border-[#7C3AED] focus:shadow-lg focus:shadow-[#7C3AED]/20"
                        : "bg-white border-[#E2E8F0] text-[#0F172A] placeholder-[#94A3B8] focus:border-[#1E40AF] focus:shadow-lg focus:shadow-[#1E40AF]/10"
                    }`}
                  />
                  <svg className={`absolute right-4 top-4 w-5 h-5 transition-colors pointer-events-none ${
                    isDark ? "text-[#64748B]" : "text-[#94A3B8]"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>

              {/* Status Message */}
              {formMessage && (
                <div className={`p-4 rounded-lg border-2 text-sm font-medium animate-in fade-in duration-300 ${
                  formStatus === "success"
                    ? isDark
                      ? "bg-green-900/20 border-green-500/50 text-green-400"
                      : "bg-green-50 border-green-200 text-green-700"
                    : isDark
                    ? "bg-red-900/20 border-red-500/50 text-red-400"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}>
                  {formStatus === "loading" && (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {formMessage}
                    </span>
                  )}
                  {formStatus !== "loading" && formMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === "loading"}
                className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 ${
                  formStatus === "success"
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-[#1E40AF] to-[#7C3AED] hover:from-[#1E3A8A] hover:to-[#6D28D9]"
                }`}
              >
                {formStatus === "loading" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Sending...
                  </span>
                ) : formStatus === "success" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </button>

              <p className={`text-xs text-center ${
                isDark ? "text-[#64748B]" : "text-[#94A3B8]"
              }`}>
                I respect your privacy. Your information will only be used to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-[#0F172A] text-[#94A3B8] py-12 text-center border-t border-[#334155]/50">
        <div className="mb-8 flex justify-center gap-6 flex-wrap">
          {contactLinks.map((contact, i) => (
            <div key={i} className="group">
              <a
                href={contact.href}
                target={contact.target}
                rel={contact.target === "_blank" ? "noopener noreferrer" : undefined}
                title={contact.label}
                className={`inline-flex items-center gap-3 p-4 rounded-full ${isDark ? contact.bgColorDark : contact.bgColorLight} ${isDark ? "text-white" : (contact.textColor || "text-white")} shadow-lg hover:shadow-2xl transition-all duration-300 hover:brightness-110 border-2 border-transparent group-hover:px-6 ${
                  isDark ? "group-hover:border-white group-hover:shadow-white/30" : "group-hover:border-[#1E40AF] group-hover:shadow-black/20"
                }`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {contact.icon}
                <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#1E40AF]"} opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap hidden group-hover:inline-block`}>
                  {contact.username}
                </span>
              </a>
            </div>
          ))}
        </div>
        <p className="font-medium text-sm">
          © 2024 Johann Gacayan. Built with precision and attention to detail.
        </p>
      </footer>
    </div>
  );
}