import React, { useState } from "react";
import { default as UUID } from "node-uuid";
import "./AddUser.scss";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

const AddUser = (props) => {
  const [show, setShow] = useState(props.show);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");
  const [maritalSatus, setMaritalSatus] = useState("married");
  const [birthDay, setBirthDay] = useState("1");
  const [birthMonth, setBirthMonth] = useState("1");
  const [birthYear, setBirthYear] = useState("1970");

  const generateNumbersArray = (start, end) => {
    const temp = [];
    for (let i = start; i <= end; i++) {
      temp.push(i);
    }
    return temp;
  };

  const days = generateNumbersArray(1, 31);
  const months = generateNumbersArray(1, 12);
  const years = generateNumbersArray(1970, 2022);

  const handleClose = (e) => {
    setShow(false);
    props.onClosePopup({ status: false });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setShow(false);
    props.onClosePopup({
      status: false,
      newUser: {
        key: UUID.v4(),
        firstName,
        lastName,
        id,
        maritalSatus,
        birthday: `${birthDay}/${birthMonth}/${birthYear}`,
        costs: [],
      },
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <div className="add-user">
        <div className="title">Add User</div>
        <Form onSubmit={submitHandler}>
          <Form.Group className="form-group">
            <Form.Label>First Name:</Form.Label>
            <Form.Control
              required
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control
              required
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>ID:</Form.Label>
            <Form.Control required type="text" value={id} onChange={(e) => setId(e.target.value)} />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Marital Satus:</Form.Label>
            <Form.Select required onChange={(e) => setMaritalSatus(e.target.value)}>
              <option value="married">Married</option>
              <option value="devorsed">Devorsed</option>
              <option value="single">Single</option>
            </Form.Select>
          </Form.Group>
          <div className="birthday-container">
            <div>Birthday:</div>
            <div className="birthday-fields">
              <Form.Group className="form-group">
                <Form.Label>Day:</Form.Label>
                <Form.Select required onChange={(e) => setBirthMonth(e.target.value)}>
                  {days.map((d) => (
                    <option value={d}>{d}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label>Month:</Form.Label>
                <Form.Select required onChange={(e) => setBirthYear(e.target.value)}>
                  {months.map((d) => (
                    <option value={d}>{d}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="form-group">
                <Form.Label>Year:</Form.Label>
                <Form.Select required onChange={(e) => setBirthDay(e.target.value)}>
                  {years.map((d) => (
                    <option value={d}>{d}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
          <Button className="submit" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default AddUser;
