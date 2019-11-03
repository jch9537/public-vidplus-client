import React, { Component } from "react";
import api from "../../api";

class SignOut extends Component {
  signOut() {
    api("user/signout", "POST")
      .then(data => {
        console.log("/signout : data::", data);
        this.props.history.push("/signin");
      })
      .catch(error => {
        const { status, message } = error;

        if (status === 406) {
          alert(message);
          this.props.history.push("/signin");
        } else if (status === 500) {
          alert(message + ". 고객센터로 문의 바랍니다.");
        }
      });
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.signOut.bind(this)}
        style={{ float: "right" }}
      >
        Sign Out
      </button>
    );
  }
}

export default SignOut;
