"use client";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@/components/retroui/Avatar";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (href) => {
    const path = location.pathname;
    const hash = location.hash;
    
    if (href === "/#pilihan-target") {
      return path.startsWith("/predict") || path.startsWith("/knows") || (path === "/" && hash === "#pilihan-target");
    }
    if (href === "/#pilihan-karier") {
      return path.startsWith("/career") || (path === "/" && hash === "#pilihan-karier");
    }
    if (href === "/#alur") {
      return path === "/" && hash === "#alur";
    }
    if (href === "/#diskusi") {
      return path.startsWith("/discussion") || (path === "/" && hash === "#diskusi");
    }
    if (href === "/#faq") {
      return path === "/" && hash === "#faq";
    }
    return false;
  };
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hamburgerPressed, setHamburgerPressed] = useState(false);
  const [closePressed, setClosePressed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setHamburgerPressed(false);
  };

  const NAV_LINKS = [
    { label: "Analisis", href: "/#pilihan-target" },
    { label: "Pilihan Karier", href: "/#pilihan-karier" },
    { label: "Alur", href: "/#alur" },
    { label: "Forum Diskusi", href: "/#diskusi" },
    { label: "FAQ", href: "/#faq" },
  ];

  return (
    <>
      <style>{`
        @keyframes hoverEmpty {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.01) translateY(-1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes mobileNavHover {
          0% {
            background-color: #F8F5F1;
          }
          100% {
            background-color: #F0E9E0;
          }
        }
        
        .nav-link-hover:hover {
          animation: hoverEmpty 0.4s ease-in-out;
        }
        
        body.mobile-menu-open button:not(aside button):not(header button),
        body.mobile-menu-open a:not(aside a):not(header a),
        body.mobile-menu-open [role="button"]:not(aside *):not(header *) {
          pointer-events: none !important;
        }
        
        @media (max-width: 768px) 
      `}</style>
      <header
        className={`fixed left-1/2 top-0 z-50 flex h-16 -translate-x-1/2 items-center justify-between transition-all duration-300 ease-out ${
          scrolled
            ? "w-[92%] lg:w-[80%] max-w-7xl mt-3 lg:mt-4 px-4 lg:px-8 rounded border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] lg:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:shadow-none transition-all duration-200 backdrop-blur-none animate-float-nav"
            : "w-full max-w-none mt-0 px-4 lg:px-6 border-4 border-transparent bg-transparent shadow-none backdrop-blur-md"
        }`}
      >
        
        <div className="flex items-center gap-10">
          <Link
            to="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-primary-900"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
              <g
                transform="translate(11 11) scale(0.025) translate(-256 -256)"
                fill="currentColor"
              >
                <polygon points="354.38,53.422 354.38,168.726 226.378,168.726 226.378,284.03 98.38,284.03 98.38,399.334 0,399.334 0,458.578 157.62,458.578 157.62,343.274 285.622,343.274 285.622,227.97 413.625,227.97 413.625,112.666 512,112.666 512,53.422 " />
              </g>
            </svg>
            <div className="font-head text-primary-800 text-lg whitespace-nowrap shrink-0">MATCHSTEP AI</div>
          </Link>

          
          <nav className="font-sans hidden lg:flex gap-8 font-bold text-slate-800 items-center">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`inline-block transition-all duration-300 origin-top ${
                    active
                      ? "text-[#816D59] font-extrabold scale-105"
                      : "hover:scale-105 hover:translate-y-[1px] hover:text-primary-800"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        
        <div className="flex items-center gap-3">
          
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Avatar className="w-10 h-10 border-2 border-black shadow-[2px_2px_0_0_black]">
                  <Avatar.Image src={user.picture} alt={user.name} />
                  <Avatar.Fallback>
                    {user.name ? user.name.charAt(0).toUpperCase() : "AH"}
                  </Avatar.Fallback>
                </Avatar>
                <button
                  onClick={logout}
                  className="
                    bg-red-400
                    px-3
                    py-1.5
                    rounded
                    border-2
                    border-black
                    text-black
                    font-head
                    font-bold
                    uppercase
                    tracking-wider
                    text-xs
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                    active:translate-x-[4px]
                    active:translate-y-[4px]
                    active:shadow-none
                    transition-all
                  "
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/signon"
                className="
                  bg-[#FDE047]
                  px-3
                  py-1.5
                  rounded
                  border-2
                  border-black
                  text-black
                  font-head
                  uppercase
                  tracking-wider
                  text-xs
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-[4px]
                  active:translate-y-[4px]
                  active:shadow-none
                  transition-all
                "
              >
                Masuk
              </Link>
            )}
          </div>

          
          <button
            onClick={(e) => {
              e.stopPropagation();
              setHamburgerPressed(true);
              setTimeout(() => {
                setMobileOpen(true);
              }, 120);
            }}
            className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-100 cursor-pointer hover:bg-[#FDE047] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_black] ${
              hamburgerPressed
                ? "translate-x-[3px] translate-y-[3px] bg-[#FACC15] shadow-none"
                : "active:translate-x-[3px] active:translate-y-[3px] active:bg-[#FACC15] active:shadow-none"
            }`}
            aria-label="Open menu"
          >
            <span className="block w-5 h-[3px] bg-black mb-1" />
            <span className="block w-5 h-[3px] bg-black mb-1" />
            <span className="block w-5 h-[3px] bg-black" />
          </button>
        </div>
      </header>

      
      
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-all duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto backdrop-blur-sm"
            : "opacity-0 pointer-events-none backdrop-blur-none"
        }`}
        onClick={closeMobileMenu}
      />

      
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-white border-r-4 border-black flex flex-col transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen
            ? "translate-x-0 shadow-[8px_0px_0px_0px_rgba(0,0,0,1)]"
            : "-translate-x-full shadow-none"
        }`}
      >
        
        <div className="flex items-center justify-between px-6 py-5 border-b-4 border-black">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-primary-900"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
              <g
                transform="translate(11 11) scale(0.025) translate(-256 -256)"
                fill="currentColor"
              >
                <polygon points="354.38,53.422 354.38,168.726 226.378,168.726 226.378,284.03 98.38,284.03 98.38,399.334 0,399.334 0,458.578 157.62,458.578 157.62,343.274 285.622,343.274 285.622,227.97 413.625,227.97 413.625,112.666 512,112.666 512,53.422 " />
              </g>
            </svg>
            <div className="font-head text-primary-800 text-lg whitespace-nowrap shrink-0">MATCHSTEP AI</div>
          </Link>
          <button
            onClick={() => {
              setClosePressed(true);
              setTimeout(() => {
                closeMobileMenu();
                setClosePressed(false);
              }, 120);
            }}
            className={`w-10 h-10 flex items-center justify-center border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-red-400 cursor-pointer transition-all duration-100 font-head text-lg ${
              closePressed
                ? "translate-x-[3px] translate-y-[3px] bg-red-500 shadow-none"
                : "active:translate-x-[3px] active:translate-y-[3px] active:shadow-none active:bg-red-500"
            }`}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMobileMenu}
                className={`py-2.5 px-4 border-2 border-black font-head text-sm uppercase tracking-wide font-bold transition-all duration-200 ${
                  active
                    ? "bg-[#FDE047] text-black translate-x-[2.5px] translate-y-[2.5px] shadow-[0.5px_0.5px_0px_0px_rgba(0,0,0,1)] pointer-events-none"
                    : "bg-[#F8F5F1] text-text-primary shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-[#F0E9E0] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2.5px] active:translate-y-[2.5px] active:shadow-none"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        
        <div className="p-4 border-t-4 border-black flex flex-col gap-4">
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-2.5 border-2 border-black bg-[#FAF8F5] shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)]">
                <Avatar className="w-10 h-10 border-3 border-black shadow-[2px_2px_0_0_black]">
                  <Avatar.Image src={user.picture} alt={user.name} />
                  <Avatar.Fallback>
                    {user.name ? user.name.charAt(0).toUpperCase() : "AH"}
                  </Avatar.Fallback>
                </Avatar>
                <div className="flex flex-col text-left overflow-hidden">
                  <span className="font-head text-xs uppercase truncate text-black">
                    {user.name || "User"}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
              <button
                onClick={() => {
                  closeMobileMenu();
                  logout();
                }}
                className="
                  w-full
                  bg-red-400
                  py-3
                  rounded
                  border-2
                  border-black
                  text-black
                  font-head
                  font-bold
                  uppercase
                  tracking-wider
                  text-xs
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                  hover:translate-x-[2px]
                  hover:translate-y-[2px]
                  hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                  active:translate-x-[4px]
                  active:translate-y-[4px]
                  active:shadow-none
                  transition-all
                "
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/signon"
              onClick={closeMobileMenu}
              className="
                w-full
                block
                text-center
                bg-[#FDE047]
                py-3
                rounded
                border-2
                border-black
                text-black
                font-head
                uppercase
                tracking-wider
                text-xs
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:translate-x-[2px]
                hover:translate-y-[2px]
                hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                active:translate-x-[4px]
                active:translate-y-[4px]
                active:shadow-none
                transition-all
              "
            >
              Masuk
            </Link>
          )}
        </div>

        
        <div className="mt-auto p-6 border-t-4 border-black">
          <p className="text-xs font-bold text-center font-head uppercase tracking-widest text-text-muted">
            © 2026 MATCHSTEP AI
          </p>
        </div>
      </aside>
    </>
  );
}
