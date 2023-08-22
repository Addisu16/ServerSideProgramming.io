const{MongoClient}=require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);




let db;
async function createDB(Callback){
    await client.connect();
    db=client.db('onlineShopping');
    Callback() 

}
function getDB(){

    if(db){
      return db;
    }else{
       throw new Error('Database not availiable');
    }
}
module.exports=createDB;
exports.getDB=getDB;