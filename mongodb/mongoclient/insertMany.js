const {MongoClient}=require('mongodb');

const client=new MongoClient('mongodb://0.0.0.0:27017');


async function main(){
    await client.connect();
    console.log('connect to db successfully');
    const db = client.db('onlineShopping');
    const collection = db.collection('products');
    const result=await collection.insertMany({title:'Angular',price:1999,description:'Excellent'},
    {title:"React.js",price:299,description:"Good"},{title:'cloud',price:1999,description:'Excellent'}
    );
    return result;
}

// const res=main();
// console.log(res);//res is a promise
main().then((data)=>{console.log(data);})
.catch(console.error)
      .finally(()=>client.close())
