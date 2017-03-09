'use strict';

var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT  = 'https://trainingmanagement280.mxapps.io/rest/ws_retrieveopenseats/';
var ENDPOINT2 = 'https://trainingmanagement280.mxapps.io/rest/ws_retrievenextclass/';

function SeatsDataHelper() { }

SeatsDataHelper.prototype.requestSeatStatus = function() {
  console.log('inside the data helper, befure calling to getNumSeats');
  return this.getNumSeats().then(
    function(response) {
      console.log('success in getting seats');
      return response.body;
    }
  );
};

SeatsDataHelper.prototype.getNumSeats = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT,
    resolveWithFullResponse: true,
    json:true
  };
  return rp(options);
};

SeatsDataHelper.prototype.formatSeatStatus = function(numSeats) {
  return 'There are currently ' + numSeats + ' available seats in upcoming Mendix classes';
};

SeatsDataHelper.prototype.requestNextClass = function() {
  console.log('in requestNextClass');
  return this.getNextClass().then(
    function(response) {
      console.log('success in getting the next class');
      return response.body;
    }
  );
};

SeatsDataHelper.prototype.getNextClass = function() {
  var options = {
    method: 'GET',
    uri: ENDPOINT2,
    resolveWithFullResponse: true,
    json:true
  };
  return rp(options);
};

SeatsDataHelper.prototype.formatNextClass = function(nextClassName) {
  return 'The next class is titled ' + nextClassName;
};

module.exports = SeatsDataHelper;
