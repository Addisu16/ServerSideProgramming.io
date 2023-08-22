//Blocking
/*
const add=(a,b)=>{
    for(let i=0;i<9e27;i++){}
    console.log(a+b);
}

console.log('start');
const  A=add(1,2);
const B=add(2,3);
const C=add(3,4);
console.log('end');
*/

//non-blocking

const add=(a,b)=>{
    setTimeout(() => {

        for(let i=0;i<9e27;i++){
        console.log(i)
        }
        console.log(a+b);
        
    }, 1000);

}
console.log('start');
const a=add(1,2);
const b=add(2,3);
const c=add(3,4);
console.log('end');