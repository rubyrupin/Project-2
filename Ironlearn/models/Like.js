const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
	user: { [String]},
	tutorial: { [String]},
}, {
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;