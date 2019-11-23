const {HTTP_TYPES, BODY_TYPES} = require('./util');
const querystring = require('querystring');

function body(data, type = BODY_TYPES.JSON) {
    return (input) => {
        switch (type) {
            case BODY_TYPES.JSON: {
                const headers = {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(JSON.stringify(data))
                };

                input.options.body = data;
                input.options.headers = headers;
                input.meta.body = JSON.stringify(data);
                break;
            }

            case BODY_TYPES.FORMDATA: {

                if (input.options.method.toUpperCase() !== 'POST') {
                    throw new Error('Only way to send data is with the POST method');
                }
                // input.options.body = 

            }

            case BODY_TYPES.BINARY: {
                // input.options.headers = 

            }
            case BODY_TYPES.NOBODY:
             {
                input.meta.body = null;
                break;
            }

        }
        return {
            ...input,
            type: HTTP_TYPES.MODIFIER,
        }
    }
}

function query(obj) {
    return (input) =>  {
        const query  = querystring.stringify(obj);
        input.options.query = query;
        input.options.search =  `?${query}`,
        input.options.query = query,
        input.options.path = `/?${query}`
        return {
            ...input,
            type: HTTP_TYPES.MODIFIER,
        }
    }
}

function headers(headers) {
    return (input) => {
         input.options.headers = headers;
        return {
            ...input,
            type: HTTP_TYPES.MODIFIER,
        }
    }
}

function method(method) {
    return (input) => {
        input.options.method = method;
        return {
            ...input,
            type: HTTP_TYPES.MODIFIER,

        }
    }
}

module.exports = {
    body,
    query,
    headers,
    method,
    get: () => method('get'),
    post: () => method('post'),
    put: () => method('put'),
    delete: () => method('delete'),
}