# Website

The website uses `ringo/simplesite` to render the Markdown-based documentation.
You can edit the very basic configuration in the `config` directory. Styles and client-side
Javascript is in the `static` directory. RingoJS.org is plain CSS and JS in the browser.

The main documentation is in the `content` directory. You can use CommonMark to write
fresh content. Every release artifact should be linked to the corresponding
[GitHub release](https://github.com/ringo/ringojs/releases/). 

## Build and run

```
docker build -t ringojs/website .
docker run -p 8080:8080 --rm -v $(pwd):/var/website:ro ringojs/website
```
