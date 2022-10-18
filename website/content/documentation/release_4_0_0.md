# Changelog for RingoJS 4.0.0

Release date: 7 September 2022

This is the first release on the Jetty 11 line.  This brings support for the Servlet 5.0 API, JakartaEE 9 with the `jakartaee.servlet.*` namespace and **requires at least Java 11**.

## What's Changed

* Adds Dockerfile and Github Action to publish main by @botic in [#451](https://github.com/ringo/ringojs/pull/451)
* Updated to Jetty11 by @grob in [#449](https://github.com/ringo/ringojs/pull/449)
* Fixes shell completion by @grob in [#454](https://github.com/ringo/ringojs/pull/454)
* Implements `system.properties`, fixes #456 by @botic in [#457](https://github.com/ringo/ringojs/pull/457)

## Security

* Further updates for [Log4j2](https://logging.apache.org/log4j/2.x/changes-report.html#a2.18.0).
* Updated to latest Jetty 11 to fix [CVE-2022-2191](https://nvd.nist.gov/vuln/detail/CVE-2022-2191).

## Contributors

* Robert Gaggl
* Philipp Naderer-Puiu

**Full Changelog:** [v3.0.0...v4.0.0](https://github.com/ringo/ringojs/compare/v3.0.0...v4.0.0)
