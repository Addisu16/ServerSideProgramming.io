const {MongoClient} = require('mongodb');

const client = new MongoClient('mongodb://127.0.0.1:27017', {
    maxPoolSize: 20
});

let db;

async function createDB(callback){
    try {
        await client.connect();
        db = client.db('lab6');
        callback();
    }catch(err){
        console.error(err);
    }
}

function getDb(){
    if(db) {
        return db;
    } else {
        throw new Error('No Database Found');
    }
}

exports.createDB = createDB;
exports.getDb = getDb;
exports.closeConnection = function(){
    console.log('close connection....');
    client.close();
}