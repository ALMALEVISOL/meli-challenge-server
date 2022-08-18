const mongoose = require("mongoose");

const {SubscriberSchema} = require('mongoose').model('Subscribers').schema

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  full_name: {
    type: String,
    required: true,
  },
  subscribers: {
    type: [SubscriberSchema],
    required: false,
  }
});


BrandSchema.index(
  {
    name: 1
  },
  { unique: true }
);

module.exports = mongoose.model('Brands', BrandSchema);