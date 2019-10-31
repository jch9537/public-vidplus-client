import React, { Component } from "react";
import { changeTimestamp, editNote, deleteNote } from "../../actions/creators";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
const { TextArea } = Input;

class Note extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  onChange(e) {
    this.props.editNote({ ...this.props.note, content: e.target.value });
  }

  deleteNote() {
    this.props.deleteNote(this.props.note.id);
  }

  render() {
    const { note, changeTimestamp } = this.props;
    return (
      <div className="note-div">
        <a href="#" onClick={() => changeTimestamp(note.timestamp)}>
          {note.timestamp}
        </a>
        <TextArea onChange={this.onChange} value={note.content} autoSize />
        <Button type="primary" shape="circle" onClick={this.deleteNote}>
          <Icon type="delete" style={{ marginLeft: "7.5px" }}></Icon>
        </Button>
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time)),
  deleteNote: id => dispatch(deleteNote(id)),
  editNote: note => dispatch(editNote(note))
});
Note = connect(
  null,
  matchDispatchToProps
)(Note);
export default Note;
