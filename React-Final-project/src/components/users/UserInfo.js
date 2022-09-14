import React, { useState, useEffect } from "react";
import "./UserInfo.scss";
import { Modal, Form, Table, Button } from "react-bootstrap";

const generateNumbersArray = (start, end) => {
  const temp = [];
  for (let i = start; i <= end; i++) {
    temp.push(i);
  }
  temp.push("none");
  return temp;
};

const UserInfo = ({ show, onClose, selectedUser, costs }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [filteredCosts, setFilteredCosts] = useState(costs);

  const MONTHS = generateNumbersArray(1, 12);
  const YEARS = generateNumbersArray(1970, 2022);

  useEffect(() => {
    setFilteredCosts(costs);
  }, [costs]);

  const submitHandler = (e) => {
    e.preventDefault();
    setFilteredCosts((prevValue) => {
      if (year !== "none" && month !== "none") {
        return costs.filter((cost) => cost.year === year && cost.month === month);
      } else if (year !== "none" && month === "none") {
        return costs.filter((cost) => cost.year === year);
      } else if (year === "none" && month !== "none") {
        return costs.filter((cost) => cost.month === month);
      } else return costs;
    });
  };

  const details = Object.entries(selectedUser ?? {}).map(([key, value]) => (
    <div key={key}>
      {key} : {value}
    </div>
  ));

  return (
    <Modal
      show={show && !!selectedUser}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="user-info">
        <div className="flex-row">
          <div className="info">{details}</div>
          <Form className="form">
            <Form.Group className="form-group">
              <Form.Label>Month:</Form.Label>
              <Form.Select onChange={(e) => setMonth(e.target.value)}>
                {MONTHS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="form-group">
              <Form.Label>Year:</Form.Label>
              <Form.Select onChange={(e) => setYear(e.target.value)}>
                {YEARS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button className="submit" type="submit" onClick={submitHandler}>
              Submit
            </Button>
          </Form>
        </div>
        <div className="title">Cost items</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="index"></th>
              <th className="name">Name</th>
              <th className="category">Category</th>
              <th className="description">Description</th>
              <th className="cost">Cost</th>
              <th className="date">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredCosts.map((cost, index) => {
              return (
                <tr>
                  <td className="index">{index + 1}</td>
                  <td className="name">{cost.name}</td>
                  <td className="category">{cost.category}</td>
                  <td className="description">{cost.description}</td>
                  <th className="cost">{cost.cost}</th>
                  <th className="date">
                    {cost.month}/{cost.year}
                  </th>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Modal>
  );
};

export default UserInfo;
