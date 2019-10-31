import React, { Component } from "react";
import { changeTimestamp, editNote } from "../../actions/creators";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";

class Note extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.editNote({ ...this.props.note, content: e.target.value });
  }

  render() {
    const { note, changeTimestamp } = this.props;
    return (
      <div className="note-div">
        <a href="#" onClick={() => changeTimestamp(note.timestamp)}>
          {note.timestamp}
        </a>
        <TextareaAutosize
          onChange={this.onChange}
          value={note.content}
        ></TextareaAutosize>
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time)),
  editNote: note => dispatch(editNote(note))
});
Note = connect(
  null,
  matchDispatchToProps
)(Note);
export default Note;
