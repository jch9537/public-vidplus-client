import React, { Component } from "react";
import api from "../../api";

class SignOut extends Component {
  signOut() {
    api("user/signout")
      .then(data => {
        console.log("/signout : data::", data);
        console.log("/signin : data::", data);
        if (data.error) {
          const { status, message } = data.error;

          if (status === 406) {
            alert(message);
            this.props.history.push("/signin");
          } else if (status === 500) {
            alert(message + ". 고객센터로 문의 바랍니다.");
          }
        } else {
          this.props.history.push("/signin");
        }
      })
      .catch(error => console.log(error));
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
