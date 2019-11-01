import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "../styles/App.css";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Workspace from "./workspace/Workspace";
import Signin from "./guest/Signin";
import Signup from "./guest/Signup";
import Home from "./home/Home";
import Navigation from "./shared/Navigation";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route
          path="/(home|spaces)/"
          render={props => (
            <Layout style={{ minHeight: "100vh" }}>
              <Navigation path={props.location.pathname} />
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route path="/spaces/:spaceName" component={Workspace} />
              </Switch>
            </Layout>
          )}
        />
        <Route>404: No Match</Route>
      </Switch>
    </Router>
  );
}

export default App;
