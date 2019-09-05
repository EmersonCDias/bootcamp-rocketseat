const express = require("express");
const server = express();
const users = ["Diego", "Henrique", "Victor"];

server.listen(3000);
server.use(express.json());
server.use((req, res, next) => {
  return next();
});

// Check if user was informed
function checkIfUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required" });
  }

  return next();
}

// Check if user was informed
function checkIfIdExists(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return res.status(400).json({ error: "User id not found" });
  }

  req.user = user;

  return next();
}

// Get user
server.get("/user/:index", checkIfIdExists, (req, res) => {
  return res.json(req.user);
});

// Get all users
server.get("/users", (req, res) => {
  return res.send(users);
});

// Add user
server.post("/users", checkIfUserExists, (req, res) => {
  const { name } = req.body;

  users.push(name);

  return res.json(users);
});

// Update users list
server.put("/user/:index", checkIfIdExists, checkIfUserExists, (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  users[index] = name;

  return res.json(users);
});

// Delete user
server.delete("/user/:index", checkIfIdExists, (req, res) => {
  const { index } = req.params;

  users.splice(0, index);

  return res.send();
});
