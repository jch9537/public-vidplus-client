import React, { Component } from "react";
import { connect } from "react-redux";
import { editNote } from "../../actions/creators";

class EditableNote extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.note };
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  onType(e) {
    this.setState({ content: e.target.value });
  }

  onEnter(e) {
    if (e.key === "Enter") {
      this.props.editNote({ ...this.state });
    }
  }

  render() {
    return (
      <div>
        <input
          value={this.state.content}
          onChange={this.onType}
          onKeyUp={this.onEnter}
        ></input>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  editNote: note => dispatch(editNote(note))
});
EditableNote = connect(
  null,
  mapDispatchToProps
)(EditableNote);
export default EditableNote;
