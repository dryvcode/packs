import 'package:flutter_test/flutter_test.dart';
import 'package:admin_console/api.dart';

void main() {
  test('models round-trip through JSON with enum wire values', () {
    final profile = UserProfile.fromJson(<String, dynamic>{
      'id': 'u1',
      'displayName': 'Ada',
      'externalCustomerId': 'c1',
      'status': 'active',
      'createdAt': '2026-10-03T10:00:00.000Z',
    });
    expect(profile.status, UserStatus.active);
    expect(profile.toJson()['status'], 'active');
    expect(profile.toJson()['displayName'], 'Ada');
  });

  test('endpoint registries interpolate path parameters', () {
    const routes = CoreEndpoints();
    expect(routes.listUsers, '/users');
    expect(routes.getUser(id: '42'), '/users/42');
  });

  test('the facade exposes the typed client', () {
    expect(AdminConsole.connectionKey, 'admin_console');
  });
}
