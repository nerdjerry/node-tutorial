const express = require('express');
const cors = require('cors');

const whitelist = ["http://localhost:3000","https://locahost:3443","http://localhost:4200"];
var corsOptionsDelegate = (req, callback) =>{
    var corsOptions;
    if(whitelist.indexOf(req.header('Origin')) !== -1){
        //This means domain requested from is a whitelisted domanin
        corsOptions = {origin : true, optionsSuccessStatus : 200};
    }else {
        corsOptions = {origin : false};
    }
    callback(null, corsOptions);
};

module.exports.cors = cors();
module.exports.corsWithOptions = cors(corsOptionsDelegate);