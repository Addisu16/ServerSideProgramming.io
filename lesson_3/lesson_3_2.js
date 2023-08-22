const http=require('http');
const fs=require('fs');
const imageIs='high.jpg';

http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'image/jpeg'});
    const readStream=fs.createReadStream(imageIs);
    readStream.pipe(res);

}).listen(7000,()=>console.log('server is listening on port 7000'))