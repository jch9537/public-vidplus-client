import React, { Component } from "react";
import { changeTimestamp, changeCurrTime } from "../../actions/creators";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    this.state = { currSpace };
    this.onProgress = this.onProgress.bind(this);
    // Create a reference to the ReactPlayer component (for seekTo)
    this.player = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    if (prevState.currSpace !== currSpace) {
      this.setState({ currSpace });
    } else if (this.props.timestamp !== null) {
      const time = this.props.timestamp
        .split(":")
        .reduce(
          (acc, val, i) =>
            i === 0 ? (acc += parseInt(val) * 60) : (acc += parseInt(val)),
          0
        );
      this.player.current.seekTo(time); // move to specified timestamp
      this.props.changeTimestamp(null);
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
          url={this.state.currSpace.url}
          onProgress={this.onProgress}
          width="100%"
          height="100%"
          style={{ position: "absolute", top: 0, left: 0 }}
          playing
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces,
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
