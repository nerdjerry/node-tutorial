const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err,null);

    console.log("Connected succesfully to server");
    const db = client.db();
    const collection = db.collection('dishes');
    collection.insertOne({'name' : 'Dishe1', 'description' : 'Test dish'}, (err, result) => {
        assert.equal(err,null);
        console.log('Succesfully inserted a document in system ' + result.ops);
        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);
            console.log(docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err,null);
                client.close()
            })
        })
    });
});