var readline = require("readline");
var read_str = require("./reader.js");
var print_str = require("./printer.js");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "user> ",
    terminal: false
});

function READ(prompt) {
    return read_str(prompt);
}

function EVAL(ast) {
    return ast;
}

function PRINT(structure) {
    return print_str(structure);
}

function rep(input) {
    try {
	return PRINT(EVAL(READ(input)));
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
