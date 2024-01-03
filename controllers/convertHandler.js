function ConvertHandler() {

  this.getNum = function (input) {
    if (!input) return 1
    let i;
    if (!input.match(/[a-z]/i)) i = input.length
    else i = input.match(/[a-z]/i).index;
    let num = input.slice(0, i);
    if (!num && input.match(/\d/)) return 'invalid number'
    else if (!num) return 1
    function isDecimal(value) {
      return /^\d+(\.\d+)?$/.test(value);
    }
    function isWhole(value) {
      return /^\d+(\.)?$/.test(value);
    }
    function isFraction(value) {
      return /^\d+(\.\d*)?\/\d+(\.\d*)?$/.test(value);
    }
    if (isDecimal(num)) return Number(num)
    if (isWhole(num)) return parseInt(num)
    if (isFraction(num)) {
      const [numerator, denominator] = num.split('/');
      return numerator / denominator;
    }
    return 'invalid number'
  };

  this.getUnit = function (input) {
    if (!input || !input.match(/[a-z]/i)) return 'invalid unit'
    let validUnits = ['gal', 'l', 'lbs', 'kg', 'mi', 'km']
    let i = input.match(/[a-z]/i).index;
    let unit = input.slice(i).toLowerCase();
    let isValidUnit = validUnits.includes(unit);
    if (isValidUnit) {
      if (unit === 'l') {
        return 'L'
      }
      return unit
    }
    return 'invalid unit'
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case 'gal':
        return 'L'
        break;
      case 'L':
        return 'gal'
        break;
      case 'lbs':
        return 'kg'
        break;
      case 'kg':
        return 'lbs'
        break;
      case 'mi':
        return 'km'
        break;
      case 'km':
        return 'mi'
        break;
      default:
        return 'not a valid unit'
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case 'gal':
        return 'gallons'
        break;
      case 'L':
        return 'liters'
        break;
      case 'lbs':
        return 'pounds'
        break;
      case 'kg':
        return 'kilograms'
        break;
      case 'mi':
        return 'miles'
        break;
      case 'km':
        return 'kilometers'
        break;
      default:
        return 'not a valid unit'
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'not a valid unit'
    }
    return Number(result.toFixed(5))
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`

    return result
  };

}

module.exports = ConvertHandler;
