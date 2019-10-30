import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }

  signUp() {
    fetch("/user/signup", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
      .then(response => response.json())
      .then(data => {
        console.log("/user/signup response::", data);
        // 로그인으로 보내기
        this.props.history.push("/signin");
      })
      .catch(error => console.log(error));
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div>
        <form className="form-signin">
          <h2>Sign Up</h2>
          <label for="inputName">Name</label>
          <input
            type="name"
            onChange={this.handleNameChange}
            id="inputName"
            placeholder="Name"
            required
          />
          <label for="inputEmail">Email</label>
          <input
            type="email"
            onChange={this.handleEmailChange}
            id="inputEmail"
            placeholder="Email address"
            required
          />
          <label for="inputPassword">Password</label>
          <input
            type="password"
            onChange={this.handlePWChange}
            id="inputPassword"
            placeholder="password"
            required
          />
          <button type="button" onClick={this.signUp}>
            Sign up
          </button>
        </form>
        <div>
          <Link to="/signin">{"Signin"}</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
