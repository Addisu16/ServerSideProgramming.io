const {MongoClient}=require('mongodb');
const client=new MongoClient('mongodb://0.0.0.0:27017');



let _db;//private methods
async function createDb(callback){
    try{
    await client.connect();
    db= client.db('onlineShopping');
    callback();
}catch(err){
console.log(err);
}
}
exports.createDb=createDb;
