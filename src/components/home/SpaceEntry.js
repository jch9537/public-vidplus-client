import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteSpace } from "../../actions/creators";

class SpaceEntry extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(id) {
    const { deleteSpace } = this.props;
    deleteSpace(id);
  }

  render() {
    const { space, onDelete } = this.props;
    return (
      <tr>
        <td>
          <Link to={`/spaces/${space.name}`}>{space.name}</Link>
        </td>
        <td>{space.id} Notes</td>
        <td>Modified {space.updateAt}</td>
        <td>
          <button type="button" onClick={() => this.handleDelete(space.id)}>
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSpace: id => dispatch(deleteSpace(id))
  };
};
SpaceEntry = connect(
  null,
  mapDispatchToProps
)(SpaceEntry);
export default SpaceEntry;
