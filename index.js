'use strict';
module.change_code = 1;
var _ = require('lodash');
var Alexa = require('alexa-app');
var app = new Alexa.app('getSeats');
var SeatsDataHelper = require('./seats_data_helper');

//app.launch is automatically triggered any time the skill is invoked
// the reprompt will trigger ~8 seconds after the first prompt if that wasn't answered
app.launch(function(req, res) {
  var prompt = 'Please ask to get the Number of Seats';
  res.say(prompt).reprompt(prompt).shouldEndSession(false);
});
app.intent('getSeats', {
  'slots': {},
  'utterances': ['{from Mendix}']
},
  function(req, res) {
    var seatHelper = new SeatsDataHelper();
    console.log('before calling request seats');
    seatHelper.requestSeatStatus().then(function(numSeats) {
      console.log('Number of seats: ' + numSeats);
      res.say(seatHelper.formatSeatStatus(numSeats)).send();
    }).catch(function(err) {
      console.log(err.statusCode);
      var prompt = 'Getting the number of seats didn\'t work';
      res.say(prompt).shouldEndSession(true).send();
    });
    return false;
  }
);
app.intent('getNextClass', {
  'slots': {},
  'utterances': ['{When is the next class?}']
},
  function(req, res) {
    var classHelper = new SeatsDataHelper();
    console.log('before asking for next class');
    classHelper.requestNextClass().then(function(className) {
      console.log('Next class: ' + className);
      res.say(classHelper.formatNextClass(className)).send();
      console.log('Should be after the response');
    }).catch(function(err) {
      console.log(err.statusCode);
      var prompt = 'Getting the class name didn\'t work';
      res.say(prompt).shouldEndSession(true).send();
    });
    return false;
  }
);
module.exports = app;
