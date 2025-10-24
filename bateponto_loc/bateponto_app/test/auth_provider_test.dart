import 'package:flutter_test/flutter_test.dart';
import 'package:bateponto_app/providers/auth_provider.dart';

void main() {
  group('AuthProvider', () {
    late AuthProvider authProvider;

    setUp(() {
      authProvider = AuthProvider();
    });

    test('initial state', () {
      expect(authProvider.user, isNull);
      expect(authProvider.isBiometricAvailable, isFalse);
      expect(authProvider.isLoading, isFalse);
      expect(authProvider.errorMessage, isNull);
      expect(authProvider.isAuthenticated, isFalse);
    });

    test('clearError clears error message', () {
      // Simulate an error
      authProvider.clearError();
      expect(authProvider.errorMessage, isNull);
    });

    test('signInWithEmailAndPassword validation', () async {
      // Test empty NIF
      final result1 = await authProvider.signInWithEmailAndPassword(
        '',
        'password',
      );
      expect(result1, isFalse);
      expect(authProvider.errorMessage, 'NIF e senha são obrigatórios');

      // Test empty password
      final result2 = await authProvider.signInWithEmailAndPassword('123', '');
      expect(result2, isFalse);
      expect(authProvider.errorMessage, 'NIF e senha são obrigatórios');

      // Test short NIF
      final result3 = await authProvider.signInWithEmailAndPassword(
        '12',
        'password',
      );
      expect(result3, isFalse);
      expect(authProvider.errorMessage, 'NIF deve ter pelo menos 3 dígitos');
    });

    test('signUpWithEmailAndPassword validation', () async {
      // Test empty NIF
      final result1 = await authProvider.signUpWithEmailAndPassword(
        '',
        'password',
      );
      expect(result1, isFalse);
      expect(authProvider.errorMessage, 'NIF e senha são obrigatórios');

      // Test empty password
      final result2 = await authProvider.signUpWithEmailAndPassword('123', '');
      expect(result2, isFalse);
      expect(authProvider.errorMessage, 'NIF e senha são obrigatórios');

      // Test short password
      final result3 = await authProvider.signUpWithEmailAndPassword(
        '123',
        '12345',
      );
      expect(result3, isFalse);
      expect(
        authProvider.errorMessage,
        'A senha deve ter pelo menos 6 caracteres',
      );
    });
  });
}
