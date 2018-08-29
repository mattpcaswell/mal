class ListType {
    constructor(value) {
        this.type = "list";
        this.value = value;
    }
}

class SymbolType {
    constructor(name, value) {
        this.type = "symbol";
        this.name = name;
        this.value = value;
    }
}

class LiteralType {
    constructor(value) {
        this.type = "literal";
        this.value = value;
    }
}

module.exports = {
    ListType: ListType,
    SymbolType: SymbolType,
    LiteralType: LiteralType,
};
