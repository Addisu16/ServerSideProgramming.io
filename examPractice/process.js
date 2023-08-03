
console.log('1')
process.nextTick(()=>console.log('process1'));
console.log('2');
process.nextTick(()=>console.log('process2'));