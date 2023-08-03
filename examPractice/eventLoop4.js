const fs=require('fs');

setTimeout(()=>{
    console.log('This is setTIMEOUT');

});

fs.readFile('data.txt',()=>{
console.log('reading File completed');
});