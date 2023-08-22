const{MongoClient}=require('mongodb');

const url='mongodb://0.0.0.0:27017';

const client=new MongoClient(url);
let dbName='onlineShopping';
async function findOne(){
    await client.connect();
    const db=client.db(dbName);
    const collection=db.collection('products');
    const result=collection.findOne({title:"Node.js"}).toArray();
    return result;
}


findOne()
.then(console.log)
.catch(console.error)
.finally(()=>client.close());