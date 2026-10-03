# Dart Client SDK pack

A typed Dart client SDK for the application's HTTP API.

## Use it

```yaml
packs:
  dart:
    source:
      type: git
      repository: https://github.com/dryvcode/packs
      revision: clients/dart-client-sdk/v0.1.0
      path: packs/clients/dart-client-sdk
    destinations:
      source:
        $ref: "#/destinations/<your destination>"
```
