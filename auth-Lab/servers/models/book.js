const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const bookSchema=new Schema({
    title:{
        type:String,
        required:true
    },

   isbn:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    },
    
    publishedDate:{
        type:String,
        required:true
    },

});


module.exports=mongoose.model('Book',bookSchema);