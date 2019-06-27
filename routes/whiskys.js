var express = require('express');
var router = express.Router();
mongo = require('../db/mongo')

router.get('/', function(req,res) {
    mongo.getDB().collection("analytics").find().toArray().then(function(data){
      res.send({'data': data});
    }).catch(function(err){
      console.log(err);
    });
  });

router.delete('/:whiskyId', function(req,res){
  var whiskyId = req.params.whiskyId;
  mongo.getDB().collection("analytics").deleteOne({_id: new mongo.ObjectID(whiskyId)});
  res.end();
})

router.post('/', function(req,res){
  mongo.getDB().collection("analytics").insert(req.body);
  res.end();
})

module.exports = router;