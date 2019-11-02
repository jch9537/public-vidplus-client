import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../../actions/creators";
import { Input } from "antd";
const { TextArea } = Input;

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // currspace might not exist b/c it is selected asynchronously
      space_id: props.currSpace ? props.currSpace.id : "",
      content: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currSpace !== this.props.currSpace) {
      // Change the id of the NoteInput when currSpace changes
      this.setState({ space_id: this.props.currSpace.id });
    } else if (prevProps.notes.length !== this.props.notes.length) {
      // After async fetch has happened and notes from database have
      // been added to store, or after new note has been entered
      this.setState({ content: "" });
    }
  }

  onChange(e) {
    this.setState({ content: e.target.value });
  }

  onEnter(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      const currTime = this.props.currTime;
      // prepending zero to single digit seconds (match timestamp format)
      const timestamp = `${Math.floor(currTime / 60)}:${(
        "0" + Math.round(currTime % 60)
      ).slice(-2)}`;
      const content = this.state.content.trim(); // remove \n from final enter
      // addNote (id field not needed b/c response from db will automatically create it)
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
