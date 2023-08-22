// Fix the slow function to be asynchronous/non-blocking
function slow(callback){ 
	for(let i=0; i<= 5e8; i++){}//to make fast remove or wrap it in setT    imout of set Immmediate




	if (Math.random() > 0.5) { 	
		return callback("Error",null) 
	} 
	return callback(null, {id:12345}) 
} 

function exec(fn){ 
   return{
    done: function(callback){
    return this;
   },
   fail:function(callback){
    
    return this;
   }






	// Complete the code here to implement chaining with callback
}

exec(slow)
     .done(function(data){ console.log(data); })
	.fail(function(err){ console.log("Error: " + err); }); 