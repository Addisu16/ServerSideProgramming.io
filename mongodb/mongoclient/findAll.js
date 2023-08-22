const {MongoClient}=require('mongodb');
//connection URL
const url='mongodb://127.0.0.1:27017'
const client=new MongoClient(url);

//database name




async function main(){
    await client.connect();
    console.log('connect to db successfully');
    const db = client.db('onlineShopping');
    const collection = db.collection('products');
    const result=await collection.find({}).toArray();//toArray-will give to you a promise you have to use  await
    return result;
}

// const res=main();
// console.log(res);//res is a promise
main().then((data)=>{console.log(data);})
      .finally(()=>client.close())