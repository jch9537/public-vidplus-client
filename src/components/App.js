import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "../App.css";
import Workspace from "./workspace/Workspace";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/signup" exact></Route>
        <Route path="/signin" exact></Route>
        <Route path="/home" exact></Route>
        <Route path="/spaces/:spaceName" component={Workspace} />
        <Route>404: No Match</Route>
      </Switch>
    </Router>
  );
}

export default App;
