const { pipe, input, identity } = require('../index');

test('check if pipe is working correctly', async () => {
  try {
    const mut = (a) => (b) => Promise.resolve(b * a);
    const ident = (a) => Promise.resolve(a);

    const result1 = await pipe(ident(2), mut(5)); 
    const result2 = await pipe(ident(3), mut(5));


    expect(result1).toEqual(10);
    expect(result2).toEqual(15)
  } catch (error) {
    throw error; 
  }
});

test('Generate http config file', async () => {
  try {
    const response = await pipe(
      input('htttp://example.com'), identity()
    );

    expect(response.type).toEqual("input");
    expect(response.options).toEqual({
      "auth": null,
      "hash": null,
      "host": "example.com",
      "hostname": "example.com",
      "href": "htttp://example.com",
      "path": null,
      "pathname": null,
      "port": null,
      "protocol": "htttp:",
      "query": null,
      "search": null,
      "slashes": true,
    });
    // expect(response).toMatchSnapshot();
  } catch (error) {
    console.log(error);
    throw error;
  }
});


test('Input expect error', async () => {

  let error;
  try {
    const response = await pipe(
      input(), identity()
    );
  } catch (err) {
    error = err
  }

  expect(error).toEqual('Provided value is not a valid url string');


    // expect(pipe(input)).toEqual(10);
    // expect(pipe(ident(3), mut(5))).toEqual(15)
});
