var readline = require("readline");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "user> ",
    terminal: false
});

function READ(prompt) {
    return prompt;
}

function EVAL(ast) {
    return ast;
}

function PRINT(text) {
    return text;
}

function rep(input) {
    return PRINT(EVAL(READ(input)));
}

rl.prompt();

rl.on("line", (line) => {
    console.log(rep(line));
    rl.prompt();
}).on("close", () => {
    process.exit(0);
});
