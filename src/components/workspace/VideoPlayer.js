import React, { Component } from "react";
import { changeTimestamp, changeCurrTime } from "../../actions/creators";
import { connect } from "react-redux";
import { ResponsiveEmbed } from "react-bootstrap";
import YTPlayer from "yt-player";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    this.state = { currSpace };
  }

  componentDidUpdate(prevProps, prevState) {
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    if (prevState.currSpace !== currSpace) {
      const videoId = currSpace.url.split("=")[1];
      this.setState({ currSpace }, () => this.state.player.load(videoId));
    } else if (this.props.timestamp !== null) {
      const time = this.props.timestamp
        .split(":")
        .reduce(
          (acc, val, i) =>
            i === 0 ? (acc += parseInt(val) * 60) : (acc += parseInt(val)),
          0
        );
      this.state.player.seek(time); // move to specified timestamp
      this.props.changeTimestamp(null);
    }
  }

  componentDidMount() {
    const videoId = this.state.currSpace.url.split("=")[1];
    this.setState(
      { player: new YTPlayer(".player", { width: "", height: "" }) },
      () => {
        this.state.player.load(videoId);
        this.state.player.on("timeupdate", seconds =>
          this.props.changeCurrTime(seconds)
        );
      }
    );
  }

  render() {
    return (
      <ResponsiveEmbed aspectRatio="16by9">
        <div className="player"></div>
      </ResponsiveEmbed>
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
