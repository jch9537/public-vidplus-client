import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Typography, Select, Col, PageHeader } from "antd";
import { Link } from "react-router-dom";
const { Option } = Select;
const Heading = Typography.Title;

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
    this.onSpaceChange = this.onSpaceChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.spaceName !== this.props.spaceName) {
      // Right after redirection to a new space
      this.setState({ shouldRedirect: false });
    }
  }

  onSpaceChange(spaceName) {
    // Redirect when a different space has been selected
    if (spaceName !== this.props.spaceName) {
      this.setState({
        shouldRedirect: true,
        path: spaceName
      });
    }
  }

  render() {
    if (this.state.shouldRedirect) {
      // Should redirect to the new given path
      return <Redirect to={`/spaces/${this.state.path}`} />;
    } else {
      const routes = [
        { path: "/home", breadcrumbName: "Home" },
        { breadcrumbName: "Workspaces" }
      ];
      const itemRender = route => (
        <Link to={route.path}>{route.breadcrumbName}</Link>
      );

      return (
        <PageHeader breadcrumb={{ itemRender, routes }}>
          <Col style={{ display: "inline-block", width: "170px" }}>
            <Heading level={2}>Workspace:</Heading>
          </Col>
          <Col className="workspace-select-div">
            <Select
              value={this.props.spaceName}
              onSelect={this.onSpaceChange}
              style={{ width: "100%" }}
            >
              {this.props.spaces.map(space => (
                <Option value={space.name} key={space.id}>
                  {space.name}
                </Option>
              ))}
            </Select>
          </Col>
        </PageHeader>
      );
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});

Title = connect(mapStateToProps)(Title);
export default Title;
