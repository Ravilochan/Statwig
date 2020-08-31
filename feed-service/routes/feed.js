var express = require("express");
var router = express.Router();
var { connFeed,connUser } = require("./../db/mongoose");
var ideaSchema = require("./../models/idea");
var Idea = connFeed.model('Idea',ideaSchema);
// var { Idea } = require("./../models/idea");
var utils = require('./../util/utils');
var mailOptions = {
  from: '',
  to: '',
  subject: '',
  text: ''
};
var ObjectID = require('mongodb').ObjectID;

//===============================GET ALL POSTS API===================================================

router.get("/getfeed", function(req, res, next) {
  Idea.find({"status": true,"reportAbuseCount":{$lt:6}},null,{limit:200})
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log("Error : ", err.response);
      res.status(500).json({
        message: "internal server error"
      });
    });
});

//===============================GET POPULAR POSTS API===================================================

router.get("/getPopularFeed", function(req, res, next) {
  Idea.find({"status": true , "idea_type" : "Sale","reportAbuseCount":{$lt:6}}).sort({votecount: -1}).limit(5)
  .then(response => {
    res.send(response);
  })
  .catch(err => {
    console.log("Error : ", err);
    res.status(500).json({
      message: "internal server error"
    });
  });
});

//===============================GET POST WITH GIVEN ID API===================================================

router.get("/getSelectedPost/", function(req, res, next) {
  console.log("search query : " + req.query.ID)
  Idea.find({_id : req.query.ID,"status": {$exists:true}})
  .then(response => {
    res.send(response);
  }).catch(err => {
    console.log("Error : ", err.response);
    res.status(500).json({
      message: "internal server error"
    });
  });
});

//===============================SEARCH POST API===================================================

router.get('/getfilteredfeed/', function(req, res, next) {
  console.log("inside get filtered feed");
  console.log("search query : " + req.query.ID)
  var idea_genre = (req.query.ID).trim();
  const regexname = new RegExp(idea_genre,'i');
  Idea.find({$or:[{"idea_genre":regexname},{"idea_headline":regexname}, {"idea_field" : regexname}],"status": {$exists:true},"reportAbuseCount":{$lt:6}})
  .then(response => {
    res.send(response);
  }).catch(err => {
    console.log("Error : ", err.response);
    res.status(500).json({
      message: "internal server error"
    });
  });
});

//===============================UPVOTE POST API===================================================

router.put('/postlikes', function (req,res,next) {
  	console.log("inside upvote idea ",req.body);
    mailOptions.from = req.body.likes;
    Idea.find({ _id: req.body._id })
    .then(response => {
      mailOptions.to = response[0].idea_owner;
      var headline = response[0].idea_headline;
      console.log("response[0] : " +response[0].votecount);
      var count = response[0].votecount;
      if(response[0].likes.includes(req.body.likes)) {
        res.writeHead(404,{
            'Content-Type' : 'application/json'
        });
        res.end(JSON.stringify("User already voted on this post"));
      }
      else if(response[0].dislikes.includes(req.body.likes)){
        Idea.updateMany({ _id: req.body._id } ,{ $set: { votecount: count + 1  }, $pull:{
            dislikes : req.body.likes
        }})
        .then(response => {
            res.writeHead(403,{
                'Content-Type' : 'application/json'
            });
            res.end(JSON.stringify("User already disliked this post, removing all votes"));
            mailOptions.subject = 'Recent downvote on your post : ' +headline;
            mailOptions.text = 'Your post : ' + headline+ ' got an downvote by user :' + req.body.likes + ' and this post was previously liked by the same user. So, all votes from same user has beed removed on this post. To review or report please visit your profile.!';
            utils.sendMail(mailOptions);
        })
      }
      else{
        Idea.updateMany({ _id: req.body._id } , { $set: { votecount: count + 1  },$push:{
            likes : req.body.likes
        }})
        .then(response => {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            res.end(JSON.stringify("Successfully voted the idea"));
            mailOptions.subject = 'Recent upvote on your post : ' +headline;
            mailOptions.text = 'Your post : ' + headline+ ' got an upvote. To review or report please visit your profile.!';
            utils.sendMail(mailOptions);
        })
      }
    })
    .catch(errors => {
      console.log("error while updating idea with vote ", errors);
      res.status(500).json({
        message: "error while updating idea with vote"
      });
    })
});
//===============================DOWNVOTE POST API===================================================

