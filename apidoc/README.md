# API documentation

Ringo's API documentation is based on a custom JSDoc parser based on the legacy
[JSDoc package](https://github.com/ringo/legacy-modules/tree/master/ringo-jsdoc).

## Build and run

You have to clone the RingoJS repository to generate the API documentation. In the example,
the [ringo/ringojs](https://github.com/ringo/ringojs) repository is cloned into `~/Code/ringojs/`.
The generated files will be saved to the `output` directory. Make sure that the output directory
is empty before running the generator.

```
docker build -t ringojs/apidoc .

docker run -it --rm \
    -v ~/Code/ringojs/:/var/ringojs/:ro \
    -v $(pwd)/output/:/var/output/ \
    ringojs/apidoc
```