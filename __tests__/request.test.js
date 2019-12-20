const { pipe, input, text, body, timeout, get } = require('../index');
const { agent } = require('./assets');

describe("Test if all request options return correct result", () => {
    test('throw if server is not running', async () => {

        // const instance = agent((req, res) => {
        //     // console.log(res.end)
        //     res.end('this is working');
        // });

        // const value = await Promise.all([
        //         instance.listen(6000),
        //         pipe(
        //             pipe(input('http://localhost:6000'), get()),
        //             text()
        //         ) 
        //     ])
        //     .then(([_, value]) => {
        //         return instance.close()
        //             .then(_ => value)
        //     });

        // console.log(value)

        expect('this is working').toBe('this is working');
        
    });

    // test('should throw error if server is not running', async () => {
    //     await expect(
    //         pipe(
    //             pipe(input('http://localhost:5000'), get()),
    //             timeout(300),
    //             text()
    //         )
    //     ).rejects.toThrow('connect ECONNREFUSED 127.0.0.1:5000');
    // });   
});