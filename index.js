var convert=require('./convert');
var parser = require("nomnom");
var prettyjson=require("prettyjson")

parser.command('convert')
   .callback(function(opts) {
		console.log(opts)
   })
   .option('input', {
      position:1,
      help: "Input number",
			metavar:"STRING"
   })
   .option('input-base', {
      abbr: 'b',
      help: "Base of the input.  Defaults to 10",
			metavar:"STRING",
			default:10
   })
   .option('output', {
      abbr: 'o',
      help: "Base of the output.  Defaults to 2",
			metavar:"STRING",
			default:2
   })
   .help("Remove Application From Device")
	parser.nocommand().callback(function(){
		console.log(parser.getUsage())
	})
	//parser.script("prog1");
	
	var opts=parser.parse();
	console.log(opts)
	var params={"input":{"num":opts.input,"base":opts["input-base"]},"output":{"base":opts["output"]}}
	console.log(prettyjson.render(params))
	convert.convert(params,function(err,num){
		if(err)
			console.log(err)
		console.log(num)
		console.log("JS Internals: "+parseInt(params.input.num,params.input.base).toString(params.output.base))
	})