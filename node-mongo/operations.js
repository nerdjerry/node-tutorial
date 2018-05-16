const assert = require('assert');

module.exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);
    };

module.exports.findDocument = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

module.exports.removeDocument = (db, document,collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

module.exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set : update});
}