router.put('/postdislikes', function (req,res,next) {
  	console.log("inside downvote idea ",req.body);
    Idea.find({ _id: req.body._id })
    .then(response => {
      console.log("response for dislikes length: " +response[0].dislikes.length);
      mailOptions.to = response[0].idea_owner;
      var headline = response[0].idea_headline;
      var count = response[0].votecount;
      if(response[0].dislikes.includes(req.body.dislikes)) {
        res.writeHead(404,{
            'Content-Type' : 'application/json'
        });
        res.end(JSON.stringify("User already disliked on this post"));
      }
      else if(response[0].likes.includes(req.body.dislikes)){
        Idea.updateMany({ _id: req.body._id } , {$pull:{
            likes : req.body.dislikes
        }, $set: { votecount: count - 1  }} )
        .then(response => {
            res.writeHead(403,{
                'Content-Type' : 'application/json'
            });
            res.end(JSON.stringify("User already liked this post, removing all votes"));
            mailOptions.subject = 'Recent upvote on your post : ' +headline;
            mailOptions.text = 'Your post : ' + headline+ ' got an upvote by user :' + req.body.likes + ' and this post was previously disliked by the same user. So, all votes from same user has beed removed on this post. To review or report please visit your profile.!';
            utils.sendMail(mailOptions);
        })
      }
      else{
        Idea.updateOne({ _id: req.body._id } , {$push:{
            dislikes : req.body.dislikes
        },$set: { votecount: count - 1  }} )
        .then(response => {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            res.end(JSON.stringify("Successfully voted the idea"));
            mailOptions.subject = 'Recent downvote on your post : ' +headline;
            mailOptions.text = 'Your post : ' + headline+ ' got a downvote by the user : '+ req.body.likes + '.To review or report please visit your profile.!';
            utils.sendMail(mailOptions);
        })
      }
    })
    .catch(errors => {
      console.log("error while updating idea with vote ", errors);
      res.status(500).json({
        message: "error while updating idea with vote"
      });
    })
});
//===============================COMMENT POST API===================================================

router.put('/postcomment', function (req,res,next) {
  	console.log("inside comment idea ",req.body);
    Idea.updateOne({ _id: req.body._id },{ $push: { comment: req.body.comment }})
        .then(response => {
              Idea.find({_id : req.body._id})
              .then(result => {
                mailOptions.from = req.body.comment.user;
                mailOptions.to = result[0].idea_owner;
                mailOptions.subject = 'Recent comment on your post : ' +result[0].idea_headline;
                mailOptions.text = 'User : ' + req.body.comment.user+' commented on your post : '+ result[0].idea_headline+'.To review or report please visit your profile.!';
                utils.sendMail(mailOptions);
                res.status(200).json({
                		message : "Comment posted on idea",
                    data : result
                });
              })
          })
        .catch(err => {
          console.log("error while commenting on idea", err);
          res.sendStatus(500);
    })
});
//===============================GET POST BY USER API ===================================================


router.get('/idea/',function(req,res,next){

  console.log("Search query:" + req.query.ID)

  Idea.find({idea_owner:req.query.ID})
  .then(response =>{
    res.send(response)
  })
  .catch(err => {
   console.log("Error : ", err.response);
   res.status(500).json({
     message: "internal server error"
   });

  })
  
});

//===============================MAKE IDEA AS NEGOTIATED - status : false===================================================

router.put('/markNegotiated',function(req,res,next){
  console.log("Idea Negotiated")
  console.log(req.body._id)

  Idea.update({"_id":ObjectID(req.body._id)},
  {"$set":{"status":false}})
  .then(response =>{
          res.writeHead(200,{
              'Content-Type' : 'application/json'
          });
          res.end(JSON.stringify("Updated idea"))
  })
  .catch(err => {
    console.log(err)
      res.writeHead(403,{
          'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify("Could not find the Idea"));
  })
})

//===============================UPDATE REPORT ABUSE COUND ON POST API===================================================

router.put('/reportabuse', function (req,res,next) {
  	console.log("inside report abuse idea ",req.body);
    Idea.find({ _id: req.body._id })
    .then(response => {
      var count = response[0].reportAbuseCount;
      if(response[0].reportAbuseUser.includes(req.body.user)) {
        res.writeHead(404,{
            'Content-Type' : 'application/json'
        });
        res.end(JSON.stringify("User already reported abuse on this post"));
      }else{
        Idea.updateMany({ _id: req.body._id } ,{ $set: { reportAbuseCount: count + 1  }, $push:{
            reportAbuseUser : req.body.user
        }})
        .then(response => {
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            res.end(JSON.stringify("Successfully reported abuse the idea"));
        })
      }
    })
    .catch(errors => {
      console.log("error while reporting abuse idea", errors);
      res.status(500).json({
        message: "error while reporting abuse idea"
      });
    })
});
//===============================UPDATE POST STATUS API===================================================

router.put('/update', function (req,res,next) {
  	console.log("inside update idea ",req.body);
    Idea.updateMany({}, {$set: {'reportAbuseCount' : 0}})
        .then(response => {
              res.writeHead(200,{
                'Content-Type' : 'application/json'
              });
              res.end(JSON.stringify("Idea updated successfully"));
          })
        .catch(err => {
              console.log("error while report abusing on idea", err);
              res.sendStatus(500);
    })
});
//===================================GET ALL FEED=========================================================================

router.get("/getallfeed", function(req, res, next) {
  Idea.find({})
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log("Error : ", err.response);
      res.status(500).json({
        message: "internal server error"
      });
    });
});


//==========================================================================================================================

module.exports = router;
