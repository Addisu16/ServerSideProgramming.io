const{MongoClient}=require('mongodb');

const url='mongodb://0.0.0.0:27017';
const client=new MongoClient(url);

const dbName='onlineShopping';
async function main(){
    await client.connect();
    console.log('database connected successfully')
    const db=client.db(dbName);
    const collection=db.collection('products');
  

    const result=await collection.find({}).toArray();
    // return result;
    console.log(result);
   
}

main()
.then(console.log)
.catch(console.error)
.finally(()=>client.close());