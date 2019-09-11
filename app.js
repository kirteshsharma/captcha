var request = require('request');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.get('/',function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/check',function(req,res){
  console.log(req.body)
  if(!req.body) {
    return res.redirect("/");
  }
  var key = "<<SERVER KEY>>";
  var verification_url = "https://www.google.com/recaptcha/api/siteverify?secret=" + key + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
  request(verification_url,function(error,response,body) {
    body = JSON.parse(body);
    console.log(body)
    if(!body.success) {
      return res.json({"code" : 1,"dec" : "Unable to verify captcha"});
    }
    res.json({"code" : 0,"dec" : "Successfully verified"});
  });
});

app.use("*",function(req,res) {
  res.sendFile(__dirname + '/index.html');
})


app.listen(3000);
