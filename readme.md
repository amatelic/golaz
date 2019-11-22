### Basic http request abstraction

This is a small module for abstracting the native nodejs request module.
To communicate like a stream api 


    pipe(
        input(url) -> input function 
        headers({ token: 'test' }) -> headers transformation
        body({ name: 'anze', surname: 'matelic' }) -> body transformation
        json() -> output function
    ) || Promise or config file


Example of API (in development)