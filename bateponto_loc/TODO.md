# TODO List for Flutter Check-in App (Registro de Ponto)

## 1. Project Setup
- [x] Create new Flutter project in current directory
- [x] Add necessary dependencies (firebase_core, firebase_auth, cloud_firestore, geolocator, local_auth, provider for state management)

## 2. Firebase Configuration
- [x] Guide user to create Firebase project and add Android/iOS apps
- [x] Add google-services.json (Android) and GoogleService-Info.plist (iOS) to project
- [x] Initialize Firebase in main.dart

## 3. Authentication Implementation
- [x] Create login screen with NIF/password fields
- [x] Implement biometric authentication using local_auth
- [x] Integrate Firebase Auth for user authentication
- [x] Handle authentication states (login, logout)

## 4. Geolocation Feature
- [x] Implement location permission request
- [x] Get current user location using geolocator
- [x] Calculate distance from workplace (Limeira, SP: -22.5647, -47.4017)
- [x] Check if within 100m radius

## 5. Check-in Functionality
- [x] Create check-in screen
- [x] Record date, time, location if within range
- [x] Store data in Firestore (user ID, timestamp, location)
- [x] Display success/failure messages

## 6. UI/UX Development
- [x] Design login screen
- [x] Design check-in screen
- [x] Design history screen to view past check-ins
- [x] Implement navigation between screens
- [x] Ensure responsive design

## 7. State Management
- [x] Use Provider for managing authentication and check-in states

## 8. Testing
- [x] Test authentication (NIF/password and biometrics)
- [x] Test geolocation accuracy
- [x] Test check-in within/outside radius
- [x] Test data storage in Firebase

## 9. Documentation
- [x] Write README with installation and usage instructions
- [x] Document Firebase setup
- [x] Explain code structure and decisions

## 10. Apply Mobile Development Best Practices
- [x] Create firebase_options.dart for proper Firebase initialization
- [x] Extract constants to dedicated file (lib/constants.dart)
- [x] Create service classes (LocationService, CheckinService)
- [x] Create data models (CheckinModel)
- [x] Improve error handling and user feedback
- [x] Add input validation in forms
- [x] Refactor screens for better separation of concerns
- [x] Add comprehensive tests
- [x] Enhance linting rules
- [x] Implement responsive design and accessibility
- [x] Update README with best practices applied
