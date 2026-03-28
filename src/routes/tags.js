const express = require("express");
const tagController = require("../controllers/tagController");
const { checkTagName, checkTagId } = require("../middlewares/checkTagMiddleware");
const router = express.Router();

router.get("/", tagController.getTags);
router.get("/:id", checkTagId, tagController.getTagById);
router.post("/", checkTagName, tagController.postTag);
router.delete("/:id", checkTagId, tagController.deleteTag);
router.get("/:id/tasks",checkTagId, tagController.getTasksByTag);

module.exports = router;

//redone