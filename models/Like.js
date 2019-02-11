const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _tutorial: { type: Schema.Types.ObjectId, ref: 'Tutorial' }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
