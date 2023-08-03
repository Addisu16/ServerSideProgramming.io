console.log('output 1');
setImmediate(()=>console.log('output 2'));
process.nextTick(()=>console.log('output 3'));
const callMe=()=>{
    return new Promise((resolve,reject)=>{
        console.log('output 4');
        setTimeout(()=>{
            console.log('Output 5')
        },0);
        resolve('output 6');
        console.log('output 7');
    })
};
console.log('output 8');
callMe().then(console.log);
process.nextTick(()=>console.log('output 9'));
console.log('output 10');