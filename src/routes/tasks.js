const express = require("express");
const taskController = require("../controllers/taskController");
const commentController = require("../controllers/commentController");
const { checkTaskTitle, checkTaskId, checkCommentContent, checkCommentId } = require("../middlewares/checkTaskMiddleware.js");
const { checkUserId } = require("../middlewares/checkUserMiddleware.js");
const router = express.Router();

//router das tasks
router.get("/", taskController.getTasks);
router.get("/stats", taskController.getTaskStats);
router.get("/:id", checkTaskId, taskController.getTasksById)
router.post("/", checkTaskTitle, taskController.postTask);
router.put("/:id",checkTaskId ,checkTaskTitle, taskController.putTask);
router.delete("/:id",checkTaskId, taskController.deleteTask);
router.patch("/:id/done",checkTaskId, taskController.patchTaskDone);

//router das tags
router.post("/:id/tags",checkTaskId, taskController.addTagToTask);
router.get("/:id/tags",checkTaskId, taskController.getTagsByTask);
router.put("/:id/tags/:taskTagId",checkTaskId, taskController.putTaskTag);
router.delete("/:id/tags/:tagId", checkTaskId, taskController.removeTagFromTask);

//router dos comments
router.get("/:id/comments", checkTaskId, commentController.getComments);
router.post("/:id/comments", checkTaskId, checkUserId, checkCommentContent, commentController.postComment);
router.put("/:id/comments/:commentId", checkTaskId, checkCommentId, checkCommentContent, commentController.putComment);
router.delete("/:id/comments/:commentId", checkTaskId, checkCommentId, commentController.deleteComment);
router.delete("/:id/comments", checkTaskId, commentController.deleteAllComments)

module.exports = router;


//redone