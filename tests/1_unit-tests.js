const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {
    test('should correctly read a whole number input', function () {
        const input = '33';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 33);
    });
    test('should correctly read a decimal number input', function () {
        const input = '33.33';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 33.33);
    });
    test('should correctly read a fractional input', function () {
        const input = '33/33';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 1);
    });
    test('should correctly read a fractional input with a decimal', function () {
        const input = '33.33/33.33';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 1);
    });
    test('should correctly return an error on a double-fraction', function () {
        const input = '33/33/33';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 'invalid number');
    });
    test('should correctly default to a numerical input of 1 when no numerical input is provided', function () {
        const input = '';
        const result = convertHandler.getNum(input);
        assert.strictEqual(result, 1);
    });
    test('should correctly read each valid input unit', function () {
        const inputUnits = ['33mi', '33km', '33gal', '33L', '33lbs', '33kg'];

        inputUnits.forEach((input) => {
            const unit = input.slice(2);
            const result = convertHandler.getUnit(input);
            assert.strictEqual(result, unit);
        })

    });
    test('should correctly return an error for an invalid input unit', function () {
        const input = '33miles';
        const result = convertHandler.getUnit(input);
        assert.strictEqual(result, 'invalid unit');
    });
    test('should return the correct return unit for each valid input unit', function () {
        assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
        assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
        assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
        assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
        assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
        assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
    });
    test('should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.strictEqual(convertHandler.spellOutUnit('gal'), 'gallons');
        assert.strictEqual(convertHandler.spellOutUnit('L'), 'liters');
        assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
        assert.strictEqual(convertHandler.spellOutUnit('km'), 'kilometers');
        assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds');
        assert.strictEqual(convertHandler.spellOutUnit('kg'), 'kilograms');
    });
    test('should correctly convert gal to L', function () {
        assert.strictEqual(convertHandler.convert(33, 'gal'), 124.91853);
    });
    test('should correctly convert L to gal', function () {
        assert.strictEqual(convertHandler.convert(33, 'L'), 8.71768);
    });
    test('should correctly convert mi to km', function () {
        assert.strictEqual(convertHandler.convert(33, 'mi'), 53.10822);
    });
    test('should correctly convert km to mi', function () {
        assert.strictEqual(convertHandler.convert(33, 'km'), 20.50530);
    });
    test('should correctly convert lbs to kg', function () {
        assert.strictEqual(convertHandler.convert(33, 'lbs'), 14.96854);
    });
    test('should correctly convert kg to lbs', function () {
        assert.strictEqual(convertHandler.convert(33, 'kg'), 72.75261);
    });
});