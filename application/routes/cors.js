const express = require('express');
const cors = require('cors');

const whitelist = ["http://localhost:3000","https://locahost:3443"];
var corsOptionsDelegate = (req, callback) =>{
    var corsOptions;
    if(whitelist.indexOf(req.headers('Origin')) != -1){
        //This means domain requested from is a whitelisted domanin
        corsOptions = {origin : true};
    }else {
        corsOptions = {origin : false};
    }
    callback(null, corsOptions);
}
