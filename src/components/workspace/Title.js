import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Title extends Component {
  constructor(props) {
    super(props);
    this.state = { shouldRedirect: false };
    this.onSpaceChange = this.onSpaceChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.spaceName !== this.props.spaceName) {
      // Right after redirection
      this.setState({ shouldRedirect: false });
    }
  }

  onSpaceChange(e) {
    this.setState({
      shouldRedirect: true,
      path: e.target.value
    });
  }

  render() {
    if (this.state.shouldRedirect) {
      // Browser automatically takes care of URI encoding
      return <Redirect to={`/spaces/${this.state.path}`} />;
    } else {
      return (
        <div>
          Workspace:{" "}
          <select onChange={this.onSpaceChange}>
            {this.props.spaces.map(space => (
              <option
                value={space.name}
                key={space.id}
                selected={space.current}
              >
                {space.name}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces
});

Title = connect(mapStateToProps)(Title);
export default Title;
