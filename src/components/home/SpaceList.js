import React from "react";
import SpaceEntry from "./SpaceEntry";

const SpaceList = ({ spaces }) => {
  const spaceList = spaces.map(space => (
    <SpaceEntry space={space} key={space.id} />
  ));

  return (
    <div>
      <table>
        {/* <caption>Work Spaces</caption> */}
        <colgroup>
          <col width="35%" />
          <col width="25%" />
          <col width="30%" />
          <col width="" />
        </colgroup>
        <tbody>{spaceList}</tbody>
      </table>
    </div>
  );
};

export default SpaceList;
