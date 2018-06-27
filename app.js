const express = require("express");
const request = require("request");
const libphonenumber = require("libphonenumber-js");
const app = express();
const PORT = process.env.PORT || 3000;
const ipStackAccessKey = "7753621da6f9525de5242d736aa995ee";

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function(req, res) {
  res.send("hello world");
});

app.get("/api/formatPhoneNumber", function(req, res) {
  console.log(req.query);
  console.log(req.ip);
  let number = req.query.number;
  let countryCode = req.query.country_code;
  //   let ip = req.query.ip;
  let formattedNumber = "";

  if (number === undefined) {
    res.json({ error: "number not provided" });
  }

  // Country code not provided by API user
  if (countryCode === undefined) {
    const ip = req.headers["x-forwarded-for"];
    // const ip = "203.214.65.84";
    console.log(`x-forwarded-for: ${ip}`);
    request(
      `http://api.ipstack.com/${ip}?access_key=${ipStackAccessKey}&format=1`,
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          const info = JSON.parse(body);
          countryCode = info.country_code;
          console.log(`Country code looked up: ${countryCode}`);
          if (countryCode === undefined) {
            res.json({ error: "country code could not be determined" });
          } else {
            try {
              formattedNumber = libphonenumber.formatNumber(
                number,
                countryCode,
                "International"
              );
              res.json({ formatted_number: formattedNumber });
            } catch (error) {
              console.error(error);
              res.json({ error: "invalid number" });
            }
          }
        } else {
          res.json({ error: "country code could not be determined" });
        }
      }
    );
  }
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("There was an error!");
});

app.use(function(req, res) {
  res.send(404);
});

app.listen(PORT, () =>
  console.log(`phone formatter app listening on port ${PORT}`)
);
