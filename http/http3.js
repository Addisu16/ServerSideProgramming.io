const http=require('http')

const fs=require('fs');
http.createServer((req,res)=>{
    const str=fs.readlinkSync('index.html','utf8');
    const str2=str.replace('{username')
res.write(str);
res.end();

//res.end(str2);
//res.write(str)

//we want to get the files from index.html

fs.createReadStream('index.html').pipe(res);

}).listen(3000,()=>console.log('server is on 3000'));