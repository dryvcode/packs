# Dart / Flutter ecosystem

Status: candidate backlog only. Existing coverage is marked complete.

## Existing coverage

- [x] `package/clients/dart-client-sdk`
- [x] `package/clients/flutter-api-bridge`
- [x] `project/frontend/flutter-app`

## Client candidates

- [ ] Dio-based client SDK
- [ ] Retrofit.dart-oriented client research
- [ ] Chopper client research
- [ ] preserve the framework-free Dart SDK as the baseline
- [ ] compare transport abstraction across Dart and Flutter clients
- [ ] typed API error model
- [ ] multipart/file support after context audit
- [ ] streaming support after context audit

## Model/schema candidates

- [ ] json_serializable model package independent of flutter-api-bridge
- [ ] Freezed model package research
- [ ] built_value research
- [ ] form/validation model research
- [ ] reusable enum/type-only package

## Flutter frontend candidates

- [ ] standalone Flutter CRUD forms
- [ ] Riverpod operation providers/hooks
- [ ] Bloc/Cubit operation integration research
- [ ] Provider integration research
- [ ] typed list/detail screen fragments
- [ ] form validation from Dryv field constraints
- [ ] navigation fragments independent of full project generation

Primary models:

- `react-crud-forms`
- `flutter-app`

## Project candidates

- [ ] minimal Flutter app
- [ ] Riverpod Flutter app variant
- [ ] Bloc Flutter app variant
- [ ] Flutter web-focused app research
- [ ] compose client/type packs rather than duplicating API generation
- [ ] configurable package naming and local path bindings
- [ ] generated app testing strategy

## Backend candidates

Dart server support is lower priority but should remain researchable:

- [ ] Dart Frog backend
- [ ] Shelf backend
- [ ] Serverpod compatibility research
- [ ] Shelf project pack

## Other Dart candidates

- [ ] GraphQL client research
- [ ] WebSocket client research
- [ ] gRPC Dart client research
- [ ] OpenTelemetry integration research
- [ ] CLI/package project generation research

## Context questions to verify

- [ ] header/cookie bindings
- [ ] multipart/files
- [ ] streaming
- [ ] authentication/security
- [ ] generic/container outputs
- [ ] UI-specific view semantics before adding richer screen/component packs

Flutter-specific widget or state-management meaning must remain in packs, not Runtime IR.
