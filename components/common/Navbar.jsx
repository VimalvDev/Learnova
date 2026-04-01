"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"

const showcaseItems = [
  { label: "Concept Mastery Scoring",    num: "01", href: "#mastery-scoring"       },
  { label: "Weakness Intelligence",      num: "02", href: "#weakness-intelligence"  },
  { label: "Ask Your Notes",             num: "03", href: "#ask-your-notes"         },
  { label: "Adaptive Quiz Engine",       num: "04", href: "#adaptive-quiz"          },
  { label: "Revision Scheduler",  num: "05", href: "#revision-scheduler"     },
  { label: "Performance Insights",       num: "06", href: "#performance-insights"   },
]

const navLinks = [
  { label: "Home",         href: "#home"         },
  { label: "Features",     href: "#features"     },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ",          href: "#faq"          },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [menuOpen, setMenuOpen]       = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef                   = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-dark/90 backdrop-blur-md  h-15"
            : "bg-transparent  h-18"
        }`}
      >
        <div className=" h-full flex items-center justify-between px-[2vw] lg:px-[3.5vw]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            {/* <div className="w-7 h-7 bg-brand flex items-center justify-center rounded-lg">
              <svg viewBox="0 0 10 10" fill="none" className="w-3.5 h-3.5">
                <path d="M2 8V4M5 8V2M8 8V5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div> */}
            <div className="w-8 h-8" >

            <img className=" object-cover h-full w-full "  src="/logo.png" alt="" />
            </div>
            <span className="font-bold text-[17px] text-white tracking-tight">
              Learnova
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-bleed">

            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative group hover:text-white transition-colors duration-200"
              >
                {label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand group-hover:w-full transition-all duration-200" />
              </a>
            ))}

            {/* Showcase dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`relative group flex items-center gap-1.5 hover:text-white transition-colors duration-200 ${
                  dropdownOpen ? "text-white" : ""
                }`}
              >
                Showcase
                <svg
                  viewBox="0 0 10 6"
                  fill="none"
                  className={`w-2.5 h-2.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand group-hover:w-full transition-all duration-200" />
              </button>

              {/* Dropdown panel */}
              <div
                className={`absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[280px] bg-[#111113] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 ${
                  dropdownOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
              >
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand">
                    6 Features
                  </p>
                  <p className="text-[12px] text-secondary-text mt-0.5">
                    Deep dive into each capability
                  </p>
                </div>

                {/* Items */}
                <div className="p-2">
                  {showcaseItems.map(({ label, num, href }) => (
                    <a
                      key={num}
                      href={href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/4 transition-all duration-150 group"
                    >
                      <span className="text-[10px] font-black text-brand w-5 shrink-0">
                        {num}
                      </span>
                      <span className="text-[13px] text-[#888] group-hover:text-white transition-colors duration-150">
                        {label}
                      </span>
                      <svg
                        viewBox="0 0 10 10"
                        fill="none"
                        className="w-2.5 h-2.5 ml-auto text-[#444] group-hover:text-brand transition-colors duration-150 opacity-0 group-hover:opacity-100"
                      >
                        <path d="M2 8L8 2M8 2H4M8 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            {/* <Link
              href="/login"
              className="text-[13px] font-semibold text-[#888] hover:text-white transition-colors px-3 py-2"
            >
              Log In
            </Link> */}
            <Link
              href="/signup"
              className="bg-brand text-white px-5 py-2.5 rounded-xl text-[13px] font-bold hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
            >
              Login now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.25 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>

        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />

        <div
          className={`absolute top-0 right-0 h-full w-70 bg-[#111113] border-l border-white/6 flex flex-col transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >

          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 h-15 border-b border-white/6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#444]">Menu</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 text-[#888] hover:text-white transition-colors text-[14px]"
            >
              ✕
            </button>
          </div>

          {/* Nav links */}
          <div className="flex flex-col px-4 py-4 gap-1 overflow-y-auto flex-1">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-bleed hover:text-white hover:bg-white/4 transition-all duration-150"
              >
                {label}
              </a>
            ))}

            {/* Showcase group in mobile */}
            <div className="mt-2">
              <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-brand">
                Showcase
              </p>
              {showcaseItems.map(({ label, num, href }) => (
                <a
                  key={num}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs text-bleed hover:text-white hover:bg-white/4 transition-all duration-150"
                >
                  <span className="text-[10px] font-black text-brand w-5">{num}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 px-6 pb-8 pt-6 border-t border-white/6">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="w-full h-11 flex items-center justify-center rounded-xl border border-white/8 text-xs font-semibold text-white hover:bg-white/4 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="w-full h-11 flex items-center justify-center rounded-xl bg-brand text-white text-[13px] font-bold hover:brightness-110 transition-all"
            >
              Login now
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}