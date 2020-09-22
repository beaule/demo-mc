/***********************************
 * index route
 ************************************/
/***********************************
 * Module dependencies.
 * @private
 ************************************/
var express = require("express");
var router = express.Router();
var Session = require("../lib/session.js");
var Authorization = require("../lib/api/authorization.js");
var Consents = require("../lib/api/consents.js");
var Cages = require("../lib/api/cages.js");
var Custom = require("../lib/custom.js");

/* get home */
router.get("/", function (req, res, next) {
  renderHome(req, res);
});

/* Authorize callback and Import data*/
router.get("/callback", function (req, res, next) {
  Session.setUserAccessToken(
    req,
    "eyJhbGciOiJLTVMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJodHRwczovL2FwaS5kYXRhdmlsbGFnZS5tZS8iLCJzdWIiOiJkYWVhYTA4My0yNDdhLTRkYWMtYTA5OS05YWIzODM4YjA0YzgiLCJ1cmkiOiJodHRwczovL2FwaS5kYXRhdmlsbGFnZS5tZS91c2Vycy9kYWVhYTA4My0yNDdhLTRkYWMtYTA5OS05YWIzODM4YjA0YzgiLCJhenAiOiJlMjRlNGNiMC00OGI1LTQwNDgtOTdkYy0xYzkxZjEzZDZlNDciLCJpYXQiOjE2MDA0MzExNzcsImV4cCI6MTYwNjQzMTE3Nywic2NvcGUiOiJodHRwczovL2FwaS5kYXRhdmlsbGFnZS5tZS9jb25zZW50UmVjZWlwdHMveWZBWnlaMFBRaDVQTDM4TTFTTjNWRVEwUFFKS2c0NFBrWUJRWVRkei03Vm12VlFsZzVVMnVSUVpsbnRvbUc3Q2dKanZWY3RwT1F6eEpXNGR3eHg5X0FEbFNjNzVPYklmaG12UDFnQWtuY1lNNXVxdlBlLWhxQ3hUR2Y5emdldWIifQ.AQICAHiicquW0AOzDlrHF9VXK3pZkmcMQWFNDW2TSJ2YbFcC0gFHrVc7RNk2b/W62g8uLvZMAAACvTCCArkGCSqGSIb3DQEHBqCCAqowggKmAgEAMIICnwYJKoZIhvcNAQcBMB4GCWCGSAFlAwQBLjARBAz7IbU3+ac14ilS8l8CARCAggJwYNjtYrsOMmeJ+eYpUX2GMuBZz3oQriihJUAsT8f4igIK4WLxE0V1+u2sM/gVwimGeal50MBYI7fxezbgZsQhRGsdA4LHeQQkVN69P6zYPFkD09/cR6bNWFenDl5U7FAnbNfGi4x8mm08CMe0GL2SGlcQB0fZnNo5DrJKbSu7v/ln8xe2/umrJ0Hn1amkkJWGEdFNCm8xWxHd9f2LejOPOFGSXqLshlitXv7czyCjBsRoxgH9PFrzerYQvTJjwQBsv868YZEiIRoBUZkmO5vxt/2KLkBiJGsOiQx1nv/MdeVm074xUc8WhMH1akzT/kkH3IVaRYZ83Ix4hV4JQEaoKDE5yi/GqVui6mCswoZoCli2e/DpvshPtOn0l60bGp1lKKLLY+FyHUgm4dwbn49bFabb/UeR+PE1Cg+lCO39fQ21cFusDLFlZmWrWh2SZ0pC/w29aQbJsJHL+xFSQaXFie1TgSGPp/yulcu1riqnb1uANihjpJYK8f9q6QLAS3nUSSSEJJx2ysKi+2ZxAG5ET3cxdSUwZOpLkh5e+1hNarAwFoQfOg5QZ5lnpx4N1cV9gVT6Il3gs50q97XzODVPE2rcpa6a7VnC34d4f/Sz+jlxUfjB8uu/EA6vb6YmHAAMww6gC7V2iTUZ37x036ezu7V1xqKg2tUEWW9HNijH8oystqiSMuXGo+CORpB+LyTP4+yr/ZLiqeTMZTVOhJOLhQLlpmLZFsLyV51bk6BDNldzBEr77nymTgNKIUsWL/D4V1vvI6VeDwY6kgDGIUcLqygBh6O8kGlDDmnOo6ZWqNRYWvaalZqfhL8GoK9ocvz/"
  );
  renderHome(req, res, true);
});

/* simple query digital twin  */
router.get("/simpleQueryDigitalTwin", function (req, res, next) {
  //query digital twin into the data cage (confidenital graph engine)
  var query = {
    query:
      "{Total{uri amount{byDistance byMinute} frequency{perWeek} speed{average}  observationPeriod{hasBeginning{year month day hour formatted} hasEnd{year month day hour formatted}}}}",
    variables: {}
  };

  Custom.queryDigitalTwin(Session.getUserAccessToken(req), query, function (
    response
  ) {
    if (response != null) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response.data));
    } else res.writeHead(401, { "Content-Type": "application/json" });
    res.end("Error occur during query digital twin flow");
  });
});

/* advanced query digital twin  */
router.get("/advancedQueryDigitalTwin", function (req, res, next) {
  //query digital twin into the data cage (confidenital graph engine)
  var query = {
    query:
      "{week (filter:{year:2020}){week month year physicalActivity{uri amount{byDistance byMinute} frequency{perWeek} intensity{uri duration}}}}",
    variables: {}
  };

  Custom.queryDigitalTwin(Session.getUserAccessToken(req), query, function (
    response
  ) {
    if (response != null) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response.data));
    } else res.writeHead(401, { "Content-Type": "application/json" });
    res.end("Error occur during query digital twin flow");
  });
});

/**
 * render  home
 * @param {req} request
 * @param {res} response
 */
function renderHome(req, res, active) {
  res.render("home", {
    layout: "master",
    actionActivateConsent: Authorization.authorize(
      process.env.CLIENT_ID,
      process.env.APP_URL + "callback",
      Consents.ROOT_PATH_CONSENT_RECEIPT + process.env.CONSENT_RECEIPT_ID
    ),
    actionRevokeConsent: Authorization.deAuthorize(),
    active: active
  });
}

/**
 * render error
 * @param {req} request
 * @param {res} response
 */
function renderError(req, res, error) {
  res.render("error", {
    layout: "master",
    title: "Error",
    message: error
  });
}

module.exports = router;
