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
  //creating our demo namespace
  var demo = {};
  //different web browsers might have different implementations
  // window.indexedDB =
  //   window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  //checking whether the web browser supports the IndexedDB database
  //if it doesn't then showing a message saying so
  if (!window.indexedDB) {
    console.log("The web browser doesn't support IndexedDB");
  }
  //the data we want to store in our indexeddb database
  demo.data = initUsers; /*[
    { id: "1232523", brand: "Toyota", year: 2012, model: "Corola" },
    { id: "2343434", brand: "Mazda", year: 2008, model: "6" },
    { id: "2234345", brand: "Fiat", year: 2014, model: "500 Large" },
    { id: "2234333", brand: "Fiat", year: 2011, model: "Bravo" },
  ];*/

  demo.db = null;
  demo.request = window.indexedDB.open("projectdb", 1);
  console.log("indexedDB.open() was called");

  demo.request.onerror = function (event) {
    console.log("error: ");
  };
  console.log("onerror was assigned");

  demo.request.onsuccess = function (event) {
    demo.db = demo.request.result;
    console.log("success: " + demo.db);
  };
  console.log("onsuccess was assigned");

  demo.request.onupgradeneeded = function (event) {
    console.log("on upgrade");
    var database = event.target.result;
    var usersStore = database.createObjectStore("users", { keyPath: "id" });
    var costsStore = database.createObjectStore("costs", { keyPath: "id" });
    for (var i in demo.data) {
      usersStore.add(demo.data[i]);
    }
  };
  console.log("onupgradedneeded was assigned");

  function readItem() {
    var transaction = demo.db.transaction(["cars"]);
    var objectStore = transaction.objectStore("cars");
    var request = objectStore.get("12121212");
    request.onerror = function (event) {
      console.log("readItem(): cannot find the data item");
    };
    request.onsuccess = function (event) {
      if (request.result) {
        console.log(
          "readItem(): " +
            request.result.brand +
            ", " +
            request.result.id +
            ", " +
            request.result.model,
        );
      } else {
        console.log("readItem(): cannot find the item");
      }
    };
  }

  function readAllItems() {
    var objectStore = demo.db.transaction("cars").objectStore("cars");

    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        console.log(
          "readAllItems(): key=" +
            cursor.key +
            " brand=" +
            cursor.value.brand +
            " model=" +
            cursor.value.model +
            " id=" +
            cursor.value.id,
        );
        cursor.continue();
      } else {
        console.log("readAllItems(): no more entries!");
      }
    };
  }

  function addItemV2(user, error, success) {
    var request = demo.db.transaction(["users"], "readwrite").objectStore("users").add(user);

    request.onsuccess = success;

    request.onerror = error;
  }

  function addItem(user) {
    addItemV2(
      user,
      function (event) {
        console.log("addItem(): the new data item was added to your database.");
      },
      function (event) {
        console.log("addItem(): problem with adding the new data item to the database ");
      },
    );
  }

  function removeItem() {
    var request = demo.db.transaction(["cars"], "readwrite").objectStore("cars").delete("12121212");
    request.onsuccess = function (event) {
      console.log("removeItem(): the data item was removed from the database");
    };
    request.onerror = function (event) {
      console.log("removeItem(): problem with removing a data item from the database");
    };
  }
  const [selectedUser, setSelectedUser] = useState(null);

  const { costs, addCost, removeCost, refreshCosts } = useCostManager(selectedUser?.id ?? null, {
    sortFn: (a, b) => b.timestamp - a.timestamp,
  });
  const [users, setUsers] = useState(initUsers);
  const [filteredUsers, setFilteredUsers] = useState(initUsers);
  const [userInfoVisible, setShowUserInfo, setHideUserInfo] = useOpenModal(false);
  const [addUserVisible, setShowAddUser, setHideAddUser] = useOpenModal(false);
  const [addCostVisible, setShowAddCost, setHideAddCost] = useOpenModal(false);

  // useEffect(() => {
  //   console.log("current costs: ", costs);
  // }, [costs]);

  useEffect(() => {
    refreshCosts();
  }, [selectedUser]);

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

      addItem(params.newUser);
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
