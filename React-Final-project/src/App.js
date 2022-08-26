import React, { useState, useEffect } from "react";
import "./App.scss";
import UserItem from "./components/users/UserItem";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import Avatar from "./image/avatar.svg";
import Search from "./components/filters/Search";
import UserInfo from "./components/users/UserInfo";
import AddUser from "./components/users/AddUser";
import AddCost from "./components/costs/AddCost";
import useCostManager from "./services/useCostManager";
import useOpenModal from "./services/useOpenModel";

const initUsers = [
  {
    firstName: "diana",
    lastName: "krakovich",
    id: "0",
    birthday: "1/1/200",
    maritalSatus: "married",
  },
  {
    firstName: "amos",
    lastName: "alfasi",
    id: "1",
    birthday: "1/1/200",
    maritalSatus: "married",
  },
  {
    firstName: "Itay",
    lastName: "Amini",
    id: "2",
    birthday: "1/1/200",
    maritalSatus: "Open for ",
  },
  {
    firstName: "amos",
    lastName: "test",
    id: "3",
    birthday: "1/1/200",
    maritalSatus: "married",
  },
  {
    firstName: "shmuel",
    lastName: "zibi",
    id: "4",
    birthday: "1/1/200",
    maritalSatus: "married",
  },
];

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const { costs, addCost, removeCost } = useCostManager(selectedUser?.id ?? null, {
    sortFn: (a, b) => b.timestamp - a.timestamp,
  });
  const [users, setUsers] = useState(initUsers);
  const [filteredUsers, setFilteredUsers] = useState(initUsers);
  const [userInfoVisible, setShowUserInfo, setHideUserInfo] = useOpenModal(false);
  const [addUserVisible, setShowAddUser, setHideAddUser] = useOpenModal(false);
  const [addCostVisible, setShowAddCost, setHideAddCost] = useOpenModal(false);

  useEffect(() => {
    console.log("current costs: ", costs);
  }, [costs]);

  const showInfoHandler = (user) => {
    setSelectedUser(user);

    setShowUserInfo();
  };

  const showAddCostHandler = (user) => {
    setSelectedUser(user);
    setShowAddCost(true);
  };

  const deleteUser = (id) => {
    setFilteredUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.filter((user) => user.id !== id);
      return updatedUsers;
    });
  };

  const onSearchChange = (value) => {
    setFilteredUsers(
      users.filter((user) => {
        const temp = `${user.firstName}${user.lastName}`;
        const valTemp = value.slice(" ").toLowerCase();
        console.log(`temp:${temp}`);
        console.log(`valTemp:${valTemp}`);
        console.log(temp.toLowerCase().includes(valTemp));
        return temp.toLowerCase().includes(value.replace(/\s/g, "").toLowerCase());
      }),
    );
  };

  const onCloseAddUserPopup = (params) => {
    setHideAddUser();

    if (params.newUser) {
      setUsers((prevValue) => {
        return [...prevValue, params.newUser];
      });
      setFilteredUsers((prevValue) => {
        return [...prevValue, params.newUser];
      });
    }
  };

  const addCostSuccessHandler = (newCost, selectedUser) => {
    addCost(newCost);
    setHideAddCost();
  };

  return (
    <div className="content">
      <div className="header">
        <Search onSearchChange={onSearchChange}></Search>
        <Button variant="primary" onClick={setShowAddUser}>
          Add User
        </Button>
        {addUserVisible && <AddUser onClosePopup={onCloseAddUserPopup} show={true}></AddUser>}
      </div>

      <div className="users">
        {filteredUsers.map((user) => (
          <Card key={user.id}>
            <Card.Img variant="top" src={Avatar} />
            <Card.Body>
              <UserItem key={user.id} user={user} onShowInfo={showInfoHandler} />
              <Button variant="outline-primary" onClick={() => showAddCostHandler(user)}>
                Add Cost
              </Button>
              <Button variant="outline-primary" onClick={() => deleteUser(user.id)}>
                Delete User
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>

      <AddCost
        onClose={setHideAddCost}
        onSuccess={addCostSuccessHandler}
        show={addCostVisible}
        selectedUser={selectedUser}
      />

      <UserInfo
        show={userInfoVisible}
        onClose={setHideUserInfo}
        selectedUser={selectedUser}
        costs={costs}
      />
    </div>
  );
}

export default App;
