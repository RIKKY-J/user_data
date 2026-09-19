import React, { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  function getUsers() {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getUsers();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Created user:", data);

        setName("");

        getUsers();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div>
      <h2>Users</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <button type="submit">
          Add User
        </button>
      </form>

      <hr />

      {users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name}
        </p>
      ))}
    </div>
  );
}

export default Users;