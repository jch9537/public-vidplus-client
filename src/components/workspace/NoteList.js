import React, { Component } from "react";
import { connect } from "react-redux";
import Note from "./Note";
import NoteInput from "./NoteInput";

class NoteList extends Component {
  constructor(props) {
    super(props);
    const currSpace = props.spaces.filter(space => space.current)[0];
    // 비동기 api호출 때문에 selectSpace할 떄 current 속성이 false이거나 존재하지 않을 수 있다
    const notes = currSpace
      ? props.notes.filter(notes => notes.space_id === currSpace.id)
      : [];
    // Sort notes in chronological order
    notes.sort(
      (a, b) =>
        a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
    );
    this.state = { currSpace, notes };
  }

  componentDidUpdate(prevProps, prevState) {
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    // 비동기로 notes를 가져올 당시에, componentDidUpdate가 실행된다 (currSpace가 select
    // 되기도 전에). 현재 스페이스에 따라 노트를 업데이트할려면, 우선 currSpace가 존재해야 된다.
    if (
      currSpace &&
      (prevState.currSpace !== currSpace ||
        prevProps.notes !== this.props.notes)
    ) {
      const notes = this.props.notes.filter(
        note => note.space_id === currSpace.id
      );
      // Sort notes in chronological order
      notes.sort(
        (a, b) =>
          a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
      );
      this.setState({ currSpace, notes });
    }
  }

  render() {
    return (
      <div>
        {// If key!==note.id, the note going into each Note component will change on diff updates,
        // giving unmatching state.content / timestamp values to the Note component
        this.state.notes.map(note => (
          <Note note={note} currSpace={this.state.currSpace} key={note.id} />
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
