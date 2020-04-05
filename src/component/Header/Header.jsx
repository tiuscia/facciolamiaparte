import React from "react";
import "./Header.scss";

const Header = ({title, text}) => {
  return (
    <div>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </div>
  );
};

export default Header;
