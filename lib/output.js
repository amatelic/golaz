const { HTTP_TYPES } = require('./util');

function output(body = false, transform = (value) => value) {
    return {
        type: HTTP_TYPES.OUTPUT,
        output: ({ options, meta }) => new Promise((resolve, reject) => {
        let output = ""
        const req = meta.protocol.request(options, (res) => {
            res.setEncoding('utf8');
            if(body) {
                res.on('data', (chunk) => {
                    output += chunk
                });
            }
            res.on('end', () => {
              resolve(transform(body ? output : response));
            });
          });
          
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