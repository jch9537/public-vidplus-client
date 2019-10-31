import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../../actions/creators";
import { Input } from "antd";
const { TextArea } = Input;

function searchAvailableId(notes) {
  const idNums = notes.map(note => note.id);
  let i = 1;
  while (idNums.includes(i)) {
    i++;
  }
  return i;
}

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: searchAvailableId(props.notes),
      space_id: props.currSpace.id,
      content: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currSpace !== this.props.currSpace) {
      this.setState({ space_id: this.props.currSpace.id });
    } else if (prevProps.notes.length !== this.props.notes.length) {
      this.setState({ id: searchAvailableId(this.props.notes), content: "" });
    }
  }

  onChange(e) {
    this.setState({ content: e.target.value });
  }

  onEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      const currTime = this.props.currTime;
      // prepending zero to single digit seconds
      const timestamp = `${Math.floor(currTime / 60)}:${(
        "0" + Math.round(currTime % 60)
      ).slice(-2)}`;
      const content = this.state.content.trim(); // remove \n from enter
      this.props.addNote({ ...this.state, content, timestamp });
    }
  }

  render() {
    return (
      <TextArea
        value={this.state.content}
        onChange={this.onChange}
        onKeyUp={this.onEnter}
        placeholder="Add note..."
        style={{ marginTop: "10px", fontSize: "16px" }}
        autoSize
      />
    );
  }
}

const matchStateToProps = state => ({
  spaces: state.spaces,
  notes: state.notes,
  currTime: state.currTime
});

const matchDispatchToProps = dispatch => ({
  addNote: note => dispatch(addNote(note))
});
NoteInput = connect(
  matchStateToProps,
  matchDispatchToProps
)(NoteInput);
export default NoteInput;
