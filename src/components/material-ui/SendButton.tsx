import * as React from "react";
import { useState, useEffect } from "react";

const SendButton = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [isFlyUp, setIsFlyUp] = useState(false);

    useEffect(() => {
      if (!isHovered) {
        setIsFlyUp(false);
        return;
      }

      const timerId = window.setInterval(() => {
        setIsFlyUp((prev) => !prev);
      }, 300);

      return () => {
        window.clearInterval(timerId);
      };
    }, [isHovered]);

    const buttonStyle: React.CSSProperties = {
      fontFamily: "inherit",
      fontSize: "15px",
      background: "royalblue",
      color: "white",
      padding: "0.6em 3em",
      paddingLeft: "2.3em",
      display: "flex",
      alignItems: "center",
      border: "none",
      borderRadius: "5px",
      overflow: "hidden",
      transition: "all 0.2s",
      cursor: "pointer",
      transform: isPressed ? "scale(0.95)" : "scale(1)",
    };

    const spanStyle: React.CSSProperties = {
      display: "block",
      marginLeft: "0.3em",
      transition: "all 0.3s ease-in-out",
      transform: isHovered ? "translateX(6em)" : "translateX(0)",
    };

    const svgStyle: React.CSSProperties = {
      display: "block",
      transformOrigin: "center center",
      transition: "transform 0.3s ease-in-out",
      transform: isHovered
        ? "translateX(1.5em) rotate(45deg) scale(1.1)"
        : "translateX(0) rotate(0deg) scale(1)",
    };

    const svgWrapperStyle: React.CSSProperties = {
      transition: "transform 0.3s ease-in-out",
      transform: isHovered
        ? `translateY(${isFlyUp ? "-0.1em" : "0.1em"})`
        : "translateY(0)",
    };

    return (
    <div id="send-button">
      <button
        type="button"
        style={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsPressed(false);
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper" style={svgWrapperStyle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="25"
              height="22"
              style={svgStyle}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span style={spanStyle}>Send</span>
      </button>
    </div>
    );
  };
  
  export default SendButton;