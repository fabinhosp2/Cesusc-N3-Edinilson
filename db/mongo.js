let whiskyDb = null;
var mongoLib = require('mongodb');
var MongoClient = mongoLib.MongoClient;
var ObjectID = mongoLib.ObjectID;

const csv = require('csvtojson');
const caminho = 'testcsv.csv';
csv().fromFile(caminho).then((jsonObj) => {
  MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) {
      console.log(err);
    }
    else{
      var dbase = db.db("whiskys");
      dbase.collection("analytics").drop(function(){
  
      });
      dbase.createCollection('analytics', function(){
        dbase.collection("analytics").insertMany(jsonObj);
      });
  
      whiskyDb = dbase;
    }
  });
});

const getDB = () => whiskyDb;

module.exports = {
  getDB, ObjectID
    
}




