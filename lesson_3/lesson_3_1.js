const dns=require('dns');
const domainName='www.miu.edu';
dns.resolve4(domainName,(err,addresses)=>{
    if(err){
        console.log('Error',err);
        return;
    }
    console.log('IPv4 Addresses',addresses);
});