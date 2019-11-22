const { pipe, input, text, body, get } = require('../index');


const agent = (promise) => {
    let server;
    return (new Promise((resolve, reject) => {
        const http = require('http');

        server = http.createServer((req, res) => {
            res.end('this is working');
            resolve('this is working')
        });
    
        server.listen(5000); 
    }))
    .then(promise)
    .then(value => {
        server.close();
        return value;
    })
    .catch(err => {
        console.log(err);
    })
}

test('throw if server is not running', async () => {
    await expect(
        agent(
            pipe(
                pipe(input('http://localhost:5000'), get()),
                text()
            )
        )
    ).resolves.toBe('this is working');
});

test('should return resposne', async () => {
    await expect(
        pipe(
            pipe(input('http://localhost:5000'), get()),
            text()
        )
    ).rejects.toThrow('connect ECONNREFUSED 127.0.0.1:5000');
});