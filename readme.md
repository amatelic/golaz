### Golaz

This is a basic module for creating http requests. The module is separated in small function which you can use to create a basic http request with the help of composition

In the below code you can see a basic example of a http get a request where 
we are sending a header with the value token + a body parameter of type json
and for the return value, we are expecting a json object.

    pipe(
        input(url) -> input function 
        headers({ token: 'test' }) -> headers transformation
        body({ name: 'anze', surname: 'matelic' }) -> body transformation
        json() -> output function
    ) || Promise or config file


Example of API (in development)

The module is made of the building blocks and the utility helper pipe

input -> The input method is the start value of the request here we can provide the url which we want to access.(This should be)
transformer -> This is the methods
output -> The last building block required to execute the request with the the prev input and transformers functions


All fuction are [Promise based](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise);


Example of basic transformer module

```js
function query(obj) {
    return (input) =>  {
        const query  = querystring.stringify(obj);
        input.options.query = query;
        input.options.search =  `?${query}`,
        input.options.query = query,
        input.options.path = `/?${query}`
        return Promise.resolve({
            ...input,
            type: HTTP_TYPES.MODIFIER,
        });
    }
}
```