import React, { Component } from "react";
import { connect } from "react-redux";
import Note from "./Note";
import NoteInput from "./NoteInput";

class NoteList extends Component {
  constructor(props) {
    super(props);
    const currSpace = props.spaces.filter(space => space.current)[0];
    const notes = props.notes.filter(notes => notes.space_id === currSpace.id);
    this.state = { currSpace, notes };
  }

  componentDidUpdate(prevProps, prevState) {
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    if (
      prevState.currSpace !== currSpace ||
      prevProps.notes !== this.props.notes
    ) {
      const notes = this.props.notes.filter(
        notes => notes.space_id === currSpace.id
      );
      this.setState({ currSpace, notes });
    }
  }

  render() {
    return (
      <div>
        {this.state.notes.map((note, i) => (
          <Note note={note} key={i} />
        ))}
        <NoteInput currSpace={this.state.currSpace} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces,
  notes: state.notes
});

NoteList = connect(mapStateToProps)(NoteList);
export default NoteList;
