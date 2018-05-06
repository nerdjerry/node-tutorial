var module = require('./module');

function solveRect(x,y){
	module(x,y,(err,action) => {
		if(err){
			console.log(err.message);
		}else{
			console.log("Area is " + action.area())
		}

	})
}

solveRect(4,5);
solveRect(-2,3);
console.log("Testing")