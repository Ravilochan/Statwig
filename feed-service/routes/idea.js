var express = require("express");
var router = express.Router();
var utils = require("./../util/utils");
var { connFeed,connUser } = require("./../db/mongoose");
var ideaSchema = require("./../models/idea");

var Idea = connFeed.model('Idea',ideaSchema);


//============================POST IDEA API===========================================

router.post('/postidea', function (req,res,next) {
	console.log("inside post idea ",req.body);
	var post_date = new Date().toISOString();
	console.log("POST DATE  ", post_date);
	const ideaDetails = new Idea({
		idea_owner : req.body.idea_owner,
    idea_owner_name : req.body.idea_owner_name,
    idea_genre :req.body.idea_genre,
    idea_headline :req.body.idea_headline,
    idea_description : req.body.idea_description,
    posted_date : post_date,
		idea_field : req.body.idea_field,
    idea_type :req.body.idea_type,
		votecount : 0,
		reportAbuseUser : [],
		reportAbuseCount : 0,
		price : req.body.price,
    status : true
  });
	ideaDetails.save().then(result=> {
			console.log("result: ", result);
			res.status(200).json({
			message : "Idea Posted Successfully",
		});
	})
	.catch(err => {
		console.log("IDEA POST ERROR", err);
		res.status(500).json({
					message : "Internal Server Error"
			});
	});
});



module.exports = router;
