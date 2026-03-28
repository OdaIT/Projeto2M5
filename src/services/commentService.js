const pool = require("../db");

const postComment = async (taskId, body) => {
  const [result] = await pool.query(
    "INSERT INTO comments (taskId, userId, content) VALUES (?, ?, ?)",
    [parseInt(taskId), body.userId, body.content.trim()]
  );
  return { id: result.insertId, taskId: parseInt(taskId), userId: body.userId, content: body.content.trim() };
};

const getCommentsByTaskId = async (taskId, order) => {
  const direction = order === "desc" ? "DESC" : "ASC";
  const [rows] = await pool.query(
    `SELECT * FROM comments WHERE taskId = ? ORDER BY createdAt ${direction}`,
    [parseInt(taskId)]
  );
  return rows;
};

const putComment = async (commentId, body) => {
  const [rows] = await pool.query("SELECT * FROM comments WHERE id = ?", [commentId]);
  await pool.query("UPDATE comments SET content = ? WHERE id = ?", [body.content.trim(), commentId]);
  return { ...rows[0], content: body.content.trim() };
};

const deleteComment = async (commentId) => {
  await pool.query("DELETE FROM comments WHERE id = ?", [commentId]);
};


const deleteAllComments = async (taskId) => {
  await pool.query("DELETE FROM comments WHERE taskId = ?", [taskId]);
};

module.exports = { postComment, getCommentsByTaskId, putComment, deleteComment, deleteAllComments };

//redone