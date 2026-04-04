import * as React from "react";
import { useState, useEffect } from "react";
import Dropdown from "../material-ui/DropdownList";

const PageBanner = () => {
  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const options = [
    ["Home", "#home"],
    ["Journey", "#about"],
    ["Achievements", "#games"],
    ["Projects", "#missions"],
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
      {/* <header className="bg-black py-3.5 px-20 fixed w-9/12 z-10 items-center flex"> */}
      <nav className="container mx-auto xl:w-9/12 md:w-10/12 w-full px-[5%] py-3 bg-banner rounded-xl">
        <div className="flex items-center justify-between">
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
          <ul className="flex space-x-3 ml-5">
            {options.map((option) => (
              <li className="lg:block hidden">
                <a
                  className="text-white hover:text-black hover:bg-webtheme rounded-3xl px-5 py-3  hover:ease-in-out hover:duration-200"
                  href={option[1]}
                >
                  {option[0]}
                </a>
              </li>
            ))}
            <li className="lg:hidden block">
              <Dropdown />
            </li>
          </ul>
        </div>
      </nav>
      {/* </header> */}
    </div>
  );
};

export default PageBanner;
