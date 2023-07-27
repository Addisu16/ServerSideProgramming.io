const http=require('http');
const server=http.createServer();
server.on('request',(request,response)=>{
    response.end('Done');
});

server.listen(3000,()=>console.log('listing 3000'));