import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/models.dart';

/// Currently selected active profile (null represents that user needs to select a profile)
final selectedProfileProvider = StateProvider<Profile?>((ref) => null);

/// List of available profiles for the authenticated user
final profilesProvider = StateProvider<List<Profile>>((ref) {
  return const [
    Profile(
      id: '1',
      name: 'Alex',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    ),
    Profile(
      id: '2',
      name: 'Sarah',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    ),
    Profile(
      id: '3',
      name: 'Kids',
      avatarUrl: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?w=100',
      isKids: true,
    ),
  ];
});
