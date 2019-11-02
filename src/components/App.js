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
import { connect } from "react-redux";
import Workspace from "./workspace/Workspace";
import Signin from "./guest/Signin";
import Signup from "./guest/Signup";
import Home from "./home/Home";
import Navigation from "./shared/Navigation";

let App = function(props) {
  return (
    <Router>
      {props.errors.map(error => alert(error.message))}
      <Switch>
        {/*redirect on base URL or /spaces*/}
        <Route exact path="/(|spaces)">
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
};

const mapStateToProps = state => ({
  errors: state.errors
});
App = connect(mapStateToProps)(App);
export default App;
