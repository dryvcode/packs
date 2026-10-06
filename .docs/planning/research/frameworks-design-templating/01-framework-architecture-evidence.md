---
status: draft
updated: 2026-10-06
scope: research-only
---

# Framework architecture evidence

This document records what official framework documentation and native generator systems actually expect. The purpose is not to copy these nouns into Runtime IR. The purpose is to identify implementation patterns a neutral compiler must be capable of realizing.

## 1. NestJS

Nest defines a module as the primary organizational boundary. A module owns providers and controllers, imports other modules, and exports a public provider interface. Official guidance groups closely related controller/service behavior into feature modules.

Official example:

```text
src/
  cats/
    dto/
      create-cat.dto.ts
    interfaces/
      cat.interface.ts
    cats.controller.ts
    cats.module.ts
    cats.service.ts
  app.module.ts
  main.ts
```

Nest testing guidance says applications scaffold unit tests and end-to-end tests. E2E tests conventionally live in `test/` and use an `.e2e-spec` suffix.

The Nest CLI is especially important for Dryv research. `nest generate` does not only emit one source file. Its schematics include application, library, controller, decorator, filter, gateway, guard, interface, interceptor, middleware, module, pipe, provider, resolver, resource and service, and the CLI explicitly describes generation as creating **and/or modifying** files.

### What this proves

- One canonical feature can require a family of implementation artifacts.
- Registration/composition is real implementation work: controllers/providers are assembled into modules, modules into the root application graph.
- Tests are part of the framework's expected generated development surface.
- Guard/filter/interceptor/pipe are implementation mechanisms, not necessarily new Dryv semantic subjects.
- A pack may legitimately generate several implementation artifacts from the same selected semantic subjects.

### Pressure on current Dryv

The current Nest pack selects HTTP operations with `scope: collects.feature` and emits controller, abstract service contract and dynamic module in one template file. This works, but it means one registry entry is carrying three separate implementation responsibilities. That is legal, yet it reduces independent artifact composition and testing choices.

## 2. Spring Boot and Spring Modulith

Spring Boot deliberately does **not** require one source layout. It recommends placing the main application class in a root package above other classes because `@SpringBootApplication` influences component/entity scanning.

Official Spring Boot example:

```text
com/example/myapplication/
  MyApplication.java
  customer/
    Customer.java
    CustomerController.java
    CustomerService.java
    CustomerRepository.java
  order/
    Order.java
    OrderController.java
    OrderService.java
    OrderRepository.java
```

Spring Modulith provides stronger semantic architecture evidence. It defines an application module as a unit of functionality with:

- a provided interface;
- internal implementation components;
- required interfaces to other modules.

It can verify no cyclic module dependencies, enforce access through published APIs, and enforce explicitly allowed dependencies. It also supports module-scoped integration tests and can document module relationships, aggregate roots, events and configuration properties.

Spring Initializr gives generator-system evidence. Its generator starts from a `ProjectDescription` containing project coordinates, build system, packaging, language, configuration format, platform version and requested dependencies. Generation candidates are activated conditionally for that description and contributors produce the resulting project assets.

### What this proves

- A framework may intentionally allow multiple valid filesystem organizations.
- Semantic module boundaries and implementation package boundaries are related but not identical.
- Dependency/public-interface topology matters as much as generated file content.
- Project generation context includes implementation configuration that is not domain semantics.
- Generator activation is commonly conditional on a normalized project description rather than templates inspecting raw input.

## 3. Flutter

Flutter's current architecture guidance strongly recommends separating UI and data layers, using Views + ViewModels in the UI layer and Repositories + Services in the data layer. A domain/use-case layer is conditional for sufficiently complex logic.

The architecture case study gives a concrete large-app package organization:

```text
lib/
  ui/
    core/
      ui/
      themes/
    <feature>/
      view_models/
      widgets/
  domain/
    models/
  data/
    repositories/
    services/
    model/
  config/
  utils/
  routing/
  main_staging.dart
  main_development.dart
  main.dart
test/
  data/
  domain/
  ui/
  utils/
testing/
  fakes/
  models/
```

