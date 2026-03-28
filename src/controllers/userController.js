const userService = require("../services/userService");

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers(req.query.sort, req.query.search);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error getting users" });
  }
}

const getUserStats = async (req, res) => {
  try {
    const stats = await userService.getUserStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error getting user stats" });
  }
};

const patchUser = async (req, res) => {
  try {
    const user = await userService.patchUserStatus(req.params.id, req.body.status);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error patching user" });
  }
};

const getUserbyId = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Error getting user by id" });
  }
};

const postUser = async (req, res) => {
  try {
    const user = await userService.postUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error posting user" });
  }
};

const putUser = async (req, res) => {
  try {
    const user = await userService.putUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "Error altering user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

module.exports = { getUsers, getUserStats, getUserbyId, postUser, putUser, patchUser, deleteUser };

//redone