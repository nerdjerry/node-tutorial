const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err,null);

    console.log("Connected succesfully to server");
    const db = client.db();
    const collection = 'dishes';
    dboper.insertDocument(db, {'name':'Rajma', 'description': 'Mother of dishes'}, collection, (result) => {
        dboper.findDocument(db,collection, (result) => {
            console.log(result);
            dboper.updateDocument(db, {'name':'Rajma'} , {'description': 'Best dish ever'}, collection, (result) => {
                console.log('result updated with', result.result);
                dboper.findDocument(db,collection, (result) => {
                    console.log(result);
                    dboper.removeDocument(db, {'name':'Rajma'}, collection, (result) => {
                        console.log('Successfully removed');
                        db.dropCollection(collection, (err, result) => {
                            assert.equal(err,null);
                            client.close();
                        })
                    })
                })
                
            })
        })
    })
});