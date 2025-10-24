import 'package:flutter_test/flutter_test.dart';
import 'package:bateponto_app/models/checkin_model.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

void main() {
  group('CheckinModel', () {
    final testTimestamp = DateTime(2024, 1, 1, 12, 0, 0);
    final testData = {
      'userId': 'test-user-id',
      'timestamp': Timestamp.fromDate(testTimestamp),
      'latitude': -22.5647,
      'longitude': -47.4017,
      'distance': 50.0,
    };

    test('fromFirestore creates correct model', () {
      final doc = MockDocumentSnapshot(testData);
      final model = CheckinModel.fromFirestore(doc);

      expect(model.id, 'test-doc-id');
      expect(model.userId, 'test-user-id');
      expect(model.timestamp, testTimestamp);
      expect(model.latitude, -22.5647);
      expect(model.longitude, -47.4017);
      expect(model.distance, 50.0);
    });

    test('toFirestore returns correct data', () {
      final model = CheckinModel(
        id: 'test-id',
        userId: 'test-user-id',
        timestamp: testTimestamp,
        latitude: -22.5647,
        longitude: -47.4017,
        distance: 50.0,
      );

      final data = model.toFirestore();

      expect(data['userId'], 'test-user-id');
      expect(data['latitude'], -22.5647);
      expect(data['longitude'], -47.4017);
      expect(data['distance'], 50.0);
      // timestamp will be server timestamp
    });

    test('copyWith creates new instance with updated fields', () {
      final original = CheckinModel(
        id: 'original-id',
        userId: 'original-user',
        timestamp: testTimestamp,
        latitude: -22.5647,
        longitude: -47.4017,
        distance: 50.0,
      );

      final copy = original.copyWith(id: 'new-id', distance: 75.0);

      expect(copy.id, 'new-id');
      expect(copy.userId, 'original-user');
      expect(copy.distance, 75.0);
      expect(copy.latitude, -22.5647);
    });

    test('equality and hashCode', () {
      final model1 = CheckinModel(
        id: 'id1',
        userId: 'user1',
        timestamp: testTimestamp,
        latitude: -22.5647,
        longitude: -47.4017,
        distance: 50.0,
      );

      final model2 = CheckinModel(
        id: 'id1',
        userId: 'user1',
        timestamp: testTimestamp,
        latitude: -22.5647,
        longitude: -47.4017,
        distance: 50.0,
      );

      final model3 = CheckinModel(
        id: 'id2',
        userId: 'user1',
        timestamp: testTimestamp,
        latitude: -22.5647,
        longitude: -47.4017,
        distance: 50.0,
      );

      expect(model1, equals(model2));
      expect(model1.hashCode, equals(model2.hashCode));
      expect(model1, isNot(equals(model3)));
    });

    test('toString returns meaningful representation', () {
      final model = CheckinModel(
        id: 'test-id',
        userId: 'test-user',
        timestamp: testTimestamp,
        latitude: -22.5647,
        longitude: -47.4017,
        distance: 50.0,
      );

      final string = model.toString();
      expect(string, contains('test-id'));
      expect(string, contains('test-user'));
      expect(string, contains('-22.5647'));
      expect(string, contains('-47.4017'));
      expect(string, contains('50.0'));
    });
  });
}

// Mock DocumentSnapshot for testing
class MockDocumentSnapshot implements DocumentSnapshot {
  final Map<String, dynamic> _data;

  MockDocumentSnapshot(this._data);

  @override
  String get id => 'test-doc-id';

  @override
  Map<String, dynamic> data() => _data;

  @override
  dynamic operator [](Object field) => _data[field];

  @override
  bool get exists => true;

  @override
  DocumentReference get reference => throw UnimplementedError();

  @override
  SnapshotMetadata get metadata => throw UnimplementedError();

  @override
  dynamic get(Object field) => _data[field];
}
