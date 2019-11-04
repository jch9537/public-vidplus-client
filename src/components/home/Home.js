import React, { Component } from "react";
import { Layout } from "antd";
import "../../styles/Home.css";
import Table from "./Table";

const { Content } = Layout;

class Home extends Component {
  render() {
    return (
      <Layout style={{ padding: "24px 24px 24px 24px" }}>
        <Content style={{ background: "white", padding: "16px 24px" }}>
          <Table changeAuthState={this.props.changeAuthState} />
        </Content>
      </Layout>
    );
  }
}

export default Home;
