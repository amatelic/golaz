const { pipe, input } = require('../index');

test('check if pipe is working correctly', () => {
    const mut = (a) => (b) => b * a;
    const ident = (a) => a;


    expect(pipe(ident(2), mut(5))).toEqual(10);
    expect(pipe(ident(3), mut(5))).toEqual(15)
});

test('Generate http config file', () => {
    const mut = (a) => (b) => b * a;
    const ident = (a) => a;

    const errorObj = {
        myError: {
          name: 'INCORRECT URL TYPE',
          desc: 'The "url" argument must be of type string. Received type undefinedTypeError [ERR_INVALID_ARG_TYPE]: The "url" argument must be of type string. Received type undefined'
        }
      };
    

    expect(() => pipe(input)).toThrowError("Provided value is not a valid url string");

    // expect(pipe(input)).toEqual(10);
    // expect(pipe(ident(3), mut(5))).toEqual(15)
});
