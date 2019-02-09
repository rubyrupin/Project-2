const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String },
    password: { type: String },
    imgUrl: { type: String, default: '../public/images/profile-pic' },
    description: { type: String }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
