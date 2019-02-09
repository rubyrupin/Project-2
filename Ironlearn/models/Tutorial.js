const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorialSchema = new Schema(
	{
		link: { type: String, required: true},
		title: { type: String, required: true },
		description: { type: String, required: true },
		duration: { type: Number, required: true },
		categories: {
			[String], enum: ["javascript", "", "", "",],
			likes: Number,
			type: { enum: ['Article', 'video'] }
		}, {
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});

const Tutorial = mongoose.model('Tutorial', tutorialSchema);
module.exports = Tutorial;
