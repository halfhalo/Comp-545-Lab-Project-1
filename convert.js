var lib={};
lib.convert=function(options,callback)
{
	var base=options.input.base+"" || 10+"";
	var num=options.input.num+"";
	//var num=parseInt(options.input.num,base).toString(base);
	
	var outbase=options.output.base+"" ||10+"";
	
	var neg="";
	//Strip out - for calculations.
		if(num.indexOf("-")!=-1)
		{
			neg="-";
			num=num.substr(1,num.length);
		}
		//Convert to base 10;
	lib.base(num,base,function(err,b){
		
		lib.toBase(b,10,outbase,function(err,n){
			if(neg)
			callback(err,neg+n)
			else
			callback(err,n)
		})
		
	})
}
lib.base=function(num,base,callback)
{
	
	var val=0,neg="",Hex="0123456789abcdefghijklmnopqrstuvwxyz";
	//Run it through JS's own convert and back, cheap and easy to format strings to JS's liking.   Number is exactly the same minus extraneous chars
//	num=parseInt(num,base).toString(base);
	//For each char in num, get the value and find its _real_ value from hex;
	for(var i=0;i<num.length;i++)
	{

			//Convert string to int on base 10 (Else JS might try to autoconvert to hex it the num starts with 0).
			//Essentially translates to: base^place * char value of i;
			val+=parseInt(Math.pow(base,num.length-i-1)*Hex.indexOf(num[i]),10);
		
	}
	callback(null,parseInt(neg+val,10));
}
//Wrapper function
lib.binary=function(num,base,callback)
{
		lib.toBase(num,base,null,function(err,n){
			callback(err,n)
		})
}
lib.toBase=function(num,base,out,callback)
{

	out=out||2
	var bin=0;	
	var Hex="0123456789abcdefghijklmnopqrstuvwxyz";
	if(num!=0)
	{
		
		var newnum=num%out;
		bin=newnum;
		//Recursively call itself for each place.
		lib.toBase((num-newnum)/out,base,out,function(err,n){
			//If err, exit and pass the error back up the callback chain
			if(err)
			{
				callback(err)
			}
			else
			{
				//If recursive call returned a number, append it to the front and return it.  err is null.
				if(n)
				{
					//console.log("Returning: "+n+""+Hex[bin])
					callback(err,n+""+Hex[bin])
					
				}
				//If no n, return our bin.  Generally only done as the last callback in the chain
				else
				{
					//console.log("Returning: "+Hex[bin])
					callback(err,Hex[bin])
				}
			}
		})
	}
	//If num is 0, we have nothing to do, so return nothing.
	else
	{
		callback(null,null);
	}
	
}
//Exports the lib object so other files can require it.
module.exports=lib;