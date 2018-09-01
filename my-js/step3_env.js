const util = require("util");
const readline = require("readline");
let Env = require("./env.js");
let read_str = require("./reader.js");
let print_str = require("./printer.js");
const {ListType, SymbolType, LiteralType} = require("./types.js");

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "user> ",
    terminal: false
});

let repl_env = new Env();
repl_env.set(new SymbolType("+"), (a,b) => new LiteralType(a.value + b.value));
repl_env.set(new SymbolType("-"), (a,b) => new LiteralType(a.value - b.value));
repl_env.set(new SymbolType("*"), (a,b) => new LiteralType(a.value * b.value));
repl_env.set(new SymbolType("/"), (a,b) => new LiteralType(a.value / b.value));

function eval_ast(ast, env) {
    switch (ast.type) {
    case "list":
	return new ListType(ast.value.map((member) => EVAL(member, env)));
    case "symbol":
	return env.get(ast);
    default:
	return ast;
    }
}

function READ(prompt) {
    return read_str(prompt);
}

function EVAL(ast, env) {
    if (ast.type != "list")
	return eval_ast(ast, env);
    if (ast.value.length == 0)
	return ast;

    // ast is a non-empty list
    let operator = ast.value.shift();
    let args = ast;

    if (operator.type == "symbol") {
	switch (operator.value) {
	case "def!":
	    return env.set(args.value[0], EVAL(args.value[1], env));
	case "let*":
	    let newEnv = new Env(env);
	    let bindings = args.value[0].value;
	    while (bindings.length > 0) {
		newEnv.set(bindings[0], EVAL(bindings[1], newEnv));
		bindings.splice(0, 2);
	    }
	    
	    return EVAL(args.value[1], newEnv);
	}
    }
    
    operator = eval_ast(operator, env);
    args = eval_ast(args, env);

    return operator(...args.value);
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


function dbg(str, obj) {
    console.log(str + " " + util.inspect(obj, {showHidden:false, depth:null}));
}
