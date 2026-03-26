"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  RiDashboardLine,
  RiFileTextLine,
  RiChat3Line,
  RiBrainLine,
  RiBarChart2Line,
  RiCalendarTodoLine,
  RiSettingsLine,
  RiArrowDownSLine,
  RiBookOpenLine,
  RiMapLine,
  RiAdminLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowRightSLine,
} from "react-icons/ri"
import { MdOutlineUploadFile } from "react-icons/md"

const navSections = [
  {
    label: "Main",
    items: [
      { icon: RiDashboardLine,    label: "Dashboard",      href: "/dashboard"                },
      { icon: RiBookOpenLine,     label: "My Courses",     href: "/courses"        },
      { icon: RiFileTextLine,     label: "Documents",      href: "/documents"        },
    ],
  },
  {
    label: "Learning",
    items: [
      { icon: RiChat3Line,        label: "Ask Your Notes", href: "/chat"           },
      { icon: RiBrainLine,        label: "Quiz Center",    href: "/quizzes"        },
      { icon: RiCalendarTodoLine, label: "Revision",       href: "/revision"       },
      { icon: RiMapLine,          label: "Knowledge Map",  href: "/knowledge-map", badge: "Soon" },
    ],
  },
  {
    label: "Analytics",
    items: [
      { icon: RiBarChart2Line,    label: "Analytics",      href: "/dashboard/analytics"      },
    ],
  },
  {
    label: "Account",
    items: [
      { icon: RiSettingsLine,     label: "Settings",       href: "/dashboard/settings"       },
      { icon: RiAdminLine,        label: "Admin",          href: "/admin",                   badge: "Admin" },
    ],
  },
]

// ── SHARED NAV CONTENT ────────────────────────────────────
function SidebarContent({ pathname, onClose }) {
  return (
    <>
      {/* Logo */}
      <div className="px-5 py-5 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 10 10" fill="none" className="w-3.5 h-3.5">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-bold text-white leading-none">Learnova</p>
            <p className="text-[9px] text-brand font-bold uppercase tracking-wider mt-0.5">
              Student Portal
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.04] text-secondary-text hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <RiCloseLine className="text-[18px]" />
          </button>
        )}
      </div>

      {/* Active course */}
      <div className="px-4 mb-3 flex-shrink-0">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] px-1 mb-1.5">
          Current Course
        </p>
        <div className="flex items-center gap-2 px-3 py-2.5 bg-brand/10 rounded-xl cursor-pointer hover:bg-brand/15 transition-all">
          <RiBookOpenLine className="text-brand text-[14px] flex-shrink-0" />
          <span className="text-[12px] text-white font-medium truncate flex-1">
            DBMS — Sem 4
          </span>
          <RiArrowDownSLine className="text-[#888] text-[14px] flex-shrink-0" />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 overflow-y-auto pb-2">
        {navSections.map(({ label, items }) => (
          <div key={label} className="mb-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#444] px-2 mb-1">
              {label}
            </p>
            {items.map(({ icon: Icon, label: itemLabel, href, badge }) => {
              const active = pathname === href || pathname.startsWith(href + "/")
              return (
                <Link
                  key={itemLabel}
                  href={href}
                  onClick={onClose ?? undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all duration-150 group ${
                    active
                      ? "bg-brand/15 text-white"
                      : "text-secondary-text hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon
                    className={`text-[16px] flex-shrink-0 transition-colors ${
                      active ? "text-brand" : "group-hover:text-white"
                    }`}
                  />
                  <span className="text-[13px] font-medium flex-1">{itemLabel}</span>
                  {badge && (
                    <span
                      className={`text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                        badge === "Soon"
                          ? "bg-white/[0.06] text-secondary-text"
                          : "bg-brand/15 text-brand"
                      }`}
                    >
                      {badge}
                    </span>
                  )}
                  {active && !badge && (
                    <RiArrowRightSLine className="text-brand text-[14px] flex-shrink-0" />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Storage + Upload */}
      <div className="p-4 flex-shrink-0 border-t border-white/[0.04]">
        <Link
          href="/dashboard/courses"
          onClick={onClose ?? undefined}
          className="w-full h-9 bg-brand text-white text-[12px] font-bold rounded-xl flex items-center justify-center gap-2 hover:brightness-110 transition-all mb-3"
        >
          <MdOutlineUploadFile className="text-[15px]" />
          Upload Document
        </Link>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-secondary-text">Storage</span>
          <span className="text-[11px] text-secondary-text">3.2 / 5 GB</span>
        </div>
        <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: "64%" }} />
        </div>
        <p className="text-[10px] text-[#444] mt-1">1.8 GB remaining</p>
      </div>
    </>
  )
}

// ── DESKTOP SIDEBAR ───────────────────────────────────────
export function DashboardSidebar() {
  const pathname = usePathname()

  return (
   <aside className="hidden lg:flex w-[300px] flex-shrink-0 flex-col h-screen sticky top-0 z-40 bg-dark">

      <SidebarContent pathname={pathname} onClose={null} />
    </aside>
  )
}

// ── MOBILE NAV ────────────────────────────────────────────
export function DashboardMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const handleOpen = () => {
    setMounted(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true))
    })
    setOpen(true)
  }

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      setOpen(false)
      setMounted(false)
    }, 300)
  }

  return (
    <>
      {/* Mobile topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-[54px] z-50 bg-dark flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand rounded-md flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
              <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[14px] font-bold text-white">Learnova</span>
        </div>

        <button
          onClick={open ? handleClose : handleOpen}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#171717] text-[#888] hover:text-white transition-colors relative"
          aria-label="Toggle menu"
        >
          {/* Hamburger — slides up out */}
          <RiMenuLine
            className="text-[18px] absolute transition-all duration-300"
            style={{
              opacity: open ? 0 : 1,
              transform: open ? "translateY(-6px) rotate(45deg)" : "translateY(0) rotate(0deg)",
            }}
          />
          {/* X — slides down in */}
          <RiCloseLine
            className="text-[18px] absolute transition-all duration-300"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0) rotate(0deg)" : "translateY(6px) rotate(-45deg)",
            }}
          />
        </button>
      </div>

      {/* Drawer + backdrop */}
      {mounted && (
        <div className="lg:hidden fixed inset-0 z-50">

          {/* Backdrop — fades in */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: visible ? 1 : 0 }}
            onClick={handleClose}
          />

          {/* Drawer — slides in from left */}
          <div
            className="absolute left-0 top-0 h-full w-[270px] bg-dark flex flex-col shadow-2xl transition-transform duration-300 ease-out"
            style={{ transform: visible ? "translateX(0)" : "translateX(-100%)" }}
          >
            <SidebarContent pathname={pathname} onClose={handleClose} />
          </div>

        </div>
      )}
    </>
  )
}

// ── DEFAULT EXPORT (combined — used by layout) ────────────
export default function DashboardSidebarWrapper() {
  return (
    <>
      <DashboardSidebar />
      <DashboardMobileNav />
    </>
  )
}