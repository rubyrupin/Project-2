const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema(
  { 
    link: { type: String, required: true },
    title: { type: String, required: true},
    subTitle: { type: String},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    categories: { type: [String], enum: ['html-css', 'javascript', 'react', 'nodejs', 'express', 'mongodb'] },
    type: {type: String, enum: ['article', 'video']},
    NbOfLikes: {type: Number, default: 0},
    _userPost: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Tutorial = mongoose.model('Tutorial', tutorialSchema);
module.exports = Tutorial;
