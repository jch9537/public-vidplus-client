import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "../styles/App.css";
import "antd/dist/antd.css";
import Workspace from "./workspace/Workspace";
import Signin from "./guest/Signin";
import Signup from "./guest/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/home" exact></Route>
        <Route path="/spaces/:spaceName" component={Workspace} />
        <Route>404: No Match</Route>
      </Switch>
    </Router>
  );
}

export default App;
