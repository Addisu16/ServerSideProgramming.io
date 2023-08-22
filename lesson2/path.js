const fs=require('fs');

const path=require('path');
console.log('start');

const data1=fs.readFileSync(path.join("..",'resources','hello.txt'));
console.log(data1);