import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SpaceAdder from "./SpaceAdder";
import SpaceList from "./SpaceList";
import Signout from "../guest/Signout";
import { Typography, Col, PageHeader } from "antd";

const Heading = Typography.Title;

class Table extends Component {
  render() {
    const { spaces } = this.props;
    const routes = [{ path: "/home", breadcrumbName: "Home" }];
    const itemRender = route => (
      <Link to={route.path}>{route.breadcrumbName}</Link>
    );
    return (
      <div>
        <Signout changeAuthState={this.props.changeAuthState} />
        <PageHeader breadcrumb={{ itemRender, routes }}>
          <Col>
            <Heading level={2}>Workspaces</Heading>
          </Col>
        </PageHeader>
        <SpaceAdder />
        <SpaceList spaces={spaces} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    spaces: state.spaces
  };
};

Table = connect(mapStateToProps)(Table);
export default Table;
