import React, { Component } from "react";
import { connect } from "react-redux";
import { addNote } from "../../actions/creators";

class NoteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.notes.length + 1,
      space_id: props.currSpace.id,
      content: ""
    };
    this.onType = this.onType.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currSpace !== this.props.currSpace) {
      this.setState({ space_id: this.props.currSpace.id });
    }
  }

  onType(e) {
    this.setState({ content: e.target.value });
  }

  onEnter(e) {
    if (e.key === "Enter") {
      const currTime = this.props.currTime;
      // prepending zero to single digit seconds
      const timestamp = `${Math.floor(currTime / 60)}:${(
        "0" + Math.round(currTime % 60)
      ).slice(-2)}`;
      this.props.addNote({ ...this.state, timestamp });
      this.setState({ id: this.state.id + 1 });
    }
  }

  render() {
    return (
      <input
        type="text"
        value={this.state.content}
        onChange={this.onType}
        onKeyUp={this.onEnter}
      ></input>
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