The guide explicitly says there is no single mandatory layout: the recommended architecture combines organization by feature and by architectural type because data objects can serve multiple features while UI objects are feature-specific.

Testing guidance distinguishes unit, widget and integration tests. Flutter recommends unit tests for services, repositories and ViewModels, widget tests for views, and enough integration tests to cover important use cases.

### What this proves

- The same semantic View can produce screen/widget code, state-management code, routing contributions and tests.
- A schema/operation alone is insufficient to decide repository/service boundaries; these are implementation architecture choices.
- Test topology may mirror source topology while also requiring a separate reusable testing-support package.
- Environment-specific entrypoints and configuration are implementation/project concerns, not semantic application meaning.

## 4. Angular

Angular's style guide recommends organizing source by **feature areas**, not by global technical type directories such as `components`, `directives` and `services`. It recommends one concept per file and colocated `.spec.ts` unit tests.

Angular Schematics are stronger evidence for generation behavior. A schematic operates on a virtual `Tree` containing a base workspace plus staged changes. Rules transform that tree. Supported action classes include Create, Rename, Overwrite and Delete. A merge strategy controls how staged changes combine with the base.

### What this proves

- Framework conventions can conflict directly: Flutter's data layer is commonly type-oriented while Angular strongly prefers feature-oriented organization. Dryv cannot prescribe either.
- Generators often operate over a virtual planned filesystem before applying changes.
- Existing-file updates are a real generator capability, but Dryv must not copy this as hidden mutation because Dryv's architecture requires deterministic plans and client-owned workspace application.

## 5. Next.js

Next.js is important because filesystem shape is executable framework meaning. Current App Router conventions include special files such as `page`, `layout`, `loading`, `error`, `not-found`, `route`, `default`, metadata files and instrumentation/proxy files.

Directory syntax can also alter routing behavior:

```text
app/
  blog/
    [slug]/
      page.tsx
  (marketing)/
    about/
      page.tsx
  @analytics/
    page.tsx
  (..)photo/
    page.tsx
```

`[slug]` is a dynamic segment; `(group)` organizes routes without affecting the URL; `@slot` creates a parallel route slot; intercepting-route syntax such as `(..)` has route semantics that differ from normal filesystem parent traversal.

### What this proves

- Generated paths cannot be treated as cosmetic output locations.
- A generic planner must safely preserve punctuation-heavy framework-specific path segments without understanding their meaning.
- Some generated artifact relationships are expressed through **relative placement**, not imports alone.
- Current Dryv View semantics intentionally lack canonical navigation/address meaning, so a Next pack can choose a route convention but cannot faithfully generate an authored navigation model that does not yet exist.

## 6. FastAPI

FastAPI's larger-application guidance uses Python packages, routers, shared dependencies and explicit router inclusion:

```text
app/
  __init__.py
  main.py
  dependencies.py
  routers/
    __init__.py
    items.py
    users.py
  internal/
    __init__.py
    admin.py
```

`APIRouter` groups path operations and can apply prefixes, tags, responses, security/dependency requirements and other behavior to a group. Routers are then explicitly included into the main FastAPI app or another router.

### What this proves

- A semantic group/feature may map naturally to an implementation router, but that mapping is a pack decision.
- Generated child artifacts often require aggregate registration artifacts.
- Group-level transport/policy semantics can become framework-level shared router configuration rather than repeated endpoint code.

## 7. Django

Django distinguishes a **project** from reusable **apps**. `startproject` creates project bootstrap/configuration files such as `manage.py`, settings, URL configuration, ASGI and WSGI entrypoints. `startapp` creates an application package containing application configuration, migrations, models, tests and views.

Representative official project bootstrap:

```text
djangotutorial/
  manage.py
  mysite/
    __init__.py
    settings.py
    urls.py
    asgi.py
    wsgi.py
```

Django testing permits a simple `tests.py`, but for larger suites recommends a `tests/` package split into areas such as `test_models.py`, `test_views.py` and `test_forms.py`.

### What this proves

- Project/package/inject distinctions are real across ecosystems, not a JavaScript-specific Dryv abstraction.
- Activation/registration of reusable application units is a separate concern from their implementation files.
- Test organization scales independently of source organization.

