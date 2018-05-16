const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url)
.then((client) => {
    console.log("Connected succesfully to server");
    const db = client.db();
    const collection = 'dishes';
    dboper.insertDocument(db, {'name':'Rajma', 'description': 'Mother of dishes'}, collection)
    .then((result) => {
        return dboper.findDocument(db,collection)})
    .then((result) => {
        console.log(result);
        return dboper.updateDocument(db, {'name':'Rajma'} , {'description': 'Best dish ever'}, collection)})
    .then((result) => {
        console.log('result updated with', result.result);
        return dboper.findDocument(db,collection)})
    .then((result) => {
        console.log(result);
        return dboper.removeDocument(db, {'name':'Rajma'}, collection)})
    .then((result) => {
        console.log('Successfully removed');
        return db.dropCollection(collection)})
    .then((result) => {
        client.close();
    });
});