const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  news: {
    type: ObjectId,
    ref: "News"
  },
  isDelete: {
    type: Boolean,
    default: false
  },
  view: {
    type: Number,
    default: 0
  }
},
{ timestamps: true }
);

const StatisticModel = mongoose.model("Statistic", schema);

module.exports = StatisticModel;
