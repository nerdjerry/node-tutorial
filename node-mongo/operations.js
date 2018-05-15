const assert = require('assert');

module.exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document, (err, result) => {
        assert.equal(err,null);
        console.log('Inserted ' + result.result.n +' documents');
        callback(result);
    });
};

module.exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray((err,docs) => {
        assert.equal(err, null);
        callback(docs);
    });
};

module.exports.removeDocument = (db, document,collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.equal(err,null);
        console.log("Deleted the document");
        callback(result);
    });
};

module.exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set : update}, (err, result) => {
        assert.equal(err,null);
        console.log("Updated a document");
        callback(result);
    })
}