
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name}
        </p>
      ))}
    </div>
  );
}

export default Users;
