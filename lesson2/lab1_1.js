//Write the necessary Node script to make this code work for all arrays: 
//[1,2,3,4,5,6,7,8].even(); // [2,4,6,8] [1,2,3,4,5,6,7,8].odd(); // [1,3,5,7] Test your code in Node.JS CLI


Array.prototype.even=function(){
    const evnResult=this.filter((i)=>i%2===0);
    console.log(evnResult);
};
Array.prototype.odd=function(){
    const oddResult=this.filter((i)=>i%2!==0);
    console.log(oddResult);
};

([1,2,3,4,5,6,7,8]).odd();
([1,2,3,4,5,6,7,8]).even();




