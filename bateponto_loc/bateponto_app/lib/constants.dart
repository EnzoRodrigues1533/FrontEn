/// Application constants
class AppConstants {
  // Workplace location (Limeira, SP)
  static const double workplaceLatitude = -22.5647;
  static const double workplaceLongitude = -47.4017;
  static const double maxDistanceMeters = 100.0;

  // Firebase collection names
  static const String checkinsCollection = 'checkins';

  // Authentication
  static const String emailDomain = '@empresa.com';

  // UI Constants
  static const double defaultPadding = 16.0;
  static const double borderRadius = 8.0;

  // Messages
  static const String locationServicesDisabled =
      'Serviços de localização estão desabilitados.';
  static const String locationPermissionDenied =
      'Permissões de localização negadas.';
  static const String locationPermissionDeniedForever =
      'Permissões de localização permanentemente negadas.';
  static const String locationNotAvailable = 'Localização não disponível.';
  static const String userNotAuthenticated = 'Usuário não autenticado.';
  static const String checkinSuccess = 'Ponto registrado com sucesso!';
  static const String checkinError = 'Erro ao registrar ponto: ';
  static const String biometricReason = 'Autentique-se para registrar o ponto';
  static const String loginTitle = 'Login - Registro de Ponto';
  static const String checkinTitle = 'Registro de Ponto';
  static const String nifLabel = 'NIF';
  static const String passwordLabel = 'Senha';
  static const String loginWithCredentialsButton = 'Entrar com NIF e Senha';
  static const String loginWithBiometricsButton = 'Entrar com Biometria';
  static const String checkinButton = 'Registrar Ponto';
  static const String logoutTooltip = 'Logout';

  // Signup strings
  static const String signupTitle = 'Criar Conta';
  static const String signupSubtitle = 'Registre-se para acessar o sistema';
  static const String nifHint = 'Digite seu NIF (ex: 123)';
  static const String passwordHint = 'Digite sua senha';
  static const String confirmPasswordLabel = 'Confirmar Senha';
  static const String confirmPasswordHint = 'Digite a senha novamente';
  static const String nifRequired = 'NIF é obrigatório';
  static const String nifTooShort = 'NIF deve ter pelo menos 3 dígitos';
  static const String passwordRequired = 'Senha é obrigatória';
  static const String passwordTooShort =
      'A senha deve ter pelo menos 6 caracteres';
  static const String confirmPasswordRequired =
      'Confirmação de senha é obrigatória';
  static const String passwordsDontMatch = 'As senhas não coincidem';
  static const String signupButton = 'Criar Conta';
  static const String signupSuccess = 'Conta criada com sucesso!';
  static const String alreadyHaveAccount = 'Já tem uma conta?';
  static const String loginButton = 'Fazer Login';
}
