process.env.NODE_ENV = "test";

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app");
const constants = require("../constants");
let should = chai.should();

chai.use(chaiHttp);

describe("API endpoint /api/formatPhoneNumber", () => {
  it("it should returnno authorization token found message", done => {
    chai
      .request(server)
      .get("/api/formatPhoneNumber")
      .end((err, res) => {
        res.should.have.status(401);
        // console.log(res.body);
        res.body.message.should.be.eql(constants.tokenNotFoundMsg);
        // res.body.should.be.a("array");
        // res.body.length.should.be.eql(0);
        done();
      });
  });

  it("it should return number not provided message", done => {
    chai
      .request(server)
      .get("/api/formatPhoneNumber")
      .set("Authorization", constants.token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql(constants.missingNumberMsg);
        done();
      });
  });

  it("it should return the formatted phone number if country code not provided", done => {
    chai
      .request(server)
      .get("/api/formatphonenumber?number=431023984")
      .set("Authorization", constants.token)
      .end((err, res) => {
        // console.log(res.body);
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.formatted_number.should.be.eql("+61 431 023 984");
        done();
      });
  });

  it("it should return the formatted phone number according to the incorrect provided country code", done => {
    const incorrectCountryCode = "DEAD";
    chai
      .request(server)
      .get(`/api/formatphonenumber?number=5127364514&country_code=${incorrectCountryCode}`)
      .set("Authorization", constants.token)
      .end((err, res) => {
        // res.should.have.status(200);
        // console.log(res.body);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql(`Unknown country: ${incorrectCountryCode}`);
        done();
      });
  });

  it("it should return the formatted phone number according to the provided AU country code", done => {
    chai
      .request(server)
      .get("/api/formatphonenumber?number=431023984&country_code=AU")
      .set("Authorization", constants.token)
      .end((err, res) => {
        // res.should.have.status(200);
        // console.log(res.body);
        res.body.success.should.be.eql(true);
        res.body.formatted_number.should.be.eql("+61 431 023 984");
        done();
      });
  });

  it("it should return the formatted phone number according to the provided US country code", done => {
    chai
      .request(server)
      .get("/api/formatphonenumber?number=5127364514&country_code=US")
      .set("Authorization", constants.token)
      .end((err, res) => {
        // res.should.have.status(200);
        // console.log(res.body);
        res.body.success.should.be.eql(true);
        res.body.formatted_number.should.be.eql("+1 512 736 4514");
        done();
      });
  });
});
