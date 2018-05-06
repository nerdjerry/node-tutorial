module.exports = (x, y, callback) => {
	if(x <= 0 || y <= 0){
		setTimeout(() => {
			callback(new Error("Dimensions must be greater than zero"),
			null)
		}, 2000);
	}else {
		setTimeout(() => {
			callback(null,
			{
				area : () =>  x*y
			});
		}, 5000)
	}
}