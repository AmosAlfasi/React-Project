import React from "react";
import "./UserInfo.scss";
import { Modal } from "react-bootstrap";
import { Table } from "react-bootstrap";

const UserInfo = ({ show, onClose, selectedUser, costs }) => {
  const details = Object.entries(selectedUser ?? {}).map(([key, value]) => (
    <div key={key}>
      {key} : {value}
    </div>
  ));

  return (
    <Modal show={show && !!selectedUser} onHide={onClose}>
      {details}
      {<h1>Cost items</h1>}

      {
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Cost</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {costs.map((cost, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{cost.name}</td>
                  <td>stam</td>
                  <td>{cost.description}</td>
                  <th>{cost.cost}</th>
                  <th>
                    {cost.month}/{cost.year}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      }
    </Modal>
  );
};

export default UserInfo;
