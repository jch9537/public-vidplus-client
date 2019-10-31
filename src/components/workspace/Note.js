import React, { Component } from "react";
import { changeTimestamp, editNote } from "../../actions/creators";
import { connect } from "react-redux";
import { Input, Button, Icon } from "antd";
const { TextArea } = Input;

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
        <TextArea onChange={this.onChange} value={note.content} autoSize />
        <Button type="primary" shape="circle" className="delete-note">
          <Icon type="delete" style={{ marginLeft: "7.5px" }}></Icon>
        </Button>
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
