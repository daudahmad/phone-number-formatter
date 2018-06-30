const express = require("express");
const request = require("request");
const libphonenumber = require("libphonenumber-js");
const app = express();
const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
const constants = require("./constants");
const PORT = process.env.PORT || 3000;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://daudahmad.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: "https://phoneformatter/api",
  issuer: `https://daudahmad.auth0.com/`,
  algorithms: ["RS256"]
});

app.get("/api/formatPhoneNumber", checkJwt, function(req, res) {
  let number = req.query.number;
  let countryCode = req.query.country_code;
  let formattedNumber = "";

  if (number === undefined) {
    console.log(constants.missingNumberMsg);
    sendErrorMessage(res, constants.missingNumberMsg);
  } else {
    // Country code not provided by API user
    if (countryCode === undefined) {
      const ip = req.headers["x-forwarded-for"];
      // const ip = "203.214.65.84";
      console.log(`x-forwarded-for: ${ip}`);
      if (ip === undefined) {
        sendErrorMessage(res, constants.countryCodeNotDeterminedMsg);
      } else {
        request(
          `http://api.ipstack.com/${ip}?access_key=${
            constants.ipStackAccessKey
          }&format=1`,
          countryCodeLookup
        );
      }
    } else {
      formatNumber(number, countryCode, res);
    }
  }
});

function countryCodeLookup(error, response, body) {
  if (!error && response.statusCode == 200) {
    try {
      countryCode = JSON.parse(body).country_code;
      if (countryCode === undefined) {
        sendErrorMessage(res, constants.countryCodeNotDeterminedMsg);
      } else {
        formatNumber(number, countryCode, res);
      }
    } catch (error) {
      sendErrorMessage(res, constants.invalidNumberMsg);
    }
  } else {
    sendErrorMessage(res, constants.countryCodeNotDeterminedMsg);
  }
}

function formatNumber(number, countryCode, res) {
  try {
    formattedNumber = libphonenumber.formatNumber(
      number,
      countryCode,
      "International"
    );
    let valid = libphonenumber.isValidNumber(formattedNumber, countryCode);
    sendFormattedNumberRes(res, formattedNumber, valid);
  } catch (error) {
    sendErrorMessage(res, error.message);
    // console.error(error.message);
  }
}

function sendFormattedNumberRes(res, formattedNumber, valid) {
  res.json({
    success: true,
    formatted_number: formattedNumber,
    valid: valid
  });
}

function sendErrorMessage(res, message) {
  res.json({ success: false, message: message });
}

app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.use(function(req, res) {
  res.status(404);
});

app.listen(PORT, () =>
  console.log(`phone formatter app listening on port ${PORT}`)
);

module.exports = app;
