import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[70]">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
