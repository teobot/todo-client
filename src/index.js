import React from "react";

import ReactDOM from "react-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./css/index.css";
import "semantic-ui-css/semantic.min.css";

import MainScreen from "./screens/MainScreen";
import TestingScreen from "./screens/TestingScreen";
import LoginScreen from "./screens/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";

import useSideBarContext, { SideBarContext } from "./context/TodoItemSlider";

const App = () => {
  const [SideBarSegment, SideBarValues] = useSideBarContext();

  return (
    <Router>
      <Switch>
        <Route path="/create">
          <CreateAccountScreen />
        </Route>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/">
          <SideBarContext.Provider value={SideBarValues}>
            <TestingScreen />
            {/* <MainScreen /> */}
          </SideBarContext.Provider>
          {SideBarSegment}
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
