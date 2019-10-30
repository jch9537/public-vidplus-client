import React, { Component } from "react";
import { changeTimestamp } from "../../actions/creators";
import { connect } from "react-redux";

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    this.state = { currSpace, time: 0 };
  }

  componentDidUpdate(prevProps, prevState) {
    const currSpace = this.props.spaces.filter(space => space.current)[0];
    if (prevState.currSpace !== currSpace) {
      this.setState({ currSpace, time: 0 });
    } else if (this.props.timestamp !== null) {
      const time = this.props.timestamp
        .split(":")
        .reduce(
          (acc, val, i) =>
            i === 0 ? (acc += parseInt(val) * 60) : (acc += parseInt(val)),
          0
        );
      this.setState({ time: null }, () => this.setState({ time }));
      this.props.changeTimestamp(null);
    }
  }

  render() {
    const videoId = this.state.currSpace.url.split("=")[1];

    return (
      <div>
        <iframe
          title="videoPlayer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${this.state.time}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  spaces: state.spaces,
  timestamp: state.timestamp
});
const mapDispatchToProps = dispatch => ({
  changeTimestamp: time => dispatch(changeTimestamp(time))
});

VideoPlayer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoPlayer);
export default VideoPlayer;
