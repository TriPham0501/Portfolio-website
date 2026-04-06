import * as React from "react";
import { useState, useEffect } from "react";
import { FlyoutLink } from "../material-ui/DropdownList";

const homeSubOptions = [
  ['Intro', '#home'],
  ['About', '#about'],
  ['Lexicons', '#missions'],
  ['Journey', '#journey'],
  ['Project Activity', '#projects'],
];

const HomeDropdownContent: React.FC = () => (
  <div className="w-48 overflow-hidden rounded-lg shadow-xl">
    <div className="divide-y divide-white/10">
      {homeSubOptions.map((option) => (
        <a
          key={option[0]}
          href={option[1]}
          className="block bg-banner px-6 py-3 text-sm text-white text-center hover:bg-webtheme hover:text-black hover:ease-in-out hover:duration-300"
        >
          {option[0]}
        </a>
      ))}
    </div>
  </div>
);

const PageBanner = () => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileHomeOpen, setMobileHomeOpen] = useState(false);

  const options = [
    ["Home", "./"],
    ["Journey", "#about"],
    ["Achievements", "#games"],
    ["Projects", "/projects"],
    ["Relationships", "#contact"],
  ];

  const handleScroll = () => {
    setScrollTop(window.scrollY);
    setScrolling(window.scrollY > scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollTop]);

  const bannerVisibilityStyle: React.CSSProperties = {
    opacity: scrolling ? 0 : 1,
    pointerEvents: scrolling ? "none" : "auto",
  };

  const logoButtonStyle: React.CSSProperties = {
    margin: 0,
    height: "auto",
    background: "transparent",
    padding: 0,
    border: "none",
    cursor: "pointer",
    letterSpacing: "3px",
    textDecoration: "none",
    fontSize: "1.5em",
    fontFamily: "Arial",
    position: "relative",
    textTransform: "uppercase",
    color: "transparent",
    WebkitTextStroke: "1px rgba(255,255,255,0.6)",
  };

  const logoHoverTextStyle: React.CSSProperties = {
    position: "absolute",
    boxSizing: "border-box",
    color: "#37FF8B",
    width: isLogoHovered ? "100%" : "0%",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRight: "6px solid #37FF8B",
    overflow: "hidden",
    transition: "0.5s",
    WebkitTextStroke: "1px #37FF8B",
    filter: isLogoHovered ? "drop-shadow(0 0 23px #37FF8B)" : "none",
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-4 z-30 transition-all duration-300 ${
        scrolling ? "-translate-y-full" : "translate-y-0"
      }`}
      style={bannerVisibilityStyle}
    >
      <nav className="container mx-auto xl:w-9/12 md:w-10/12 w-full px-[5%] py-3 bg-banner rounded-xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            style={logoButtonStyle}
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <span>&nbsp;Obiradust&nbsp;</span>
            <span aria-hidden="true" style={logoHoverTextStyle}>
              &nbsp;Obiradust&nbsp;
            </span>
          </button>

          {/* Desktop nav — hidden below lg */}
          <ul className="hidden lg:flex flex-wrap items-center gap-1 ml-5">
            {options.map((option) =>
              option[0] === 'Home' ? (
                <li key={option[0]}>
                  <FlyoutLink
                    href={option[1]}
                    FlyoutContent={HomeDropdownContent}
                    anchorClassName="rounded-3xl px-5 py-3 hover:text-black hover:bg-webtheme hover:ease-in-out hover:duration-200"
                  >
                    {option[0]}
                  </FlyoutLink>
                </li>
              ) : (
                <li key={option[0]}>
                  <a
                    className="text-white hover:text-black hover:bg-webtheme rounded-3xl px-5 py-3 hover:ease-in-out hover:duration-200"
                    href={option[1]}
                  >
                    {option[0]}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Hamburger button — visible below lg */}
          <button
            type="button"
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 transition"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-transform duration-300 origin-center ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-opacity duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block h-0.5 w-5 bg-white rounded transition-transform duration-300 origin-center ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`}
            />
          </button>
        </div>

        {/* Mobile dropdown panel */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col divide-y divide-white/10 rounded-lg overflow-hidden">
            {options.map((option) =>
              option[0] === 'Home' ? (
                <div key={option[0]}>
                  <button
                    type="button"
                    onClick={() => setMobileHomeOpen((v) => !v)}
                    className="w-full flex items-center justify-between px-5 py-3 text-sm text-white hover:bg-webtheme hover:text-black transition-colors duration-200"
                  >
                    <span>{option[0]}</span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      width={14}
                      height={14}
                      className={`transition-transform duration-300 ${mobileHomeOpen ? 'rotate-180' : ''}`}
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileHomeOpen ? 'max-h-64' : 'max-h-0'}`}
                  >
                    {homeSubOptions.map((sub) => (
                      <a
                        key={sub[0]}
                        href={sub[1]}
                        className="block pl-10 pr-5 py-2.5 text-sm text-white/70 hover:bg-webtheme hover:text-black transition-colors duration-200"
                      >
                        {sub[0]}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={option[0]}
                  href={option[1]}
                  className="block px-5 py-3 text-sm text-white hover:bg-webtheme hover:text-black transition-colors duration-200"
                >
                  {option[0]}
                </a>
              )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default PageBanner;

