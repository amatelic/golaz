
module.exports = {
    ...require('./lib/input'),
    ...require('./lib/transformers'),
    ...require('./lib/output'),
    pipe: require('./lib/util').pipe
}