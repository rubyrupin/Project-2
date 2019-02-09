const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
	user: { type: type.Schema.Types.ObjectId, ref:'user'},
	likedTutorial: { type: type.Schema.Types.ObjectId, ref: 'tutorial' },
}, {
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;