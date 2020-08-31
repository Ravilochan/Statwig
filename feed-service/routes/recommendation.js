var express = require("express");
var router = express.Router();
var { connFeed,connUser } = require("./../db/mongoose");
var ideaSchema = require("./../models/idea");
var userSchema = require("./../models/user");
var Idea = connFeed.model('Idea',ideaSchema);
var User = connUser.model('User',userSchema);
var utils = require('./../util/utils');
var uint8arrayToString = function(data){
    return String.fromCharCode.apply(null, data);
};
//===============================GET ALL RECOMMENDATIONS ON HOME PAGE===================================================db.getCollection('collectionName').find({ name : { $gte : {  $size : 1 } }})
router.get('/home/', function(req, res, next) {
  console.log("inside get recommendation");
  console.log("search query : " + req.query.ID)
  var user_id = req.query.ID;
  User.find({"_id" : user_id}).then(response => {
    var user_preference = [];
    for(var i = 0 ; i < response[0].li.length ; i++) {
      console.log("User details fetched : " +response[0].li[i].prefName);
      user_preference.push(response[0].li[i].prefName)
    }
    Idea.find({$or:[{"idea_genre": {$in: user_preference}},{"idea_field":{$in: user_preference}}], "status": true,"reportAbuseCount":{$exists:true , $lt : 6}})
    .then(result => {
      if(result.length == 0) {
        res.status(404).json({
          message: "No idea could be fetched for logged in user"
        });
      }
      else {
        res.status(200).json({
          data : result,
          message: "recommendations found"
        });
      }
    }).catch(err => {
      console.log("Error in idea API: ", err);
      res.status(500).json({
        message: "Internal Server Error"
      });
    });
  }).catch(err => {
    console.log("Error : ", err);
    res.status(500).json({
      message: "internal server error"
    });
  });
});

//===============================GET ALL RECOMMENDATIONS===================================================
router.get('/recommendation/', function(req, res, next) {
  console.log("inside get recommendation");
  console.log("search query : " + req.query.ID)
  Idea.find({"status": true, "idea_type" : "Sale"}, {_id : 1 , idea_description : 1})
  .then(result => {
    utils.saveToJsonFile(result);
    utils.saveToCsv();
    const subprocess = utils.runScript(req.query.ID);
    console.log("subprocess : ", subprocess);
    subprocess.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
  });
  subprocess.stderr.on('data', (data) => {
    // As said before, convert the Uint8Array to a readable string.
    console.log(uint8arrayToString(data));
  });

  subprocess.on('exit', (code) => {
      console.log("Process quit with code : " + code);
  });
  subprocess.on('exit', (code) => {
      console.log("Process quit with code : " + code);
    });
    subprocess.stdout.on('data', (data) => {
       console.log(`data received from python backend:${data}`);
       var ideaIdList = utils.splitIdeaId(data.toString());
       console.log("ideaIdList : " +ideaIdList);
       Idea.find({"_id": {$in: ideaIdList}})
       .then(result => {
         console.log("Response from get idea id API call: " , result);
         if(result.length == 0) {
           res.status(404).json({
             message: "No idea could be fetched from idea db from the recommended ideas"
           });
         }
         else {
           res.status(200).json({
             data : result,
             message: "recommendations found"
           });
         }
       }).catch(err => {
         console.log("Error in idea API: ", err);
         res.status(500).json({
           message: "Internal Server Error"
         });
       });
    });
  }).catch(err => {
    console.log("Error in idea API: ", err);
    res.status(500).json({
      message: "Internal Server Error"
    });
  });
});


module.exports = router;
