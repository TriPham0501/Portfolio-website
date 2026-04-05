import { useState, useEffect } from "react";
import * as React from "react";

const Example = () => {
  return (
    <div className="flex text-base  justify-center px-3 py-15">
      <FlyoutLink href="#" FlyoutContent={NavContent}>
        Menu
      </FlyoutLink>
    </div>
  );
};

export const FlyoutLink = ({ children, href, FlyoutContent, anchorClassName = "" }: { children: React.ReactNode; href: string; FlyoutContent: React.FC; anchorClassName?: string }) => {
  const [open, setOpen] = useState(false);

  const showFlyout = open;

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-fit h-fit"
    >
      <a href={href} className={`relative text-white ${anchorClassName}`}>
        {children}
        <span
          style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-webtheme transition-transform duration-300 ease-out"
        />
      </a>
      {/* <AnimatePresence> */}
        <AnimatedFlyout isVisible={showFlyout} className="absolute left-1/2 top-12">
          <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
          <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
          <FlyoutContent />
        </AnimatedFlyout>
      {/* </AnimatePresence> */}
    </div>
  );
};

const AnimatedFlyout = ({ isVisible, className, children }: { isVisible: boolean; className?: string; children: React.ReactNode }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [animStyle, setAnimStyle] = useState<React.CSSProperties>(
    isVisible
      ? { opacity: 1, transform: "translateX(-50%) translateY(0px)" }
      : { opacity: 0, transform: "translateX(-50%) translateY(15px)" }
  );

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isVisible) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimStyle({ opacity: 1, transform: "translateX(-50%) translateY(0px)" });
        });
      });
    } else {
      setAnimStyle({ opacity: 0, transform: "translateX(-50%) translateY(15px)" });
      timer = setTimeout(() => setShouldRender(false), 300);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  if (!shouldRender) return null;

  return (
    <div
      className={className}
      style={{
        ...animStyle,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      {children}
    </div>
  );
};

const NavContent = () => {
  const options = [
    ["Home", "#home"],
    ["About", "#about"],
    ["Games", "#games"],
    ["Support", "#support"],
    ["Contact", "#contact"],
  ];

  return (
    <div className="w-26 bg-white shadow-xl">
      <div className="divide-y divide-gray-700">
        {/* <h3 className="font-semibold">For Companies</h3> */}
        {options.map((option) => (
          <a
            href={option[1]}
            className="text-center block bg-banner text-white py-3 px-10 text-base hover:text-black hover:bg-webtheme hover:ease-in-out hover:duration-300"
          >
            {option[0]}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Example;
