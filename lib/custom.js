/***********************************************************
 * Digital Progile API - custom
 ***********************************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var axios = require("axios");
var qs = require("qs");

/***********************************
 * Private constants.
 ************************************/
const HOSTNAME = "bqiziupb11.execute-api.us-east-1.amazonaws.com/staging";
const ROOT_PATH = "https://" + HOSTNAME + "/";

/***********************************
 * Private properties
 ************************************/

/***********************************
 * Private functions
 ************************************/

function _queryDigitalTwin(userAccessToken, query, done) {
  var config = {
    method: "post",
    url: ROOT_PATH + "graphql",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userAccessToken
    },
    data: query
  };

  axios(config)
    .then(function (response) {
      return done(response.data);
    })
    .catch(function (error) {
      console.log(error);
      return done(null);
    });
}

/***********************************
 * Module exports.
 ************************************/
module.exports = {
  ROOT_PATH: ROOT_PATH,
  queryDigitalTwin: function (userAccessToken, query, done) {
    _queryDigitalTwin(userAccessToken, query, done);
  }
};
