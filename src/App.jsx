import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import FormLayout from "./layout/FormLayout/FormLayout.jsx";
import HomeLayout from "./layout/HomeLayout/HomeLayout.jsx";
import "./style/global.scss";

function App() {
  return (
    <div className="App main-content">
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <title>Faccio la mia parte - fuck covid-19</title>
      </Helmet>
      <Router>
        <Route exact path="/" component={HomeLayout} />
        <Route path="/fai-la-tua-parte" component={FormLayout} />
      </Router>
    </div>
  );
}

export default App;
