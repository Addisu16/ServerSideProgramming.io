const fs=require('fs');

console.log('file reading starts here');
const data=fs.readFile('hello.txt',(err,data)=>{
    if(err)
        console.log(err);
        console.log(data.toString());
    
});
