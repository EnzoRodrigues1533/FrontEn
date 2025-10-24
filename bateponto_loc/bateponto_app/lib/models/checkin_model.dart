import 'package:cloud_firestore/cloud_firestore.dart';

/// Model representing a check-in record
class CheckinModel {
  final String id;
  final String userId;
  final DateTime timestamp;
  final double latitude;
  final double longitude;
  final double distance;

  CheckinModel({
    required this.id,
    required this.userId,
    required this.timestamp,
    required this.latitude,
    required this.longitude,
    required this.distance,
  });

  /// Create a CheckinModel from Firestore document
  factory CheckinModel.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return CheckinModel(
      id: doc.id,
      userId: data['userId'] as String,
      timestamp: (data['timestamp'] as Timestamp).toDate(),
      latitude: data['latitude'] as double,
      longitude: data['longitude'] as double,
      distance: data['distance'] as double,
    );
  }

  /// Convert to Firestore data
  Map<String, dynamic> toFirestore() {
    return {
      'userId': userId,
      'timestamp': FieldValue.serverTimestamp(),
      'latitude': latitude,
      'longitude': longitude,
      'distance': distance,
    };
  }

  /// Create a copy with updated fields
  CheckinModel copyWith({
    String? id,
    String? userId,
    DateTime? timestamp,
    double? latitude,
    double? longitude,
    double? distance,
  }) {
    return CheckinModel(
      id: id ?? this.id,
      userId: userId ?? this.userId,
      timestamp: timestamp ?? this.timestamp,
      latitude: latitude ?? this.latitude,
      longitude: longitude ?? this.longitude,
      distance: distance ?? this.distance,
    );
  }

  @override
  String toString() {
    return 'CheckinModel(id: $id, userId: $userId, timestamp: $timestamp, lat: $latitude, lng: $longitude, distance: $distance)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is CheckinModel &&
        other.id == id &&
        other.userId == userId &&
        other.timestamp == timestamp &&
        other.latitude == latitude &&
        other.longitude == longitude &&
        other.distance == distance;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        userId.hashCode ^
        timestamp.hashCode ^
        latitude.hashCode ^
        longitude.hashCode ^
        distance.hashCode;
  }
}
