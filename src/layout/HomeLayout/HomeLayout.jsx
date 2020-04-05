import React from "react";
import Header from "../../component/Header/Header.jsx";
import TwoBtns from "../../component/TwoBtns/TwoBtns.jsx";
import "./HomeLayout.scss";

const HomeLayout = () => {
  return (
    <div>
      <Header title="faccio la mia parte" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus suscipit non quam sit amet fringilla. Mauris at tortor ut eros fringilla pellentesque nec ut lectus. Morbi ut tincidunt sem."/>
      <TwoBtns />
    </div>
  );
};

export default HomeLayout;
