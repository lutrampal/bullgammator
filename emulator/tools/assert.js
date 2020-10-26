module.exports = function assert(condition, errorMessage) {
	if (!condition) {
		throw Error(errorMessage);
	}
}

module.exports.equal = function equal(x, y, errorMessage) {
	if (x !== y) {
		throw Error(errorMessage);
	}
}
