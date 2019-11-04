import React, { Component } from "react";
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
import { REMOVE_ERROR } from "../actions/types";
import api from "../api";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { initialRender: true, authenticated: false };
    this.changeAuthState = this.changeAuthState.bind(this);
  }

  changeAuthState(callback) {
    this.setState({ authenticated: !this.state.authenticated }, callback);
  }

  componentDidMount() {
    api("user", "GET")
      .then(() => {
        this.setState({ initialRender: false, authenticated: true });
      })
      .catch(() => {
        this.setState({ initialRender: false, authenticated: false });
      });
  }

  render() {
    let renderPage;
    if (this.state.initialRender) {
      renderPage = () => null;
    } else if (!this.state.authenticated) {
      renderPage = () => <Redirect to="/signin" />;
    } else {
      renderPage = props => (
        <Layout style={{ minHeight: "100vh" }}>
          <Navigation path={props.location.pathname} />
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/spaces/:spaceName" component={Workspace} />
          </Switch>
        </Layout>
      );
    }

    return (
      <Router>
        {this.props.errors.forEach((error, index) => {
          alert(error.message);
          this.props.removeError(index);
        })}
        <Switch>
          {/*redirect on base URL or /spaces*/}
          <Route exact path="/(|spaces)">
            <Redirect to="/home" />
          </Route>
          <Route
            path="/signup"
            render={props => (
              <Signup {...props} authenticated={this.state.authenticated} />
            )}
          />
          <Route
            path="/signin"
            render={props => (
              <Signin
                {...props}
                changeAuthState={this.changeAuthState}
                authenticated={this.state.authenticated}
              />
            )}
          />
          <Route path="/(home|spaces)/" render={renderPage} />
          <Route>404: No Match</Route>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});
const mapDispatchToProps = dispatch => ({
  removeError: index => dispatch({ type: REMOVE_ERROR, index })
});

App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
export default App;
