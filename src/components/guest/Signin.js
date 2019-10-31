import React, { Component } from "react";
import { Link } from "react-router-dom";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }

  signIn() {
    // alert("Email : " + this.state.email + " Password : ", this.state.password);
    const { email, password } = this.state;
    if (email === "") {
      alert("이메일을 입력해주세요.");
      return;
    }
    if (password === "") {
      alert("비밀번호를 입력해주세요");
      return;
    }
    this.props.history.push("/home");
    // fetch("/user/signin", {
    //   email: this.state.email,
    //   password: this.state.password
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("/signin : data::", data);
    //     if (data === "Logged in.") {
    //         this.props.history.push("/home");
    //       } else {
    //         alert("errorCode : " + data);
    //       }
    //     }
    //   })
    //   .catch(error => console.log(error));
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePWChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    // const { from } = location.state || { from: { pathname: "/" } };
    // if (isSignedIn) return <Redirect to={from} />;

    return (
      <div>
        <form className="form-signin">
          <h2>Sign In</h2>
          <label for="inputEmail">Email</label>
          <input
            type="email"
            onChange={this.handleEmailChange}
            id="inputEmail"
            placeholder="Email address"
            required
          />
          <label type="inputPassword">Password</label>
          <input
            type="password"
            onChange={this.handlePWChange}
            id="inputPassword"
            placeholder="Password"
            required
          />
          <button type="button" onClick={this.signIn}>
            Sign in
          </button>
        </form>
        <div>
          <Link to="/signup">{"Signup"}</Link>
        </div>
      </div>
    );
  }
}

// const signOut = () => {
//   fetch("/user/signout")
//     .then(response => response.json())
//     .then(data => {
//       console.log("/signout : data::", data);
//       if (data === "Logged out.") {
//         // siginin으로 보내기
//         this.props.history.push("/signin");
//       } else {
//         alert("errorCode : " + data);
//       }
//     })
//     .catch(error => console.log(error));
// };
export default Signin;
