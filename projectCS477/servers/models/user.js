
const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    _id: mongoose.Schema.Types.ObjectId,
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tweets:[{content:String,date:Date}]
});



// userSchema.method.saveWithPasswordCheck=function(){
//     if(this.password.length<8){
//         console.log(this.password)
//         throw new Error('password length must be greatter than 8');
//     }else{
//         return this.save();
//     }
// }



module.exports= mongoose.model('User', userSchema);