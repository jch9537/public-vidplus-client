import React, { Component } from "react";
import { changeTimestamp, changeCurrTime } from "../../actions/creators";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.onProgress = this.onProgress.bind(this);
    // this.player - Create a reference to the ReactPlayer component (for seekTo)
    this.player = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.timestamp !== null) {
      // Note 컴포넌트에서 timestamp가 눌려서 영상 위치가 바뀌어야 된다면
      const time = this.props.timestamp
        .split(":")
        .reduce(
          (acc, val, i) =>
            i === 0 ? (acc += parseInt(val) * 60) : (acc += parseInt(val)),
          0
        ); // specified timestamp (in seconds)
      this.player.current.seekTo(time); // move to specified timestamp
      this.props.changeTimestamp(null); // change timestamp back to null
    }
  }

  onProgress({ playedSeconds }) {
    this.props.changeCurrTime(playedSeconds);
  }

  render() {
    // Wrap in div with 16:9 aspect ratio
    return (
      <div style={{ position: "relative", paddingBottom: "56.25%" }}>
        <ReactPlayer
          ref={this.player}
          url={this.props.currSpace.url}
          onProgress={this.onProgress}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          controls
          playing
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timestamp: state.timestamp
});
const mapDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time)),
  changeCurrTime: time => dispatch(changeCurrTime(time))
});

VideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
export default VideoPlayer;
