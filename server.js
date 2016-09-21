var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser'); 

// (database name and model object /entity model)
var db = mongojs('hymn-list',['hymns'] ); 

 app.use(express.static(__dirname + "/client")); 
 app.use(bodyParser.json()); 

app.get('/hymns', function(req, res){
    console.log("getting the GET request server.sj"); 

 db.hymns.find(function(err, docs){
     console.log(docs);
     res.json(docs);

 });
 

});

app.post('/hymns', function(req, res){
console.log(req.body);
    db.hymns.insert(req.body, function(err, result){
        res.json(result);
    }); 
});

app.delete('/hymns/:id', function(req, res){
    var id = req.params.id;
    console.log(id); 
    db.hymns.remove({_id: mongojs.ObjectId(id)}, function(err, result){
        res.json(result);
    });
}); 

app.get('/hymns/:id' , function(req, res){
 var id = req.params.id;
 console.log(id);
    db.hymns.findOne({_id: mongojs.ObjectId(id)}, function(err, result){
        res.json(result);
    }); 
}); 

app.put('/hymns/:id' , function(req, res){
 var id = req.params.id;
console.log(req.body.title);
    db.hymns.findAndModify({
        query: {_id: mongojs.ObjectId(id)},
        update: {$set: {title: req.body.title, verses: req.body.verses, chorus: req.body.chorus}},
        new: true}, function(err, result){
                res.json(result); 
         
    });
}); 

app.listen(3001);
console.log('I\'m listening on port 3001');

