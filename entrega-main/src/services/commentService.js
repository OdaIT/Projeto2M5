const pool = require("../db");
const taskService = require("./taskService");
const userService = require("./userService");

const postComment = async (taskId, body) => {
  const parsedTaskId = parseInt(taskId);

  await taskService.getTaskById(parsedTaskId);
  await userService.getUserById(body.userId);

  if (!body.content || typeof body.content !== "string" || body.content.trim() === "") {
    throw new Error("Content is required");
  }

  const [result] = await pool.query(
    "INSERT INTO comments (taskId, userId, content) VALUES (?, ?, ?)",
    [parsedTaskId, body.userId, body.content.trim()]
  );

  return { id: result.insertId, taskId: parsedTaskId, userId: body.userId, content: body.content.trim() };
};

const getCommentsByTaskId = async (taskId, order) => {
  const parsedTaskId = parseInt(taskId);
  await taskService.getTaskById(parsedTaskId);

  const direction = order === "desc" ? "DESC" : "ASC";
  const [rows] = await pool.query(
    `SELECT * FROM comments WHERE taskId = ? ORDER BY createdAt ${direction}`,
    [parsedTaskId]
  );
  return rows;
};

const putComment = async (commentId, body) => {
  const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [commentId]);
  if (rows.length === 0) throw new Error("Comment not found");

  if (!body.content || typeof body.content !== "string" || body.content.trim() === "") {
    throw new Error("Content is required");
  }

  await pool.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [body.content.trim(), commentId]
  );
  return { ...rows[0], content: body.content.trim() };
};

const deleteComment = async (commentId) => {
  const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [commentId]);
  if (rows.length === 0) throw new Error("Comment not found");
  await pool.query("DELETE FROM comments WHERE id = ?", [commentId]);
};

const deleteAllComments = async (taskId) => {
  await taskService.getTaskById(parseInt(taskId));
  await pool.query("DELETE FROM comments WHERE taskId = ?", [taskId]);
};

module.exports = { postComment, getCommentsByTaskId, putComment, deleteComment, deleteAllComments };
