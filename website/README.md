# Website

The website uses `ringo/simplesite` to render the Markdown-based documentation.
You can edit the very basic configuration in the `config` directory. Styles and client-side
Javascript is in the `static` directory. RingoJS.org is plain CSS and JS in the browser.

The main documentation is in the `content` directory. You can use CommonMark to write
fresh content. Every release artifact should be linked to the corresponding
[GitHub release](https://github.com/ringo/ringojs/releases/). 

## Build and run

The commands below use [Podman](https://podman.io/) as container runtime.

```
podman build -t ringojs/website .
podman run -p 8080:8080 --rm -v $(pwd):/var/website:ro ringojs/website
```

The website is then available at [http://localhost:8080](http://localhost:8080).
On Linux hosts with SELinux enabled, use `-v $(pwd):/var/website:ro,Z` instead.
On macOS, make sure the Podman machine is running (`podman machine start`).
