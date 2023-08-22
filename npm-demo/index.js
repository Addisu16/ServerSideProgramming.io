
const dayjs=require('dayjs')

const time=dayjs().format('{YYYY}MM-DDTHH:mm:ss SSS [Z] A');
console.log(time);


module.exports=function sum(num1,num2){
    return num1+num2;
}