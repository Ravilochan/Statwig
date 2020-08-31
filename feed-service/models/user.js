const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id : {
      type : String
  },
  emailId : {
    type : String
  },
username : {
    type : String
  },
  firstName : {
      type : String
  },
  lastName : {
      type : String
  },
  password : {
      type : String
  },
  dob : {
      type : String
  },
  li :{
      type : Array
  },
  bio : {
    type : String
  },
  enabled : {
    type : Boolean
  },
  aboutME : {
    type : String
  },
  profilePic : {
    type : String
  },
  title : {
    type : String
  },
  contact : {
    type : String
  },
  language : {
    type : String
  },
  country : {
    type : String
  },
  homeTown : {
    type : String
  },
  gender : {
    type : String
  },
  state : {
    type : String
  }
});

module.exports = userSchema;
