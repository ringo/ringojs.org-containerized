# Changelog for RingoJS 4.1.0

Release date: 5 November 2026

This is a maintenance and security release on the Jetty 11 line. It fixes several issues in the HTTP utilities, the default error page and `ringo-admin install`. It also adds stricter error handling in production mode. All users of RingoJS 1.x / 2.x / 3.x / 4.0 should upgrade. RingoJS still **requires at least Java 11**, and the bytecode now targets Java 11 too.

## What's Changed

* Hide error details in production mode. When started with `--production`, Ringo no longer shows exception details to clients. It still writes them to `System.err`. The production mode flag is now also available in `RingoConfig`.
* Enforce the string type on HTTP header values.
* Correctly encode multipart form data submissions in `ringo/httpclient`.
* Fix a memory leak in `response.range()`.
* `parseFileUpload()` now cleans up temporary files in all cases.
* Raise the Java compile target to 11 and update the Docker images.
* Improve tests.

## Security

* Fixed a reflected XSS in the default 500 error page of `JsgiServlet`. Exception messages, source names and script stack traces are now HTML-escaped. ([GHSA-h5gw-cfqp-g4qw](https://github.com/ringo/ringojs/security/advisories/GHSA-h5gw-cfqp-g4qw))

## Contributors

* Philipp Naderer-Puiu (with the help of Claude)

**Full Changelog:** [v4.0.0...v4.1.0](https://github.com/ringo/ringojs/compare/v4.0.0...v4.1.0)
