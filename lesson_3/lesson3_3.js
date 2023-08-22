const fs=require('fs');
const zlib=require('zlib');
const path=require('path');

const readable=fs.createReadStream('hello.txt');
const gzip=zlib.createGzip();//duplex
const writable=fs.createWriteStream(path.join('.','hello.txt.gz'));
readable.pipe(gzip).pipe(writable);

const readableToUnzip = fs.createReadStream(path.join('.', 'hello.txt.gz'));
const gunzip = zlib.createGunzip(); // duplex
const unzippedFile = fs.createWriteStream(path.join('.', 'hello_unzipped.txt'));
readableToUnzip.pipe(gunzip).pipe(unzippedFile);

unzippedFile.on('close', () => {
    console.log('File unzipped successfully!');
    // Perform further actions after unzipping is complete, if necessary
  });
  
  unzippedFile.on('error', (err) => {
    console.error('Error writing the unzipped file:', err);
  });
  
