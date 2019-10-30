import React, { Component } from "react";
import { changeTimestamp } from "../../actions/creators";
import { connect } from "react-redux";

class Note extends Component {
  constructor(props) {
    super(props);
    this.changeTime = this.changeTime.bind(this);
  }

  changeTime(time) {
    this.props.changeTimestamp(time);
  }

  render() {
    return (
      <div>
        <button onClick={() => this.changeTime(this.props.note.timestamp)}>
          {this.props.note.timestamp}
        </button>
        {this.props.note.content}
      </div>
    );
  }
}

const matchDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time))
});
Note = connect(
  null,
  matchDispatchToProps
)(Note);
export default Note;
