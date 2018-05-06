const express = require('express');
const http = require('http');
const morgan = require('morgan');

const hostname = "localhost";
const port = 3000;

//Create an express applicaiton
const app = express();

//Logging
app.use(morgan('dev'));

//Serves up static files from this folder as file name matches
app.use(express.static(__dirname+'/public'))

//this will be called to setup our server
app.use((req,res,next) => {
	console.log(req.headers);
	res.statusCode = 200;
	res.setHeader('Content-Type','text/html');
	res.end("<html><h1>Hello World Express</h1></html>");
});

const server = http.createServer(app);
server.listen(port,hostname, () => {
	console.log('Server is running');
})