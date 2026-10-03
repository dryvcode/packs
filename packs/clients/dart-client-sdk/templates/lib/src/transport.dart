/// How generated API clients reach the server.
///
/// Implement this with `package:http`, `dio`, or a test double. [send]
/// returns the decoded JSON response body, or null when there is none.
abstract interface class DryvTransport {
  Future<Object?> send(
    String method,
    String path, {
    Object? body,
    Map<String, String> query,
  });
}
