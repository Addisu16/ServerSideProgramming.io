const http=require('http')
http.createServer((req,res)=>{
    console.log(req.url,req.method,req.headers);
    res.end('Done');
}).listen((3000),()=>console.log('listening 3000'));