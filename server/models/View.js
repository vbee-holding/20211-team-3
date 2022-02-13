const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new Schema({
  news: { type: ObjectId, ref: 'News' },
  createdBy: { type: ObjectId, ref: 'User' },
  isDelete: {
      type: Boolean,
      default: false
  },
},
{ timestamps: true }
);

const ViewModel = mongoose.model('View', schema);

module.exports = ViewModel;
