"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  RiSearchLine,
  RiNotification3Line,
  RiUserLine,
  RiSettings4Line,
  RiBarChart2Line,
  RiLogoutBoxRLine,
  RiCalendarTodoLine,
  RiErrorWarningLine,
  RiArrowRightSLine,
  RiBookLine,
  RiBrainLine,
  RiFileList3Line,
} from "react-icons/ri";
import { createClient } from "@/utils/supabase/client";

const notifications = [
  { title: "Revision due — Functional Dependency", sub: "Today at 3:00 PM",            time: "2m ago",    unread: true  },
  { title: "Quiz result — DBMS Unit 3 — 71%",      sub: "You improved 12% from last",  time: "1h ago",    unread: true  },
  { title: "Weakness detected — Transaction Mgmt", sub: "New critical concept flagged", time: "Yesterday", unread: false },
];

const userMenuItems = [
  { icon: RiUserLine,      label: "My Profile"  },
  { icon: RiSettings4Line, label: "Settings"    },
  { icon: RiBarChart2Line, label: "Usage Stats" },
];

export default function DashboardTopBar({ user }) {
  const [userOpen,       setUserOpen]       = useState(false);
  const [notifOpen,      setNotifOpen]      = useState(false);
  const [query,          setQuery]          = useState("");
  const [results,        setResults]        = useState([]);
  const [searchOpen,     setSearchOpen]     = useState(false);
  const [searching,      setSearching]      = useState(false);
  const searchRef = useRef(null);
  const router    = useRouter();

  // Close search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) { setResults([]); setSearchOpen(false); return; }

    const timer = setTimeout(async () => {
      setSearching(true);
      const supabase = createClient();
      const q = `%${query.trim()}%`;

      const [{ data: courses }, { data: concepts }, { data: quizzes }] = await Promise.all([
        supabase
          .from("courses")
          .select("id, course_name")
          .ilike("course_name", q)
          .limit(3),
        supabase
          .from("concepts")
          .select("id, concept_name, course_id")
          .ilike("concept_name", q)
          .limit(3),
        supabase
          .from("quizzes")
          .select("id, course_id, created_at")
          .limit(3),
      ]);

      const combined = [
        ...(courses  || []).map(c => ({ id: c.id,  label: c.course_name,                        type: "Course",  icon: RiBookLine,     href: `/dashboard/courses/${c.id}`  })),
        ...(concepts || []).map(c => ({ id: c.id,  label: c.concept_name,                       type: "Concept", icon: RiBrainLine,    href: `/dashboard/concepts/${c.id}` })),
        ...(quizzes  || []).map(q => ({ id: q.id,  label: `Quiz — ${q.created_at?.slice(0,10)}`, type: "Quiz",    icon: RiFileList3Line, href: `/dashboard/quiz/${q.id}`    })),
      ];

      setResults(combined);
      setSearchOpen(combined.length > 0);
      setSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (href) => {
    setSearchOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <header className="h-[54px] flex items-center justify-between px-6 relative z-50 bg-dark">

      {/* Search */}
      <div ref={searchRef} className="relative flex-1 max-w-[360px]">
        <div className="flex items-center gap-2 h-[34px] px-3 bg-[#171717] rounded-xl focus-within:ring-1 focus-within:ring-brand/30 transition-all">
          <RiSearchLine className="text-secondary-text text-[15px] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => { if (results.length > 0) setSearchOpen(true); }}
            placeholder="Search for concepts, quizzes..."
            className="flex-1 bg-transparent text-[12px] text-white placeholder:text-white/20 outline-none"
          />
          {searching ? (
            <span className="text-[9px] text-secondary-text">...</span>
          ) : (
            <span className="text-[9px] text-secondary-text bg-[#1a1a1a] px-1.5 py-0.5 rounded-md">⌘K</span>
          )}
        </div>

        {/* Results dropdown */}
        {searchOpen && results.length > 0 && (
          <div className="absolute top-[42px] left-0 w-full bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden z-50">
            {results.map(({ id, label, type, icon: Icon, href }) => (
              <button
                key={id}
                onClick={() => handleSelect(href)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors text-left"
              >
                <div className="w-6 h-6 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Icon className="text-brand text-[12px]" />
                </div>
                <span className="text-[12px] text-white flex-1 truncate">{label}</span>
                <span className="text-[10px] text-[#555] shrink-0">{type}</span>
              </button>
            ))}
          </div>
        )}

        {/* No results */}
        {searchOpen && results.length === 0 && !searching && query.trim() && (
          <div className="absolute top-[42px] left-0 w-full bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden z-50 px-4 py-3">
            <p className="text-[12px] text-[#555]">No results for "{query}"</p>
          </div>
        )}
      </div>

      {/* Right zone */}
      <div className="flex items-center gap-3">

        {/* Due today */}
        <Link
          href="/revision"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FBBF24]/10 rounded-lg hover:bg-[#FBBF24]/15 transition-all"
        >
          <RiCalendarTodoLine className="text-[#FBBF24] text-[13px]" />
          <span className="text-[11px] font-bold text-[#FBBF24]">3 due today</span>
        </Link>

        {/* Bell */}
        <div className="relative">
          <button
            onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
            className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.04] transition-colors"
          >
            <RiNotification3Line className="text-[#666] text-[18px]" />
            <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-11 w-[290px] bg-[#1a1a1a] rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[13px] font-semibold text-white">Notifications</span>
                <button className="text-[11px] text-brand hover:underline">Mark all read</button>
              </div>
              <div className="flex flex-col">
                {notifications.map(({ title, sub, time, unread }) => (
                  <div
                    key={title}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-white/[0.02] transition-colors ${unread ? "bg-brand/[0.02]" : ""}`}
                  >
                    <RiErrorWarningLine className="text-brand mt-0.5 text-[14px]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] text-white font-medium leading-tight">{title}</p>
                      <p className="text-[10px] text-[#888] mt-0.5">{sub}</p>
                    </div>
                    <span className="text-[10px] text-[#444] mt-0.5">{time}</span>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 text-center">
                <button className="text-[12px] text-brand hover:underline flex items-center justify-center gap-1">
                  View all notifications
                  <RiArrowRightSLine className="text-[14px]" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User */}
        <div className="relative">
          <button
            onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-right hidden md:block capitalize">
              <p className="text-[12px] font-semibold text-white leading-none">{user.name}</p>
              <p className="text-[10px] text-secondary-text mt-0.5">{user.role}</p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-brand flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[11px] font-bold text-white">{user.initials}</span>
              )}
            </div>
          </button>

          {userOpen && (
            <div className="absolute right-0 top-11 w-[200px] bg-[#1a1a1a] rounded-2xl shadow-2xl z-50 overflow-hidden">
              <div className="px-4 py-3.5">
                <p className="text-[13px] font-semibold text-white">{user.name}</p>
                <p className="text-[11px] text-[#888] mt-0.5">{user.email}</p>
              </div>
              <div className="px-2 pb-2">
                {userMenuItems.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="w-full text-left px-3 py-2 text-[12px] text-[#888] hover:text-white hover:bg-white/[0.04] rounded-lg transition-all flex items-center gap-2.5"
                  >
                    <Icon className="text-[14px]" />
                    {label}
                  </button>
                ))}
                <div className="mx-3 my-1.5 h-px bg-white/[0.06]" />
                <button
                  onClick={async () => { const s = createClient(); await s.auth.signOut(); router.push("/login"); }}
                  className="w-full text-left px-3 py-2 text-[12px] text-[#888] hover:text-[#F87171] hover:bg-[#F87171]/[0.04] rounded-lg transition-all flex items-center gap-2.5"
                >
                  <RiLogoutBoxRLine className="text-[14px]" />
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}