import React from "react";
import { NavLink } from "react-router-dom";
import "./Btn.scss";

const Btn = ({ text, to, type }) => {
  return (
    <div>
      {to && (
        <NavLink className="btn" to={to}>
          {text}
        </NavLink>
      )}
      {!to && type && (
        <div className="btn" type={type}>
          {text}
        </div>
      )}
      {!to && !type && text && <div className="btn">{text}</div>}
    </div>
  );
};

export default Btn;
