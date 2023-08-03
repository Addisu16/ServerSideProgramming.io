setTimeout(() => console.log("this is setTimeout 1"),0);
new Promise(() => {
    console.log("this is promise 0");
    process.nextTick(() =>{
    console.log("this is inner nextTick inside promise")
    });
    });
setImmediate(()=>{
    console.log('This is setImmediate 1')
})
setTimeout(() => console.log("this is setTimeout 3"));
new Promise(resolve => resolve('Hi')).then(() => console.log("this is Promise.resolve 1"));
new Promise(resolve => resolve('Hi')).then(() => console.log("this is Promise.resolve 2"));

process.nextTick(() => console.log("this is process.nextTick 1"));
process.nextTick(() => console.log("this is process.nextTick 2"));


