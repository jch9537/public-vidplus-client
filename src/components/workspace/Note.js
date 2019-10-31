import React, { Component } from "react";
import { changeTimestamp } from "../../actions/creators";
import { connect } from "react-redux";
import EditableNote from "./EditableNote";

class Note extends Component {
  constructor(props) {
    super(props);
    this.changeTime = this.changeTime.bind(this);
    this.state = { editable: false };
    this.editNote = this.editNote.bind(this);
  }

  changeTime(time) {
    this.props.changeTimestamp(time);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.note !== this.props.note) {
      this.setState({ editable: false });
    }
  }

  editNote() {
    this.setState({ editable: true });
  }

  render() {
    return this.state.editable ? (
      <EditableNote note={this.props.note} />
    ) : (
      <div>
        <button onClick={() => this.changeTime(this.props.note.timestamp)}>
          {this.props.note.timestamp}
        </button>
        <span onDoubleClick={this.editNote}>{this.props.note.content}</span>
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time))
});
Note = connect(
  null,
  matchDispatchToProps
)(Note);
export default Note;
