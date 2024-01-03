const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
//const server = require('../server'); // Run this locally
const server =
  "https://f9ce54ea-03d0-4fa2-8ec3-8a734b03b89a-00-3ndd5xh9sx2fn.picard.replit.dev";

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("should convert a valid input such as 10L: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 liters converts to 2.64172 gallons",
        });
        done();
      });
  });
  test("should convert an invalid input such as 32g: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, "invalid unit");
        done();
      });
  });
  test("should convert an invalid number such as 3/7.2/4kg: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, "invalid number");
        done();
      });
  });
  test("should convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert", function (done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.strictEqual(res.text, "invalid number and unit");
        done();
      });
  });
});
