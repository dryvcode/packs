import 'package:admin_console_app/presentation/routers/constants/user_management_screens.dart';
import 'package:admin_console_app/presentation/screens/user_management/users_view_providers.dart';
import 'package:admin_console_app/presentation/widgets/dryv_form.dart';
import 'package:flutter/material.dart';
import 'package:flutter_api_bridge/flutter_api_bridge.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  test('routes follow /<group>/<view>', () {
    expect(UserManagementScreensRoutes.usersView, '/core/users-view');
  });

  test('form fields come from the input schema', () {
    final names = usersViewCreateUserFields.map((field) => field.name).toList();
    expect(names, isNotEmpty);
    expect(usersViewCreateUserFields.every((field) => field.label.isNotEmpty), isTrue);
  });

  testWidgets('a generated form validates required fields and submits JSON values', (tester) async {
    Map<String, Object?>? submitted;
    await tester.pumpWidget(MaterialApp(
      home: Scaffold(
        body: DryvForm(
          fields: const [DryvField(name: 'displayName', label: 'Display name', kind: DryvFieldKind.text, required: true)],
          onSubmit: (values) async {
            submitted = values;
            return const ApiSuccess<Object?>(message: 'ok', statusCode: 201);
          },
        ),
      ),
    ));
    await tester.tap(find.text('Submit'));
    await tester.pump();
    expect(find.text('Display name is required'), findsOneWidget);
    await tester.enterText(find.byType(TextFormField), 'Ada');
    await tester.tap(find.text('Submit'));
    await tester.pumpAndSettle();
    expect(submitted, {'displayName': 'Ada'});
  });
}
