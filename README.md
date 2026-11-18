# ringojs.org-containerized

Everything around [RingoJS.org](https://ringojs.org) inside easy to execute containers.

## Requirements

All containers are built and run with [Podman](https://podman.io/). On macOS and Windows,
initialize and start a Podman machine first:

```
podman machine init
podman machine start
```

## `apidoc`

Contains the custom JSDoc parser and generator script for Ringo's JavaScript API documentation.
See [README](./apidoc/README.md) for more details.

## `website`

Contains the content, configuration and static assets of the website, rendered with `ringo/simplesite`.
See [README](./website/README.md) for more details.
