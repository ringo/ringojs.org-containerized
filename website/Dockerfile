# syntax=docker/dockerfile:1
# ringojs/ringojs:4.1.0 (tag omitted: older Podman rejects tag+digest references)
FROM docker.io/ringojs/ringojs@sha256:bbcd40eca44d367780919ee91fa2e81553259af285528036a12d66b613858b51

EXPOSE 8080
VOLUME /var/website
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends git ca-certificates && \
    rm -rf /var/lib/apt/lists/* && \
    mkdir -p /usr/local/ringojs.org/ && \
    cd /usr/local/ringojs.org/ && \
    ringo-admin install --force https://github.com/ringo/simplesite/archive/refs/heads/master.zip

WORKDIR /var/website
CMD ["ringo", "--production", "-Djava.awt.headless=true", "-m", "/usr/local/ringojs.org/packages", "/usr/local/ringojs.org/packages/simplesite/main.js", "--config", "/var/website/config/"]
