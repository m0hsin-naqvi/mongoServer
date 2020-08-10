const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbName = 'conFusion';
const collectionName = 'dishes';

MongoClient.connect(url, (err, client)=>{
    assert.equal(err, null);
    
    console.log('Connected to server successfully');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    collection.insertOne({"name":"palao","description":"Lahori Pulao"},(err,result)=>{
        assert.equal(err, null);

        console.log('After Insert:\n');
        console.log(result.ops);

        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection(collectionName, (err, result)=>{
                assert.equal(err, null);
                client.close();
            })
        })
    })
})