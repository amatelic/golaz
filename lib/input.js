const https = require('https');
const http = require('http');
const url  = require('url');
const {HTTP_TYPES} = require('./util');
function input(requestUrl = "") {

    const urlObject = url.parse(requestUrl);

    if (!urlObject.hostname) {
        throw new Error('Provided value is not a valid url string');
    }

    const protocol = urlObject.protocol === 'https' ? https : http;

    return {
        type: HTTP_TYPES.INPUT,
        options: urlObject,
        meta: {
            protocol,
        } 
    }
}

module.exports = {
    input
}