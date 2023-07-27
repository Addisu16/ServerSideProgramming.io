const http=require('http');
http.createServer((req,res)=>{
    const obj={
        firstName:'Addis',
        lastName:'Alem'
    };
    res.statusCode(200);
    
    res.end(JSON.stringify(obj));

}).listen(4000);