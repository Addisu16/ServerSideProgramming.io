const http=require('http');
const fs=require('fs');

http.createServer((req,res)=>{

    if(req.url==='/'){
      fs.createReadStream('signup.html').pipe(res);
    }else if(req.url==='/signup' && req.method==='POST'){
        // res.end('POST TODO Here');
        req.on('data',chunk=>{
        console.log(chunk);
        });

        req.on('end',()=>{
            console.log('data');
          
        })
    }
}).listen(3000);