import React, { Component } from "react";
import { connect } from "react-redux";
import { addSpaces } from "../../actions/creators";
import Table from "./Table";

class Home extends Component {
  componentDidMout(spaces) {
    const { addSpaces } = this.props;
    addSpaces(spaces);
  }
  render() {
    const { spaces } = this.props;
    return (
      <div>
        <Table spaces={spaces} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    spaces: state.spaces
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addSpaces: spaces => dispatch(addSpaces(spaces))
  };
};
Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

export default Home;
