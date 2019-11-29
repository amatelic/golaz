const { StringDecoder } = require('string_decoder');
const { HTTP_TYPES } = require('./util');

function output(body = false, transform = (value) => value) {
    return {
        type: HTTP_TYPES.OUTPUT,
        output: ({ options, meta }) => new Promise((resolve, reject) => {
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
              console.log('status', output);
              resolve(transform(body ? decoder.write(output) : response));
            });
          });


          req.on('timeout', () => {
              console.log('this is runned')
              req.abort();
          })
          
          req.on('error', reject);

          if (meta.body) {
            req.write(meta.body);
          }
          
          // Write data to request body
          req.end(); 
        }),
    };
}

function text() {
    return output(true);
}

function json() {
    return output(true, JSON.parse);
}

module.exports = {
    json, 
    text, 
    output
}