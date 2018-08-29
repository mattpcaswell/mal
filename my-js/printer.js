function pr_str(structure) {
    let output = "";

    if (structure.type == "list") {
        // Its a list
        output = "(";
        for(let i = 0; i < structure.value.length; i++) {
            output += pr_str(structure.value[i]);

	    if (i < structure.value.length - 1) {
		output += " ";
	    }
        }

        output += ")";
    } else if (structure.type == "symbol") {
        // Its a symbol
        output = structure.name;
    } else {
        // Its a number
        output = "" + structure.value;
    }

    return output;
}

module.exports = pr_str;
