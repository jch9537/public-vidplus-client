import React from "react";
import Navigation from "../shared/Navigation";
import VideoPlayer from "./VideoPlayer";
import Title from "./Title";
import NoteList from "./NoteList";

export default function Workspace() {
  return (
    <div>
      <Navigation />
      <Title />
      <VideoPlayer />
      <NoteList />
    </div>
  );
}
