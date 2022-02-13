const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require("moment");

const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
    news: { type: ObjectId, ref: 'News' },
    content: { type: String },
    createdBy: { type: ObjectId, ref: 'User' },
    isDelete: {
        type: Boolean,
        default: false
    },
  },
    { timestamps: true }

);

const CommentModel = mongoose.model('Comments', schema);

module.exports = CommentModel;