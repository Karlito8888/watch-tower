import React from "react";
import arrowIcon from "../assets/arrow-icon.svg";

const ToTop = () => {
  return (
    <div className="top">
      <img
        src={arrowIcon}
        alt="arrow"
        onClick={() => window.scrollTo(0, 0)}
      />
    </div>
  );
};

export default ToTop;
