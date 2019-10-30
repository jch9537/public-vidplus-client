import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
    this.onSpaceChange = this.onSpaceChange.bind(this);
  }

  componentDidUpdate() {
    // After the space has been changed by the select tag
    this.setState({ shouldRedirect: false });
  }

  onSpaceChange(e) {
    // Don't have to set current b/c Workspace will handle that after redirect
    this.setState({ shouldRedirect: true });
  }

  render() {
    if (this.state.shouldRedirect) {
      return <Redirect to={`/${this.state.currSpace.name}`} />;
    }
    return (
      <div>
        Workspace:{" "}
        <select onChange={this.onSpaceChange}>
          {this.props.spaces.map(space => (
            <option value={space.id} selected={space.current}>
              {space.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});

Title = connect(mapStateToProps)(Title);
export default Title;
