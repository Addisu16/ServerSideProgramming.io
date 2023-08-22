const strUL='https://user:pass@sub.host.com:8080/p/a/t/h?course1=nodejs&course2=angular#hash';
const urlObj=new URL(strUL);
console.log(urlObj);
console.log(urlObj.searchParams);
console.log()
console.log(urlObj.searchParams.get('course1'));