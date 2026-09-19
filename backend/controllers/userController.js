import fs from "fs/promises";

const dataPath = new URL("../data/data.json", import.meta.url);

export async function getUsers(req, res) {
  try {
    const data = await fs.readFile(dataPath, "utf-8");

    const users = JSON.parse(data);

    res.json(users.users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to read users"
    });
  }
}

export async function getUserById(req, res) {
  try {
    const data = await fs.readFile(dataPath, "utf-8");

    const users = JSON.parse(data);

    const user = users.users.find(
      (user) => user.id === Number(req.params.id)
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to read user"
    });
  }
}

export async function createUser(req, res) {
  try {
    const data = await fs.readFile(dataPath, "utf-8");

    const users = JSON.parse(data);

    const newUser = {
      id: users.users.length + 1,
      name: req.body.name
    };

    users.users.push(newUser);

    await fs.writeFile(
      dataPath,
      JSON.stringify(users, null, 2)
    );

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user"
    });
  }
}