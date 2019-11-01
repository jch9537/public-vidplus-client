import React, { Component } from "react";
import { connect } from "react-redux";
// import { addSpaces } from "../../actions/creators";
import { Layout } from "antd";
import Table from "./Table";

class Home extends Component {
  render() {
    const { spaces } = this.props;
    return (
      <Layout>
        <Table spaces={spaces} />
      </Layout>
    );
  }
}
const mapStateToProps = state => {
  return {
    spaces: state.spaces
  };
};
// const mapDispatchToProps = dispatch => {
//   return {
//     addSpaces: spaces => dispatch(addSpaces(spaces))
//   };
// };
Home = connect(mapStateToProps)(Home);

export default Home;
