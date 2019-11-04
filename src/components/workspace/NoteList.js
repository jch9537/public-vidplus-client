import React, { Component } from "react";
import { connect } from "react-redux";
import Note from "./Note";
import NoteInput from "./NoteInput";

class NoteList extends Component {
  constructor(props) {
    super(props);
    // 현재 워크스페이스에 해당되는 노트만 상태 관리
    const notes = props.notes.filter(
      notes => notes.space_id === this.props.currSpace.id
    );
    // Sort notes in chronological order
    notes.sort(
      (a, b) =>
        a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
    );
    this.state = { notes };
  }

  componentDidUpdate(prevProps) {
    // 현재 space가 바뀌었거나 notes에 추가/삭제 됐으면, 노트를 다시 필터링해서 state.notes를 업데이트
    if (
      prevProps.currSpace !== this.props.currSpace ||
      prevProps.notes !== this.props.notes
    ) {
      const notes = this.props.notes.filter(
        note => note.space_id === this.props.currSpace.id
      );
      // Sort notes in chronological order
      notes.sort(
        (a, b) =>
          a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
      );
      this.setState({ notes });
    }
  }

  render() {
    return (
      <div>
        {// If key!==note.id, the note going into each Note component will change on diff updates,
        // giving unmatching state.content / timestamp values to the Note component
        this.state.notes.map(note => (
          <Note note={note} currSpace={this.props.currSpace} key={note.id} />
        ))}
        <NoteInput currSpace={this.props.currSpace} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes
});

NoteList = connect(mapStateToProps)(NoteList);
export default NoteList;
