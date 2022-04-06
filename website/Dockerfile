# syntax=docker/dockerfile:1
FROM botic/ringojs:latest

EXPOSE 8080
VOLUME /var/website
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get install -y git && \
    mkdir -p /usr/local/ringojs.org/ && \
    cd /usr/local/ringojs.org/ && \
    ringo-admin install --force https://github.com/ringo/simplesite/archive/refs/heads/master.zip

WORKDIR /var/website
CMD ["ringo", "-m", "/usr/local/ringojs.org/packages", "/usr/local/ringojs.org/packages/simplesite/main.js", "--config", "/var/website/config/"]
