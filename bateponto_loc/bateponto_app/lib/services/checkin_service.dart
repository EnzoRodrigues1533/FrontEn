import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:geolocator/geolocator.dart';
import '../constants.dart';
import '../models/checkin_model.dart';
import 'location_service.dart';

/// Service for handling check-in operations
class CheckinService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;
  final LocationService _locationService = LocationService();

  /// Perform a check-in operation
  Future<CheckinModel> performCheckin(String userId) async {
    // Request location permission
    await _locationService.requestPermission();

    // Get current position
    final position = await _locationService.getCurrentPosition();

    // Check if within workplace radius
    if (!_locationService.isWithinWorkplaceRadius(position)) {
      final distance = _locationService.getDistanceToWorkplace(position);
      throw CheckinException(
        'Você está fora do alcance do local de trabalho (${distance.toStringAsFixed(2)}m).',
      );
    }

    // Calculate distance
    final distance = _locationService.getDistanceToWorkplace(position);

    // Create check-in data
    final checkinData = {
      'userId': userId,
      'timestamp': FieldValue.serverTimestamp(),
      'latitude': position.latitude,
      'longitude': position.longitude,
      'distance': distance,
    };

    try {
      // Save to Firestore
      final docRef = await _firestore
          .collection(AppConstants.checkinsCollection)
          .add(checkinData);

      // Return the created check-in model
      return CheckinModel(
        id: docRef.id,
        userId: userId,
        timestamp: DateTime.now(), // Will be updated with server timestamp
        latitude: position.latitude,
        longitude: position.longitude,
        distance: distance,
      );
    } catch (e) {
      throw CheckinException('${AppConstants.checkinError}$e');
    }
  }

  /// Get check-ins for a user
  Stream<List<CheckinModel>> getUserCheckins(String userId) {
    return _firestore
        .collection(AppConstants.checkinsCollection)
        .where('userId', isEqualTo: userId)
        .orderBy('timestamp', descending: true)
        .snapshots()
        .map((snapshot) {
          return snapshot.docs
              .map((doc) => CheckinModel.fromFirestore(doc))
              .toList();
        });
  }

  /// Get check-in by ID
  Future<CheckinModel?> getCheckinById(String checkinId) async {
    try {
      final doc = await _firestore
          .collection(AppConstants.checkinsCollection)
          .doc(checkinId)
          .get();

      if (doc.exists) {
        return CheckinModel.fromFirestore(doc);
      }
      return null;
    } catch (e) {
      throw CheckinException('Erro ao buscar check-in: $e');
    }
  }

  /// Delete a check-in
  Future<void> deleteCheckin(String checkinId) async {
    try {
      await _firestore
          .collection(AppConstants.checkinsCollection)
          .doc(checkinId)
          .delete();
    } catch (e) {
      throw CheckinException('Erro ao deletar check-in: $e');
    }
  }
}

/// Exception for check-in operations
class CheckinException implements Exception {
  final String message;
  CheckinException(this.message);

  @override
  String toString() => message;
}
