const fs=require('fs');

fs.createWriteStream('a.txt').pipe(fs.createWriteStream('b.txt'))