
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tweets:[{content:String,date:Date}]
});
module.exports= mongoose.model('User', userSchema);