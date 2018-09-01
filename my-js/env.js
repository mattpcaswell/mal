class Env {
    constructor(outer = null) {
	this.outer = outer;
	this.data = {};
    }

    set(symbol, value) {
	return this.data[symbol.value] = value;
    }

    find(symbol) {
	if (this.data[symbol.value])
	    return this;

	if (this.outer)
	    return this.outer.find(symbol);

	return null;
    }

    get(symbol) {
	let symbolEnv = this.find(symbol);

	if (symbolEnv == null)
	    throw "\'" + symbol.value + "\' not found";

	return symbolEnv.data[symbol.value];
    }
}

module.exports = Env;
