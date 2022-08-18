const express = require("express");
const router = express.Router();
const subscriberController = require("../../controllers/subscribersController");

router
  .get("/", subscriberController.getAllSubscribers)
  .get("/:id", subscriberController.getSubscriberById)
  .get("/field/:field/:value", subscriberController.getSubscriberByFieldValue)
  .post("/", subscriberController.createNewSubscriber)
  .delete("/:id", subscriberController.deleteSubscriberById)
  .put("/:id", subscriberController.updateSubscriberById);

module.exports = router;