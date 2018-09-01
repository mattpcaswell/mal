let readline = require("readline");
let read_str = require("./reader.js");
let print_str = require("./printer.js");
const {ListType, SymbolType, LiteralType} = require("./types.js");

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "user> ",
    terminal: false
});

let repl_env = {
    "+": (a,b) => new LiteralType(a.value + b.value),
    "-": (a,b) => new LiteralType(a.value - b.value),
    "*": (a,b) => new LiteralType(a.value * b.value),
    "/": (a,b) => new LiteralType(a.value / b.value),
};

function eval_ast(ast, env) {
    switch (ast.type) {
    case "list":
	return new ListType(ast.value.map((member) => EVAL(member)));
    case "symbol":
	return repl_env[ast.value];
    default:
	return ast;
    }
}

function READ(prompt) {
    return read_str(prompt);
}

function EVAL(ast, env) {
    if (ast.type == "list") {
	if (ast.value.length == 0)
	    return ast;

	let newList = eval_ast(ast, env);

	let operator = newList.value.shift();
	return operator(...newList.value);
    } else {
	return eval_ast(ast, env);
    }
}

function PRINT(structure) {
    return print_str(structure);
}

function rep(input) {
    try {
	return PRINT(EVAL(READ(input), repl_env));
    } catch(e) {
	console.log(e);
	return "";
    }
}

rl.prompt();

rl.on("line", (line) => {
    console.log(rep(line));
    rl.prompt();
}).on("close", () => {
    process.exit(0);
});
