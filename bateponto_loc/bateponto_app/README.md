# Registro de Ponto - Flutter App

Um aplicativo Flutter para registro de ponto com autenticação biométrica e geolocalização.

## Funcionalidades

- ✅ Autenticação com NIF e senha
- ✅ Autenticação biométrica (impressão digital/face)
- ✅ Registro de ponto com validação de localização
- ✅ Histórico de registros
- ✅ Interface responsiva e acessível
- ✅ Arquitetura limpa com serviços e providers

## Tecnologias Utilizadas

- **Flutter**: Framework para desenvolvimento mobile
- **Firebase**: Autenticação e banco de dados
- **Geolocator**: Obtenção de localização GPS
- **Local Auth**: Autenticação biométrica
- **Provider**: Gerenciamento de estado

## Estrutura do Projeto

```
lib/
├── constants.dart          # Constantes da aplicação
├── firebase_options.dart   # Configuração Firebase
├── main.dart              # Ponto de entrada
├── models/
│   └── checkin_model.dart # Modelo de dados do check-in
├── providers/
│   └── auth_provider.dart # Provider de autenticação
├── screens/
│   ├── login_screen.dart  # Tela de login
│   └── checkin_screen.dart # Tela de registro de ponto
└── services/
    ├── checkin_service.dart # Serviço de check-in
    └── location_service.dart # Serviço de localização
```

## Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Authentication e Firestore
3. Configure os métodos de autenticação (Email/Password)
4. Baixe o arquivo `google-services.json` (Android) e `GoogleService-Info.plist` (iOS)
5. Execute `flutterfire configure` para gerar `firebase_options.dart`

## Instalação e Execução

1. **Clone o repositório:**
   ```bash
   git clone <repository-url>
   cd bateponto_app
   ```

2. **Instale as dependências:**
   ```bash
   flutter pub get
   ```

3. **Configure o Firebase:**
   - Copie `google-services.json` para `android/app/`
   - Copie `GoogleService-Info.plist` para `ios/Runner/`
   - Atualize `lib/firebase_options.dart` com suas chaves

4. **Execute o aplicativo:**
   ```bash
   flutter run
   ```

## Testes

Execute os testes com:
```bash
flutter test
```

## Análise de Código

Verifique a qualidade do código:
```bash
flutter analyze
```

## Boas Práticas Implementadas

### Arquitetura
- **Separação de responsabilidades**: Services, Providers, Models
- **Injeção de dependências**: Services injetados nos providers
- **Gerenciamento de estado**: Provider pattern

### Código
- **Linting rigoroso**: Regras estritas no `analysis_options.yaml`
- **Tratamento de erros**: Exceções customizadas e mensagens claras
- **Validação de entrada**: Form validation com feedback visual
- **Constantes centralizadas**: Todas as strings e valores em `constants.dart`

### UI/UX
- **Design responsivo**: Layout adaptável a diferentes telas
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado
- **Feedback visual**: Loading states, error messages, success indicators
- **Material Design 3**: Componentes modernos e consistentes

### Segurança
- **Autenticação robusta**: Validação de credenciais e biometria
- **Validação de localização**: Verificação de proximidade ao local de trabalho
- **Tratamento seguro de dados**: Sanitização de inputs

## Desenvolvimento

### Adicionando Novos Recursos

1. **Models**: Crie classes em `lib/models/` para novos tipos de dados
2. **Services**: Implemente lógica de negócio em `lib/services/`
3. **Providers**: Use providers para estado compartilhado
4. **Screens**: Mantenha a UI limpa e delegue lógica para services/providers

### Testes

- **Unit tests**: Para models e services
- **Widget tests**: Para componentes UI
- **Integration tests**: Para fluxos completos

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
