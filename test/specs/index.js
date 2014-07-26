var stringCalculator = require('../../source/index.js');

describe('is stringCalculator defined', function () {
	it('should be defined', function () {
		expect(stringCalculator).to.be.ok;
	});
	it('stringCalculator.add method should be defined', function () {
		expect(stringCalculator.add).to.be.ok;
	});
});

describe('add method can take 0, 1 or 2 numbers and retunt its sum', function () {
	it('should return 0', function () {
		expect(stringCalculator.add('')).to.equal(0);
	});
	it('should return 1', function () {
		expect(stringCalculator.add('1')).to.equal(1);
	});
	it('should return 4', function () {
		expect(stringCalculator.add('1,3')).to.equal(4);
	});
});