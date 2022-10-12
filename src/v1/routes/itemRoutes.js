const express = require("express");
const router = express.Router();
const itemController = require("../../controllers/itemController");

router
  .get("/search", itemController.getItemByQueryParam)
  .get("/:id", itemController.getItemById)
  .get("/:id/description", itemController.getItemDescription);

module.exports = router;
