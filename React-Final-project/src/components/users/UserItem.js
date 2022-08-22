import React from "react";
import "./UserItem.scss";

const UserItem = ({ user, onShowInfo }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onShowInfo(user);
  };

  return (
    <div onClick={handleClick} className="user">
      <span>
        {" "}
        {user.firstName} {user.lastName}{" "}
      </span>
    </div>
  );
};

export default UserItem;
