import 'package:flutter/material.dart';

class VanixColors {
  VanixColors._();

  // Brand
  static const Color vanixRed = Color(0xFFE50914);
  static const Color vanixRedHover = Color(0xFFFF1A1A);
  static const Color vanixRedDark = Color(0xFFB20710);
  static const Color vanixRedGlow = Color(0x4DE50914);

  // Backgrounds
  static const Color bgPrimary = Color(0xFF0A0A0A);
  static const Color bgSecondary = Color(0xFF111111);
  static const Color bgTertiary = Color(0xFF1A1A1A);
  static const Color bgCard = Color(0xFF141414);
  static const Color bgCardHover = Color(0xFF1E1E1E);
  static const Color bgElevated = Color(0xFF1C1C1C);
  static const Color bgOverlay = Color(0xD9000000);

  // Text
  static const Color textPrimary = Color(0xFFFFFFFF);
  static const Color textSecondary = Color(0xFFB3B3B3);
  static const Color textMuted = Color(0xFF666666);
  static const Color textAccent = Color(0xFFE50914);

  // Borders
  static const Color borderColor = Color(0xFF2A2A2A);
  static const Color borderLight = Color(0xFF333333);

  // Status
  static const Color success = Color(0xFF46D369);
  static const Color warning = Color(0xFFF5A623);
  static const Color error = Color(0xFFE50914);
  static const Color info = Color(0xFF0EA5E9);

  // Gradients
  static const LinearGradient heroGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [
      Colors.transparent,
      Color(0x800A0A0A),
      Color(0xFF0A0A0A),
    ],
    stops: [0.0, 0.6, 1.0],
  );

  static const LinearGradient cardGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [
      Colors.transparent,
      Color(0xCC000000),
    ],
  );

  static const LinearGradient redGradient = LinearGradient(
    colors: [Color(0xFFE50914), Color(0xFFFF4444)],
  );

  static const LinearGradient premiumGradient = LinearGradient(
    colors: [Color(0xFFFFD700), Color(0xFFFF8C00)],
  );
}
