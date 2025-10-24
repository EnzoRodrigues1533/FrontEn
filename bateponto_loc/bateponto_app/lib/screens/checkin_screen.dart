import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:provider/provider.dart';
import '../constants.dart';
import '../models/checkin_model.dart';
import '../providers/auth_provider.dart';
import '../services/checkin_service.dart';
import '../services/location_service.dart';

class CheckinScreen extends StatefulWidget {
  const CheckinScreen({super.key});

  @override
  State<CheckinScreen> createState() => _CheckinScreenState();
}

class _CheckinScreenState extends State<CheckinScreen> {
  final CheckinService _checkinService = CheckinService();
  final LocationService _locationService = LocationService();

  Position? _currentPosition;
  bool _isLoadingLocation = false;
  bool _isCheckingIn = false;
  String? _message;

  @override
  void initState() {
    super.initState();
    _initializeLocation();
  }

  Future<void> _initializeLocation() async {
    setState(() => _isLoadingLocation = true);
    try {
      await _locationService.requestPermission();
      final position = await _locationService.getCurrentPosition();
      if (mounted) {
        setState(() {
          _currentPosition = position;
          _isLoadingLocation = false;
        });
      }
    } on LocationServiceException catch (e) {
      if (mounted) {
        setState(() {
          _message = e.message;
          _isLoadingLocation = false;
        });
      }
    } on LocationPermissionException catch (e) {
      if (mounted) {
        setState(() {
          _message = e.message;
          _isLoadingLocation = false;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _message = 'Erro inesperado ao obter localização: $e';
          _isLoadingLocation = false;
        });
      }
    }
  }

  Future<void> _performCheckin() async {
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final user = authProvider.user;

    if (user == null) {
      setState(() => _message = AppConstants.userNotAuthenticated);
      return;
    }

    setState(() {
      _isCheckingIn = true;
      _message = null;
    });

    try {
      final checkin = await _checkinService.performCheckin(user.uid);
      if (mounted) {
        setState(() {
          _isCheckingIn = false;
          _message = AppConstants.checkinSuccess;
        });
        // Clear message after 3 seconds
        Future.delayed(const Duration(seconds: 3), () {
          if (mounted) setState(() => _message = null);
        });
      }
    } on CheckinException catch (e) {
      if (mounted) {
        setState(() {
          _isCheckingIn = false;
          _message = e.message;
        });
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isCheckingIn = false;
          _message = '${AppConstants.checkinError}$e';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final authProvider = Provider.of<AuthProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(AppConstants.checkinTitle),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: AppConstants.logoutTooltip,
            onPressed: authProvider.isLoading
                ? null
                : () async {
                    await authProvider.signOut();
                    if (context.mounted) {
                      Navigator.of(context).pushReplacementNamed('/');
                    }
                  },
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(AppConstants.defaultPadding),
        child: Column(
          children: [
            // Location status card
            Card(
              child: Padding(
                padding: const EdgeInsets.all(AppConstants.defaultPadding),
                child: Column(
                  children: [
                    Row(
                      children: [
                        Icon(
                          _isLoadingLocation
                              ? Icons.location_searching
                              : _currentPosition != null
                              ? Icons.location_on
                              : Icons.location_off,
                          color: _isLoadingLocation
                              ? Colors.orange
                              : _currentPosition != null
                              ? Colors.green
                              : Colors.red,
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: Text(
                            _isLoadingLocation
                                ? 'Obtendo localização...'
                                : _currentPosition != null
                                ? 'Localização obtida'
                                : 'Localização indisponível',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ),
                        if (_isLoadingLocation)
                          const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          ),
                      ],
                    ),
                    if (_currentPosition != null) ...[
                      const SizedBox(height: 8),
                      Text(
                        'Lat: ${_currentPosition!.latitude.toStringAsFixed(4)}, '
                        'Lng: ${_currentPosition!.longitude.toStringAsFixed(4)}',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ],
                ),
              ),
            ),
            const SizedBox(height: AppConstants.defaultPadding),

            // Check-in button
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: (_isCheckingIn || _currentPosition == null)
                    ? null
                    : _performCheckin,
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(
                      AppConstants.borderRadius,
                    ),
                  ),
                ),
                child: _isCheckingIn
                    ? const SizedBox(
                        height: 20,
                        width: 20,
                        child: CircularProgressIndicator(strokeWidth: 2),
                      )
                    : const Text(AppConstants.checkinButton),
              ),
            ),
            const SizedBox(height: AppConstants.defaultPadding),

            // Message display
            if (_message != null)
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: _message!.contains('sucesso')
                      ? Colors.green.shade50
                      : Colors.red.shade50,
                  borderRadius: BorderRadius.circular(
                    AppConstants.borderRadius,
                  ),
                  border: Border.all(
                    color: _message!.contains('sucesso')
                        ? Colors.green.shade200
                        : Colors.red.shade200,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      _message!.contains('sucesso')
                          ? Icons.check_circle
                          : Icons.error,
                      color: _message!.contains('sucesso')
                          ? Colors.green
                          : Colors.red,
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: Text(
                        _message!,
                        style: TextStyle(
                          color: _message!.contains('sucesso')
                              ? Colors.green
                              : Colors.red,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            const SizedBox(height: AppConstants.defaultPadding),

            // Check-ins history
            Expanded(
              child: StreamBuilder<List<CheckinModel>>(
                stream: _checkinService.getUserCheckins(
                  authProvider.user?.uid ?? '',
                ),
                builder: (context, snapshot) {
                  if (snapshot.hasError) {
                    return Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.error, size: 48, color: Colors.red),
                          const SizedBox(height: 16),
                          Text('Erro: ${snapshot.error}'),
                        ],
                      ),
                    );
                  }

                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }

                  final checkins = snapshot.data ?? [];

                  if (checkins.isEmpty) {
                    return Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(
                            Icons.history,
                            size: 48,
                            color: Colors.grey,
                          ),
                          const SizedBox(height: 16),
                          Text(
                            'Nenhum registro encontrado',
                            style: Theme.of(context).textTheme.titleMedium,
                          ),
                        ],
                      ),
                    );
                  }

                  return ListView.builder(
                    itemCount: checkins.length,
                    itemBuilder: (context, index) {
                      final checkin = checkins[index];
                      return Card(
                        margin: const EdgeInsets.only(bottom: 8),
                        child: ListTile(
                          leading: const Icon(Icons.access_time),
                          title: const Text('Ponto registrado'),
                          subtitle: Text(
                            '${checkin.timestamp.day.toString().padLeft(2, '0')}/'
                            '${checkin.timestamp.month.toString().padLeft(2, '0')}/'
                            '${checkin.timestamp.year} '
                            '${checkin.timestamp.hour.toString().padLeft(2, '0')}:'
                            '${checkin.timestamp.minute.toString().padLeft(2, '0')}',
                          ),
                          trailing: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color:
                                  checkin.distance <=
                                      AppConstants.maxDistanceMeters
                                  ? Colors.green.shade100
                                  : Colors.red.shade100,
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Text(
                              '${checkin.distance.toStringAsFixed(1)}m',
                              style: TextStyle(
                                color:
                                    checkin.distance <=
                                        AppConstants.maxDistanceMeters
                                    ? Colors.green.shade800
                                    : Colors.red.shade800,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
