//Write the necessary Node script to make this code work for all arrays: 
//[1,2,3,4,5,6,7,8].even(); // [2,4,6,8] [1,2,3,4,5,6,7,8].odd(); // [1,3,5,7] Test your code in Node.JS CLI
class Arrays{
    constructor(array){
        this.array=array;
    }
    even(){
        return this.array.filter((i)=>i%2===0);
    }
    odd(){
       return this.array.filter((i)=>i%2!==0);
    }
}
let array=[1,2,3,4,5];
const checkNumber=new Arrays(array);
console.log(checkNumber.odd());
console.log(checkNumber.even());
