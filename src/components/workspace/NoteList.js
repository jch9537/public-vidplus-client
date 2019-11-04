import React, { Component } from "react";
import { connect } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars";
import Note from "./Note";

class NoteList extends Component {
  constructor(props) {
    super(props);
    // Sort notes in chronological order: 모든 note는 벌써 currSpace에 해당돼서 filter 안해줘도 됨
    const notes = this.props.notes.sort(
      (a, b) =>
        a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
    );
    this.state = { notes };
  }

  componentDidUpdate(prevProps) {
    // 현재 space가 바뀌었거나 notes에 추가/삭제 됐으면, 노트를 다시 필터링해서 state.notes를 업데이트
    // Note가 처음에 비동기적으로 불려옴으로 인해 this.props.notes값이 바뀔수도 있음.
    if (
      prevProps.currSpace !== this.props.currSpace ||
      prevProps.notes !== this.props.notes
    ) {
      // Sort notes in chronological order
      const notes = this.props.notes.sort(
        (a, b) =>
          a.timestamp.split(":").join("") - b.timestamp.split(":").join("")
      );
      this.setState({ notes });
    }
  }

  render() {
    return (
      <Scrollbars style={{ height: "calc(100vh - 200px)", minHeight: "160px" }}>
        {// If key!==note.id, the note going into each Note component will change on diff updates,
        // giving unmatching state.content / timestamp values to the Note component
        this.state.notes.map(note => (
          <Note note={note} currSpace={this.props.currSpace} key={note.id} />
        ))}
      </Scrollbars>
    );
  }
}

const mapStateToProps = state => ({
  notes: state.notes
});

NoteList = connect(mapStateToProps)(NoteList);
export default NoteList;
