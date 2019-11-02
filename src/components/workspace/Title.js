import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Row, Col, Dropdown } from "react-bootstrap";
const { Item, Menu, Toggle } = Dropdown;

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
      return (
        <Row className="workspace-title">
          <Col xs={2.5}>
            <h2 style={{ display: "inline-block", fontWeight: 400 }}>
              Workspace:
            </h2>
          </Col>
          <Col className="workspace-toggle-col">
            <Dropdown style={{ display: "inline" }}>
              <Toggle className="workspace-toggle">
                {this.props.spaceName}
              </Toggle>
              <Menu>
                {this.props.spaces.map((space, i) => (
                  <Item
                    eventKey={space.name}
                    key={i}
                    onSelect={this.onSpaceChange}
                  >
                    {space.name}
                  </Item>
                ))}
              </Menu>
            </Dropdown>
          </Col>
        </Row>
      );
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});

Title = connect(mapStateToProps)(Title);
export default Title;
