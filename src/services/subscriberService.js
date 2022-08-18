const subscriberSchema = require("../database/models/SubscriberModel");
const SHA256 = require("crypto-js/sha256");

const getAllSubscribers = async () => {
  const values = await subscriberSchema.find();
  return values;
};

const getSubscriberById = async (id) => {
  return await subscriberSchema.findById(id);
};

const createNewSubscriber = async (sub) => {
  try {
    const user = subscriberSchema(sub);
    const hashDigest = SHA256(user["email"] + "private_key");
    user.is_disabled = false;
    user.hash = hashDigest;
    return await user.save();
  } catch (error) {
    return error;
  }
};

const createManySubscribers = async (many) => {
  return await subscriberSchema.insertMany(many);
};

const deleteSubscriberById = async (id) => {
  return await subscriberSchema.remove({ _id: id });
};

const updateSubscriberById = async (id, body) => {
  return await subscriberSchema.updateOne(
    { _id: id },
    { $set: { ...body } }
  );
};

const getSubscriberByFieldValue = async (field, value) => {
  return await subscriberSchema.find({ [field]: value });
};

module.exports = {
  getAllSubscribers,
  getSubscriberById,
  createNewSubscriber,
  createManySubscribers,
  deleteSubscriberById,
  updateSubscriberById,
  getSubscriberByFieldValue,
};
