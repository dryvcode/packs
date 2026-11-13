# HTTP Examples pack

Generates copy-paste HTTP usage documentation for every Dryv HTTP operation.

Output:

- one Markdown file per HTTP operation with:
  - canonical effective route;
  - binding summary;
  - synthesized example values;
  - raw HTTP request;
  - cURL example;
  - declared success statuses;
- one index linking every generated example.

Generated values are **documentation scaffolding only**. They are derived deterministically from value classifications, defaults and canonical enum values; they are not authored examples and never flow back into Runtime IR.

Multipart requests remain explicitly incomplete because Dryv does not yet expose first-class file-part semantics.

Verification is deferred while the Dryv Engine is under maintenance.
