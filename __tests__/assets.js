const agent = (callback) => {

    const server = require('http').createServer(callback);

    return {
        listen: (port) => {
            return new Promise((resolve, reject) => {
                server.listen(port, (err) => {
                    if (err) { reject(err) } else { resolve() };
                    console.log(`Server listening on port ${port}`);
                });
            });
        },
        close: () =>  {
            return new Promise((resolve, reject) => {
                server.close((err) => err ? reject(err) : resolve());
            });
        }
    }
}


module.exports = {
    agent
}