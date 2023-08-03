function getFullName(firstname,lastname){
    return `${firstname} ${lastname}`;
}
exports={
    getFullName
};

module.exports.firstname='john';
module.exports=exports;
exports.printName=function(firstname,lastname){
    console.log(`${firstname} ${lastname}`)
};