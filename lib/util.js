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

async function pipe(...args) {
    const lastFn = args.pop();

    let stack = args.shift();
    
    while(args.length > 0) {
        const fn = args.shift()
        stack = stack.then(fn)
    }

    return stack.then(lastFn)
}

module.exports = {
    pipe,
    BODY_TYPES,
    HTTP_TYPES
};