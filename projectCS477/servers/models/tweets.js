
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const tweetSchema = new Schema({
    content: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Tweet', tweetSchema);

