import React, { useState } from "react";
import { default as UUID } from "node-uuid";
import { Form } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./AddCost.scss";
const generateNumbersArray = (start, end) => {
  const temp = [];
  for (let i = start; i <= end; i++) {
    temp.push(i);
  }
  return temp;
};

const MONTHS = generateNumbersArray(1, 12);
const YEARS = generateNumbersArray(1970, 2022);

const AddCost = ({ show, onClose, onSuccess, selectedUser }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const newCost = {
      costID: UUID.v4(),
      name,
      description,
      category,
      cost,
      month,
      year,
      timestamp: new Date(),
    };
    onSuccess(newCost, selectedUser);
    onClose();
  };

  return (
    <Modal show={show && !!selectedUser} onHide={onClose}>
      <div className="add-cost">
        <div className="title">{`Add cost to user ${selectedUser?.id}`}</div>
        <Form>
          <Form.Group className="form-group">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Category:</Form.Label>
            <Form.Control
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Cost:</Form.Label>
            <Form.Control type="text" value={cost} onChange={(e) => setCost(e.target.value)} />
          </Form.Group>
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
    </Modal>
  );
};

export default AddCost;
