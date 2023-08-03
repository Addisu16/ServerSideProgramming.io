const fs=require('fs');
const path=require('path');
const database=fs.readFileSync(path.join('..','resources','static','database','database.txt'),'utf8')
console.log(database);
console.log(__dirname);