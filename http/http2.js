const http=require('http');
http.createServer((req,res)=>{
    const obj={
        firstName:'Addis',
        lastName:'Alem'
    };
  
    
    res.end(JSON.stringify(obj));

}).listen(4000);