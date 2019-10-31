import React, { Component } from "react";
import { connect } from "react-redux";
import { addSpace } from "../../actions/creators";

class SpaceAdder extends Component {
  constructor(props) {
    super(props);
    this.vaildCheck = this.vaildCheck.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      url: "",
      name: ""
    };
  }

  vaildCheck() {
    let result = true;
    const { url, name } = this.state;
    const txtWarning = document.getElementById("txtWarning");
    txtWarning.style.display = "none";

    const nameReg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|*]+$/g;
    if (name === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "Workspace 이름을 입력해주세요";
      result = false;
    } else if (!nameReg.test(name)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "빈칸 없이 텍스트로 입력해주세요";
      result = false;
    }

    const urlReg = /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g;
    if (url === "") {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "url을 입력해주세요";
      result = false;
    } else if (!urlReg.test(url)) {
      txtWarning.style.display = "block";
      txtWarning.innerHTML = "url 형식에 맞게 입력해주세요";
      result = false;
    }
    console.log("validate::", result);
    return result;
  }

  handleUrlChange(e) {
    this.setState({ url: e.target.value });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { url, name } = this.state;
    let tempId = 2;
    const space = { id: tempId++, url, name };
    const { addSpace } = this.props;
    console.log("add : space, ", space, addSpace);
    if (this.vaildCheck()) {
      addSpace(space);
    }
  }

  render() {
    return (
      <div>
        <form className="form-spaceAdd" onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleUrlChange}
            placeholder="paste your url"
          />
          <input
            type="text"
            onChange={this.handleNameChange}
            placeholder="write space name"
          />
          <button type="submit">+</button>
        </form>
        <p id="txtWarning"></p>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addSpace: space => dispatch(addSpace(space))
  };
};
SpaceAdder = connect(
  null,
  mapDispatchToProps
)(SpaceAdder);
export default SpaceAdder;
