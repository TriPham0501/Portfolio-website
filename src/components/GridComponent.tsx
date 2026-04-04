// Your React component
import React from "react";

const GridComponent = ({ items }) => {
  return (
    <div className="grid grid-cols-2 gap-5 h-full">
      {items.map((item, index) => (
        <div
          key={index}
          className={`border rounded-xl ${
            index === items.length - 1 ? "col-span-2" : ""
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
