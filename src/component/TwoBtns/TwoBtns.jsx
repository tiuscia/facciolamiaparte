import React from "react";
import Btn from "../Btn/Btn.jsx";
import "./TwoBtns.scss";

const TwoBtns = () => {
  return (
    <div className="two-btns">
      <Btn text="lista completa" />
      <Btn text="+ la tua parte" to="/fai-la-tua-parte" />
    </div>
  );
};

export default TwoBtns;
