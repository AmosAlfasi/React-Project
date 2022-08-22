import React from "react";
import "./UserInfo.scss";
import { Modal } from "react-bootstrap";

const UserInfo = ({ show, onClose, selectedUser }) => {
  const details = Object.entries(selectedUser ?? {}).map(([key, value]) => (
    <div key={key}>
      {key} : {value}
    </div>
  ));

  return (
    <Modal show={show && !!selectedUser} onHide={onClose}>
      {details}
    </Modal>
  );
};

export default UserInfo;
