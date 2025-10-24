import 'package:geolocator/geolocator.dart';
import '../constants.dart';

/// Service for handling location-related operations
class LocationService {
  /// Request location permissions
  Future<bool> requestPermission() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Check if location services are enabled
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      throw LocationServiceException(AppConstants.locationServicesDisabled);
    }

    // Check permission status
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        throw LocationPermissionException(
          AppConstants.locationPermissionDenied,
        );
      }
    }

    if (permission == LocationPermission.deniedForever) {
      throw LocationPermissionException(
        AppConstants.locationPermissionDeniedForever,
      );
    }

    return true;
  }

  /// Get current position
  Future<Position> getCurrentPosition() async {
    try {
      return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );
    } catch (e) {
      throw LocationServiceException('Erro ao obter localização: $e');
    }
  }

  /// Calculate distance between two coordinates
  double calculateDistance(
    double startLatitude,
    double startLongitude,
    double endLatitude,
    double endLongitude,
  ) {
    return Geolocator.distanceBetween(
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
    );
  }

  /// Check if position is within workplace radius
  bool isWithinWorkplaceRadius(Position position) {
    final distance = calculateDistance(
      position.latitude,
      position.longitude,
      AppConstants.workplaceLatitude,
      AppConstants.workplaceLongitude,
    );
    return distance <= AppConstants.maxDistanceMeters;
  }

  /// Get distance to workplace
  double getDistanceToWorkplace(Position position) {
    return calculateDistance(
      position.latitude,
      position.longitude,
      AppConstants.workplaceLatitude,
      AppConstants.workplaceLongitude,
    );
  }
}

/// Exception for location service errors
class LocationServiceException implements Exception {
  final String message;
  LocationServiceException(this.message);

  @override
  String toString() => message;
}

/// Exception for location permission errors
class LocationPermissionException implements Exception {
  final String message;
  LocationPermissionException(this.message);

  @override
  String toString() => message;
}
