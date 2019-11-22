const HTTP_TYPES = {
    INPUT: 'input',
    MODIFIER: 'modifier',
    OUTPUT: 'output',
}

const BODY_TYPES = {
    JSON: "json",
    FORMDATA: "formdata",
    NOBODY: "nobody",
    BINARY: "binary",
}

function pipe(...args) {
    const lastFn = args.pop();

    let stack = args.shift();
    
    while(args.length > 0) {
        const fn = args.shift()
        stack = fn(stack);
    }

    // Find a better way how to remoe the output event
    if (lastFn.type === HTTP_TYPES.OUTPUT) {
        return lastFn.output(stack)
    } else {
        return lastFn(stack);
    }
}

module.exports = {
    pipe,
    BODY_TYPES,
    HTTP_TYPES
};