import React, { Component } from "react";
import { Layout } from "antd";
import Table from "./Table";

class Home extends Component {
  render() {
    return (
      <Layout>
        <Table />
      </Layout>
    );
  }
}

export default Home;
