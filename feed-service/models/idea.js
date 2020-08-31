var mongoose =require('mongoose');

var ideaSchema= mongoose.Schema({
    id : {
        type : Number
    },
    idea_owner : {
        type : String
    },
    idea_owner_name : {
        type : String
    },
    comment :{
        type : Array
    },
    likes : {
        type : Array
    },
    dislikes : {
        type : Array
    },
    idea_genre : {
        type : String,
        required : true
    },
    idea_headline : {
        type : String
    },
    idea_description : {
        type : String,
        required : true
    },
    posted_date : {
        type : Date
    },
    idea_type : {
        type : String,
        required : true
    },
    idea_field : {
        type : String,
        required : true
    },
    status : {
        type : Boolean,
        default : false
    },
    votecount : {
      type : Number,
      default : 0
    },
    reportAbuseUser : {
      type : Array,
      default : 0
    },
    reportAbuseCount : {
      type : Number,
      default : 0
    },
    price : {
      type : Number,
      default : 0
    }
})


module.exports = ideaSchema;
