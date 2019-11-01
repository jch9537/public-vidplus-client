import React, { Component } from "react";
import { connect } from "react-redux";
// import { addSpaces } from "../../actions/creators";
import { Layout } from "antd";
import Navigation from "../shared/Navigation";
import Table from "./Table";

class Home extends Component {
  render() {
    const { spaces } = this.props;
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Navigation defaultKey="1" />
        <Layout>
          <Table spaces={spaces} />
        </Layout>
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
