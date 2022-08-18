const subscriberService = require("../services/subscriberService");

const getAllSubscribers = async (req, res) => {
  const allSubs = await subscriberService.getAllSubscribers();
  res.json(allSubs);
};

const getSubscriberById = async (req, res) => {
  const { id } = req.params;
  const sub = await subscriberService.getSubscriberById(id);
  res.json(sub);
};

const getSubscriberByFieldValue = async (req, res) => {
  const { field, value } = req.params;
  const sub = await subscriberService.getSubscriberByFieldValue(field, value);
  res.json(sub);
};

const createNewSubscriber = async (req, res) => {
  if (Array.isArray(req.body)) {
    const resA = [];
    for (let x = 0; x < req.body.length; x++) {
      const dbresponse = await subscriberService.createNewSubscriber(
        req.body[x]
      );
      resA.push(dbresponse);
    }
    res.json(resA);
  } else {
    const dbresponse = await subscriberService.createNewSubscriber(req.body);
    res.json(dbresponse);
  }
};

const deleteSubscriberById = async (req, res) => {
  const { id } = req.params;
  const dbresponse = await subscriberService.deleteSubscriberById(id);
  res.json(dbresponse);
};

const updateSubscriberById = async (req, res) => {
  const { id } = req.params;
  const dbresponse = await subscriberService.updateSubscriberById(id, req.body);
  res.json(dbresponse);
};

module.exports = {
  getAllSubscribers,
  getSubscriberById,
  createNewSubscriber,
  deleteSubscriberById,
  updateSubscriberById,
  getSubscriberByFieldValue,
};
