# Other language ecosystems

Status: Scala, Clojure and Haskell baselines are implemented on `develop`; remaining languages stay research backlog.

These are not implementation priorities. They exist so the ecosystem map does not quietly become limited to the first few languages Dryv supports.

## Scala

- [x] `package/backend/http4s-backend`
- [x] `package/clients/scala-client-sdk`
- [x] `package/persistence/slick-tables`
- [x] `package/validation/scala-circe-validation`
- [ ] Play Framework backend
- [ ] Pekko HTTP research
- [ ] Doobie persistence
- [ ] Tapir endpoint research
- [ ] ZIO ecosystem research
- [ ] Scala backend project

## Clojure

- [x] `package/backend/reitit-backend` — Reitit/Ring + Muuntaja
- [x] `package/clients/clojure-client-sdk` — JDK HttpClient + Jsonista
- [x] `package/validation/malli-schemas`
- [x] `package/persistence/next-jdbc-models`
- [ ] Pedestal research
- [ ] clojure.spec research
- [ ] HoneySQL research
- [ ] Clojure API project

## Haskell

- [x] `package/backend/scotty-backend` — implementation present; verification deferred
- [x] `package/clients/haskell-client-sdk` — http-client-tls baseline; verification deferred
- [x] `package/persistence/persistent-models` — Persistent 2.18 definitions + migration; verification deferred
- [x] `package/validation/haskell-validation` — shared Aeson models + pure validation; verification deferred
- [x] shared Aeson enum/model vocabulary
- [x] path/query/query-object/header/cookie/body/form binding
- [x] explicit primary/composite keys, unique constraints and foreign lifecycle in Persistent
- [ ] Servant backend/client alternative research
- [ ] Yesod research
- [ ] Beam persistence research
- [ ] Cabal/Stack project pack

## OCaml

- [ ] Dream backend research
- [ ] Cohttp client/server research
- [ ] Yojson models
- [ ] validation strategy
- [ ] Dune package/project layout
- [ ] typed client SDK research

## Zig

- [ ] HTTP client SDK feasibility
- [ ] server framework landscape audit
- [ ] JSON model mapping
- [ ] package/project structure
- [ ] C interop client generation research

## Lua

- [ ] OpenResty backend research
- [ ] Lapis backend research
- [ ] Lua HTTP client SDK
- [ ] schema/validation library audit
- [ ] LuaRocks package layout

## R

- [ ] API client SDK
- [ ] httr2 transport
- [ ] typed/data-frame model strategy
- [ ] plumber backend research

## Julia

- [ ] HTTP.jl client/server research
- [ ] JSON3 models
- [ ] Oxygen/Genie backend research
- [ ] package project layout

## Objective-C

- [ ] client SDK feasibility
- [ ] NSURLSession transport
- [ ] model/serialization strategy
- [ ] interoperability with Swift output

## Dart server ecosystem

Tracked primarily in [07-dart-flutter.md](07-dart-flutter.md), but long-tail server frameworks should remain discoverable.

## General rule

Before promoting any item from this file into an implementation batch:

- [ ] verify the framework/library is healthy and meaningful for real users
- [ ] identify a proven Dryv pack pattern to copy
- [ ] confirm the target has a realistic fixture/toolchain test
- [ ] confirm Runtime IR/context is sufficient
- [ ] prefer a smaller number of high-quality ecosystems over superficial coverage
