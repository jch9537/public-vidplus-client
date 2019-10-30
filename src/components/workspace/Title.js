import React from "react";
import { connect } from "react-redux";

let Title = function(props) {
  return (
    <div>
      Workspace:{" "}
      <select>
        {props.spaces.map(space => (
          <option>{space.name}</option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = state => ({
  spaces: state.spaces
});

Title = connect(mapStateToProps)(Title);
export default Title;