## 8. Rails

Rails generators are intentionally holistic. A resource/scaffold generator can create models, migrations, controllers, views, fixtures and tests and add routes. `--pretend` shows the plan without applying changes.

Rails' generator API exposes operations such as `create_file`, `copy_file`, `insert_into_file`, route updates and command execution. Rails testing separates model/controller/integration/system tests; current guidance reserves expensive system tests for critical user paths rather than generating them indiscriminately.

### What this proves

- A useful generator operates on an **artifact graph**, not isolated source files.
- A single semantic capability can legitimately trigger implementation, database, route and verification artifacts.
- Preview is a first-class generator usability concept and aligns strongly with `dryv plan`.
- Test generation should be selective by semantic risk/behavior, not 'one E2E per thing' by default.

## 9. Laravel

Laravel has a conventional root with `app`, `bootstrap`, `config`, `database`, `public`, `resources`, `routes`, `storage`, `tests` and `vendor`, but official guidance also states that application classes can be organized freely as long as Composer can autoload them.

Many application directories are capability-created rather than mandatory. Examples include Events, Jobs, Listeners, Mail, Notifications, Policies and Rules. Artisan creates these directories only when the corresponding capability is introduced.

### What this proves

- The presence of an implementation directory may itself be conditional on selected semantic capabilities.
- Dryv must distinguish static pack resources from selected/conditional artifact families.
- A pack can offer a strong convention without claiming that the convention is canonical software meaning.

## 10. ASP.NET Core

ASP.NET Core supports several HTTP implementation styles: controllers, Razor Pages, minimal endpoints, gRPC and more. Areas can partition large MVC applications into functionality groups, with conventional folder structure and route registration.

A representative Areas layout is:

```text
Areas/
  Products/
    Controllers/
      HomeController.cs
      ManageController.cs
    Views/
      Home/
        Index.cshtml
      Manage/
        Index.cshtml
```

Integration testing guidance recommends a separate test project referencing the system under test, creating a test web host and submitting requests through a test client.

### What this proves

- Even inside one framework, the same canonical HTTP operation can map to different implementation architectures.
- Framework identity alone is insufficient to choose artifact families; a pack or explicit pack option chooses the implementation style.
- Tests may belong to a sibling package/project rather than the generated implementation's source tree.

## Cross-framework synthesis

| Repeated need | Evidence | Dryv implication |
| --- | --- | --- |
| Feature/capability grouping | Nest modules, Spring modules, Angular features, ASP.NET Areas | Group/Feature meaning is useful, but physical mapping stays pack-owned |
| Aggregation/registration | Nest modules, FastAPI include_router, Rails routes, Django app/project wiring | Planner must model generated aggregates and dependencies cleanly |
| Conditional artifact families | Laravel capability directories, Spring Initializr conditions, CLI generators | Selection must express semantic reasons, not template-side guesses |
| Multiple implementation styles | Spring flexible layout, ASP.NET controllers/minimal APIs, Flutter state choices | Pack/options choose realization; Engine stays neutral |
| Filesystem-significant semantics | Next.js App Router, Java package roots, Python packages | Planner paths must be arbitrary safe relative paths |
| Generated tests | Nest, Flutter, Angular, Rails, Django, ASP.NET | Verification artifacts should be first-class pack output |
| Workspace transformations | Angular Schematics, Rails generators, Nx generators | Dryv needs an explicit composition story, never hidden mutation |
| Project description/config context | Spring Initializr, create/project CLIs | Pack inputs and unit/project context are implementation configuration, not Runtime IR |

## Research conclusion from framework evidence

The correct abstraction is **not** a universal controller/service/model folder taxonomy.

The common abstraction is:

```text
semantic trigger
    ↓
pack-chosen implementation responsibility
    ↓
one or more artifacts
    ↓
explicit relationships / assembly
    ↓
native verification
```

Dryv should expand canonical vocabulary only where the *semantic trigger* is missing. It should expand pack/planner vocabulary where the implementation responsibility or artifact topology is hard to express. It should never encode the framework artifact itself as canonical software meaning.

See [REFERENCES.md](REFERENCES.md) for primary sources.