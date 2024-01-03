'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const spelledOutUnit = convertHandler.spellOutUnit(initUnit);
    const spelledOutReturnUnit = convertHandler.spellOutUnit(returnUnit);
    const string = convertHandler.getString(initNum, spelledOutUnit, returnNum, spelledOutReturnUnit);
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      res.status(200).send("invalid number and unit");
    } else if (initNum === 'invalid number') {
      res.status(200).send("invalid number")
    } else if (initUnit === 'invalid unit') {
      res.status(200).send("invalid unit")
    } else {
      res.status(200).json({ initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: string });
    }
  })
};
