import React, { Component } from "react";
import { connect } from "react-redux";
import { editSpace, deleteSpace, selectSpace } from "../../actions/creators";
import SpaceAdder from "./SpaceAdder";
import SpaceList from "./SpaceList";
// import SpaceEntry from "./SpaceEntry";

class Table extends Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleEdit(name, id) {
    const { editSpace } = this.props;
    editSpace(name, id);
  }
  handleDelete(id) {
    const { deleteSpace } = this.props;
    deleteSpace(id);
  }
  handleSelect(id) {
    const { selectSpace } = this.props;
    selectSpace(id);
  }

  render() {
    const { spaces } = this.props;

    return (
      <div>
        <h2>My Workspaces</h2>
        <SpaceAdder />
        <SpaceList
          spaces={spaces}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
          onSelect={this.handleSelect}
        />
        {/* <SpaceEntry /> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    spaces: state.spaces
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editSpace: (name, id) => dispatch(editSpace(name, id)),
    deleteSpace: id => dispatch(deleteSpace(id)),
    selectSpace: id => dispatch(selectSpace(id))
  };
};
Table = connect(
  mapStateToProps,
  mapDispatchToProps
)(Table);
export default Table;
