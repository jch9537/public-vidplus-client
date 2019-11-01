import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteSpace, editSpace } from "../../actions/creators";

class SpaceEntry extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      editMode: false,
      name: ""
    };
  }

  handleDelete(id) {
    const { deleteSpace } = this.props;
    deleteSpace(id);
  }
  handleToggle() {
    this.setState({
      editMode: !this.state.editMode
    });
  }
  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }
  handleEdit(id) {
    const { name } = this.state;
    const { editSpace } = this.props;
    editSpace(name, id);
    this.setState({
      editMode: false,
      name: ""
    });
  }

  render() {
    const { space } = this.props;
    const { editMode } = this.state;
    let spaceName = editMode ? (
      <form className="form-editSpaceName">
        <input
          type="text"
          onChange={this.handleNameChange}
          defaultValue={space.name}
        />
        <button type="button" onClick={() => this.handleEdit(space.id)}>
          change
        </button>
      </form>
    ) : (
      <Link to={`/spaces/${space.name}`}>{space.name}</Link>
    );

    return (
      <tr>
        <td>{spaceName}</td>
        <td>{space.id} Notes</td>
        <td>Modified {space.updateAt}</td>
        <td>
          <button type="button" onClick={() => this.handleToggle()}>
            Edit
          </button>
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
    deleteSpace: id => dispatch(deleteSpace(id)),
    editSpace: (name, id) => dispatch(editSpace(name, id))
  };
};
SpaceEntry = connect(
  null,
  mapDispatchToProps
)(SpaceEntry);
export default SpaceEntry;
