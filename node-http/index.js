const http = require('http');
const path = require('path');
const fs = require('fs');

const hostname = 'localhost';
const port = 3000

const server = http.createServer((req,res) => {
	console.log("Request is for path" + req.url + "of type " + req.method);

	if(req.method == 'GET'){
		var filePath;
		if(req.url == '/') filePath = '/index.html';
		else filePath = req.url;
		filePath = path.resolve('./public' + filePath);
		if(path.extname(filePath) == '.html'){
			fs.exists(filePath, (exists) => {
				if(!exists){
					res.statusCode = 404;
					res.setHeader('Content-Type','text/html');
					res.end('Requested file is not found');
				}else{
					fs.createReadStream(filePath).pipe(res);
				}
			})
		}else{
			res.statusCode = 404;
			res.setHeader('Content-Type','text/html');
			res.end('Requested file extension is incorrect');
		}
	}else{
		res.statusCode = 404;
		res.setHeader('Content-Type','text/html');
		res.end('Requested method is incorrect');
	}
});

server.listen(port,hostname,() => {
	console.log(`Server is listentning at http://${hostname}:${port}`);
})