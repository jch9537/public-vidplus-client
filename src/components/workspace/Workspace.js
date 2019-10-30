import React from "react";
import Navigation from "../shared/Navigation";
import VideoPlayer from "./VideoPlayer";
import Title from "./Title";
import NoteList from "./NoteList";
import { connect } from "react-redux";
import { selectSpace } from "../../actions/creators";

let Workspace = function(props) {
  let name = props.match.params.spaceName;
  let currSpace = props.spaces.filter(space => space.name === name)[0];
  if (currSpace) {
    // If it is a valid url
    props.selectSpace(currSpace.id); // Change current workspace
    return (
      <div>
        <Navigation />
        <Title />
        <VideoPlayer />
        <NoteList />
      </div>
    );
  } else {
    return <div>404: Workspace Not Found</div>;
  }
};

const mapStateToProps = state => ({
  spaces: state.spaces
});

const mapDispatchToProps = dispatch => ({
  selectSpace: id => dispatch(selectSpace(id))
});

Workspace = connect(
  mapStateToProps,
  mapDispatchToProps
)(Workspace);
export default Workspace;
