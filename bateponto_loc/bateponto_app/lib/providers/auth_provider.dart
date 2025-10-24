import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:local_auth/local_auth.dart';
import '../constants.dart';

/// Provider for managing authentication state and operations
class AuthProvider with ChangeNotifier {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final LocalAuthentication _localAuth = LocalAuthentication();

  User? _user;
  bool _isBiometricAvailable = false;
  bool _isLoading = false;
  String? _errorMessage;

  // Getters
  User? get user => _user;
  bool get isBiometricAvailable => _isBiometricAvailable;
  bool get isLoading => _isLoading;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _user != null;

  AuthProvider() {
    _auth.authStateChanges().listen((User? user) {
      _user = user;
      notifyListeners();
    });
    _checkBiometricAvailability();
  }

  Future<void> _checkBiometricAvailability() async {
    try {
      _isBiometricAvailable = await _localAuth.isDeviceSupported();
      notifyListeners();
    } catch (e) {
      _isBiometricAvailable = false;
      _errorMessage = 'Erro ao verificar disponibilidade de biometria: $e';
      notifyListeners();
    }
  }

  /// Authenticate using biometrics
  Future<bool> authenticateWithBiometrics() async {
    if (!_isBiometricAvailable) {
      _errorMessage = 'Autenticação biométrica não disponível';
      notifyListeners();
      return false;
    }

    _setLoading(true);
    try {
      final authenticated = await _localAuth.authenticate(
        localizedReason: AppConstants.biometricReason,
      );
      _setLoading(false);
      return authenticated;
    } catch (e) {
      _setLoading(false);
      _errorMessage = 'Erro na autenticação biométrica: $e';
      notifyListeners();
      return false;
    }
  }

  /// Sign in with NIF and password
  Future<bool> signInWithEmailAndPassword(String nif, String password) async {
    if (nif.isEmpty || password.isEmpty) {
      _errorMessage = 'NIF e senha são obrigatórios';
      notifyListeners();
      return false;
    }

    _setLoading(true);
    try {
      await _auth.signInWithEmailAndPassword(
        email: '$nif${AppConstants.emailDomain}',
        password: password,
      );
      _setLoading(false);
      _errorMessage = null;
      return true;
    } on FirebaseAuthException catch (e) {
      _setLoading(false);
      _errorMessage = _getAuthErrorMessage(e);
      notifyListeners();
      return false;
    } catch (e) {
      _setLoading(false);
      _errorMessage = 'Erro inesperado: $e';
      notifyListeners();
      return false;
    }
  }

  /// Sign up with NIF and password
  Future<bool> signUpWithEmailAndPassword(String nif, String password) async {
    if (nif.isEmpty || password.isEmpty) {
      _errorMessage = 'NIF e senha são obrigatórios';
      notifyListeners();
      return false;
    }

    if (password.length < 6) {
      _errorMessage = 'A senha deve ter pelo menos 6 caracteres';
      notifyListeners();
      return false;
    }

    _setLoading(true);
    try {
      await _auth.createUserWithEmailAndPassword(
        email: '$nif${AppConstants.emailDomain}',
        password: password,
      );
      _setLoading(false);
      _errorMessage = null;
      return true;
    } on FirebaseAuthException catch (e) {
      _setLoading(false);
      _errorMessage = _getAuthErrorMessage(e);
      notifyListeners();
      return false;
    } catch (e) {
      _setLoading(false);
      _errorMessage = 'Erro inesperado: $e';
      notifyListeners();
      return false;
    }
  }

  /// Sign out current user
  Future<void> signOut() async {
    _setLoading(true);
    try {
      await _auth.signOut();
      _errorMessage = null;
    } catch (e) {
      _errorMessage = 'Erro ao fazer logout: $e';
    } finally {
      _setLoading(false);
    }
  }

  /// Clear error message
  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  void _setLoading(bool loading) {
    _isLoading = loading;
    notifyListeners();
  }

  String _getAuthErrorMessage(FirebaseAuthException e) {
    switch (e.code) {
      case 'user-not-found':
        return 'Usuário não encontrado. Verifique o NIF.';
      case 'wrong-password':
        return 'Senha incorreta.';
      case 'email-already-in-use':
        return 'Este NIF já está cadastrado.';
      case 'weak-password':
        return 'A senha é muito fraca.';
      case 'invalid-email':
        return 'Formato de NIF inválido.';
      case 'user-disabled':
        return 'Esta conta foi desabilitada.';
      case 'too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde.';
      default:
        return 'Erro de autenticação: ${e.message}';
    }
  }
}
