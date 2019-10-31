import React from "react";

const Space = ({ space, onEdit, onDelete }) => {
  return (
    <tr>
      <td>
        <input type="text" value={space.name} onChange={onEdit} />
      </td>
      <td>{space.id} Notes</td>
      <td>Modified {space.updateAt}</td>
      <td>
        <button type="button" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

const SpaceList = ({ spaces, onEdit, onDelete, onSelect }) => {
  const spaceList = spaces.map(space => (
    <Space
      space={space}
      key={space.id}
      onEdit={() => onEdit(space.id)}
      onDelete={() => onDelete(space.id)}
      onClick={() => onSelect(space.id)}
    />
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
