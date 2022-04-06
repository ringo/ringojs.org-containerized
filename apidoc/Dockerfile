# syntax=docker/dockerfile:1
FROM botic/ringojs:latest

VOLUME ["/var/ringojs-modules", "/var/output"]

COPY ./generator/ /usr/local/generator/

WORKDIR /usr/local/generator

# Runs the custom jsdoc module;
# the output folder must contain no existing HTML files!
ENTRYPOINT ["ringo", "main.js", "--file-urls", "--directory", "/var/output/", "--source", "/var/ringojs/modules/", "--templates", "/usr/local/generator/templates/"]

# Uses 'main' as default JSDoc name
CMD ["--name", "main"]
