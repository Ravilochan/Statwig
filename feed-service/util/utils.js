var jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');
const csvjson = require('csvjson');
const readFile = require('fs').readFile;
const writeFile = require('fs').writeFile;
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'collaborato295@gmail.com',
    pass: 'Spring@2018'
  }
});

function checkLoggedInUser(req,res,next) {
    const tokenheader = req.body.servertoken || req.headers['servertoken'];

    if (tokenheader) {
        jwt.verify(tokenheader, server_secret_key, function(err, decoded){
            if (!err) {
                //req.body.uidfromtoken = decoded.uid;
            }
            next();
        });
    }else {
        next();
    }

}

function saveToJsonFile(data) {
  // console.log("I am here");
  fs.exists('ideadataset.json', function(exists) {
      if (exists) {
          // console.log("yes file exists");
          fs.readFile('ideadataset.json', function readFileCallback(err, data) {
              if (err) {
                  console.log(err);
              } else {
                  // fs.writeFile('myjsonfile.json', JSON.stringify(data));
              }
          });
      } else {
          // console.log("file not exists");
          fs.writeFile('ideadataset.json', JSON.stringify(data));
      }
  });
}

function saveToCsv() {
  readFile('./ideadataset.json', 'utf-8', (err, fileContent) => {
      if (err) {
          console.log(err); // Do something to handle the error or just throw it
          throw new Error(err);
      }
      const csvData = csvjson.toCSV(fileContent, {
          headers: 'key'
      });
      writeFile('./test-data.csv', csvData, (err) => {
          if(err) {
              console.log(err); // Do something to handle the error or just throw it
              throw new Error(err);
          }
          // console.log('Success!');
      });
  });
}

function runScript(id){
   return spawn('python3', [
      "-u",
      path.join(__dirname, './../recommendIdea.py'),
     id,
   ]);
}

function splitIdeaId(ideaArray){
  ideaArray = ideaArray.replace(/"/g, "");
  var splitidea = ideaArray.split('],');
  console.log("splitidea length : " + splitidea.length + " splitidea : " +splitidea);
  var ideaIdList = new Array();
  var ideaId;
  for(var i = 0 ; i < splitidea.length ; i++) {
    var commaSplit = splitidea[i].split(",");
    console.log("commaSplit[0] : " +commaSplit[0]);
    commaSplit[0] = commaSplit[0].trim();
    if(commaSplit[0].startsWith("[[")) {
      ideaId = commaSplit[0].replace("[[", "");
    }
    else if(commaSplit[0].startsWith("[")) {
      ideaId = commaSplit[0].replace("[", "");
    }
    console.log("idea id : " +ideaId);
    if(i != 0) {
      ideaIdList.push(ideaId);
    }
  }
  return ideaIdList;
}

function sendMail(mailOptions) {
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.checkLoggedInUser = checkLoggedInUser;
exports.saveToJsonFile = saveToJsonFile;
exports.saveToCsv = saveToCsv;
exports.runScript = runScript;
exports.splitIdeaId = splitIdeaId;
exports.sendMail = sendMail;
