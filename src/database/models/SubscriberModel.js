const mongoose = require("mongoose");
const {isEmailValid} = require("../../utils/Utils")

const BrandRef = mongoose.Schema({
  ref: {
    type: String,
    required: true,
  },
  name: {
    type: Object,
    required: true
  }
});

const SubscriberSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [isEmailValid, 'Please fill a valid email address'],
  },
  name: {
    type: String,
    required: true,
  },
  brands_subscribed_refs: {
    type: [BrandRef],
    required: false,
  },
  is_disabled: {
    type: Boolean,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});



SubscriberSchema.index(
  {
    email: 1
  },
  { unique: true }
);

module.exports = mongoose.model('Subscribers', SubscriberSchema);