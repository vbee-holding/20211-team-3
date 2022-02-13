const mongoose = require("mongoose");
require("mongoose-double")(mongoose);
const moment = require("moment");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const { NEWS } = require("../constant");

const schema = new Schema({
  title: String,
  content: String,
  cateNews: { type: ObjectId, ref: "CateNews" },
  createdBy: { type: ObjectId, ref: "User" },
  articlePicture: { type: String },
  view: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: NEWS.STATUS.NEW
  },
  count: Number,
  isDelete: {
    type: Boolean,
    default: false
  },
  tag: { type: Array, default: null }
},
{ timestamps: true }
);

const NewsModel = mongoose.model("News", schema);

module.exports = NewsModel;
