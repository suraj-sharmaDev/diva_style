export const splitCamelCase = (word) => {
    var output, i, l, capRe = /[A-Z]/;
    if (typeof (word) !== "string") {
        throw new Error("The \"word\" parameter must be a string.");
    }
    output = [];
    for (i = 0, l = word.length; i < l; i += 1) {
        if (i === 0) {
            output.push(word[i].toUpperCase());
        }
        else {
            if (i > 0 && capRe.test(word[i])) {
                output.push(" ");
            }
            output.push(word[i]);
        }
    }
    return output.join("");
}