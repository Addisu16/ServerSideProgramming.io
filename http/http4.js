const http=require('http')

const fs=require('fs');
http.createServer((req,res)=>{
   
//we want to get the files from insex.html

fs.createReadStream('index.html').pipe(res);

}).listen(6000,()=>console.log('server is on 6000'));