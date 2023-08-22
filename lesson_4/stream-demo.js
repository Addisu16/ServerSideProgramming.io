const fs=require('fs');
const zlib=require('zlib');
const path=require('path');

const readable=fs.createReadStream('hello.txt');
const gzip=zlib.createGzip();//duplex
const writable=fs.createWriteStream(path.join('.','hello.txt'));
readable.pipe(gzip).pipe(writable);
