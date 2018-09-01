const util = require("util");
const {ListType, SymbolType, LiteralType} = require("./types.js");

class Reader {
    constructor(tokens) {
        this.tokens = tokens;
        this.position = 0;
    }

    // return current token and increment position
    next() {
        return this.tokens[this.position++];
    }

    // return current token
    peek() {
        return this.tokens[this.position];
    }
}

function read_str(str) {
    let tokens = tokenizer(str);
    let reader = new Reader(tokens);
    return read_form(reader);
}

function tokenizer(str) {
    let regex = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g;
    let output = [];
    while ((match = regex.exec(str)[1]) != "") {
	if(match[0] === ";") { continue; }
	output.push(match);
    }

    return output;
}

function read_form(reader) {
    switch (reader.peek()) {
    case "(":
        return read_list(reader);
    default:
        return read_atom(reader);
    }
}

function read_list(reader) {
    let list = [];
    let item;

    reader.next();
    item = read_form(reader);
    while(item.value  !== ")") {
        list.push(item);
        item = read_form(reader);

	if (item.value === undefined) {
	    throw "expected \')\', got EOF\\r\\n";
	    return null;
	}
    }

    return new ListType(list);
}

function read_atom(reader) {
    if (isNaN(reader.peek()))
	return new SymbolType(reader.next());
    return new LiteralType(Number(reader.next()));
}

module.exports = read_str;
