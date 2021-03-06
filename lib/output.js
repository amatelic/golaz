const { StringDecoder } = require('string_decoder');

function output(body = false, transform = (value) => value) {
    return ({ options, meta }) => new Promise((resolve, reject) => {
    let output = "";

    Object.assign(options, { timeout: meta.timeout });

    const req = meta.protocol.request(options, (res) => {
        
        const decoder = new StringDecoder('utf-8');

        if(body) {
            res.on('data', (chunk) => {
                output += chunk
            });
        }
        res.on('end', () => {
            resolve(transform(body ? decoder.write(output) : res));
        });
        });


        req.on('timeout', () => {
            console.log('this is runned')
            req.abort();
        });
        
        req.on('error', reject);

        if (meta && meta.body) {
        req.write(meta.body);
        }
        
        // Write data to request body
        req.end(); 
    });
}

function text() {
    return output(true);
}

function json() {
    return output(true, JSON.parse);
}

function identity() {
    return (value) => value
}

module.exports = {
    json, 
    text, 
    output,
    identity
}