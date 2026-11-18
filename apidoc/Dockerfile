# syntax=docker/dockerfile:1
FROM docker.io/ringojs/ringojs:4.1.0@sha256:bbcd40eca44d367780919ee91fa2e81553259af285528036a12d66b613858b51

VOLUME ["/var/ringojs-modules", "/var/output"]

COPY ./generator/ /usr/local/generator/

WORKDIR /usr/local/generator

# Runs the custom jsdoc module;
# the output folder must contain no existing HTML files!
ENTRYPOINT ["ringo", "main.js", "--file-urls", "--directory", "/var/output/", "--source", "/var/ringojs/modules/", "--templates", "/usr/local/generator/templates/"]

# Uses 'main' as default JSDoc name
CMD ["--name", "main"]
