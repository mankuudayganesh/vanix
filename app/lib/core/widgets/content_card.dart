import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../theme/vanix_colors.dart';

/// Reusable content poster card used across Home, Search, and Detail screens.
class ContentCard extends StatelessWidget {
  final String title;
  final String? subtitle;
  final String? imageUrl;
  final String? badge;
  final double? rating;
  final VoidCallback? onTap;
  final double width;
  final double height;

  const ContentCard({
    super.key,
    required this.title,
    this.subtitle,
    this.imageUrl,
    this.badge,
    this.rating,
    this.onTap,
    this.width = 130,
    this.height = 200,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(8),
          color: VanixColors.bgCard,
          border: Border.all(color: VanixColors.borderColor.withOpacity(0.5)),
        ),
        child: Stack(
          children: [
            // Background image or gradient
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: imageUrl != null
                  ? Image.network(
                      imageUrl!,
                      width: width,
                      height: height,
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => _buildPlaceholder(),
                    )
                  : _buildPlaceholder(),
            ),

            // Bottom gradient overlay
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(8),
                  gradient: VanixColors.cardGradient,
                ),
              ),
            ),

            // Badge
            if (badge != null)
              Positioned(
                top: 8,
                left: 8,
                child: Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: VanixColors.vanixRed,
                    borderRadius: BorderRadius.circular(3),
                  ),
                  child: Text(
                    badge!,
                    style: GoogleFonts.poppins(
                        fontSize: 8,
                        fontWeight: FontWeight.w700,
                        color: Colors.white),
                  ),
                ),
              ),

            // Title & info at bottom
            Positioned(
              left: 8,
              right: 8,
              bottom: 8,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: GoogleFonts.montserrat(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  if (subtitle != null || rating != null) ...[
                    const SizedBox(height: 2),
                    Text(
                      '${subtitle ?? ''} ${rating != null ? '• ★ ${rating!.toStringAsFixed(1)}' : ''}',
                      style: GoogleFonts.poppins(
                        fontSize: 9,
                        color: VanixColors.textMuted,
                      ),
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPlaceholder() {
    return Container(
      width: width,
      height: height,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(8),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [VanixColors.bgTertiary, VanixColors.bgCard],
        ),
      ),
      child: Center(
        child: Icon(
          Icons.movie_creation_outlined,
          color: VanixColors.textMuted.withOpacity(0.3),
          size: 40,
        ),
      ),
    );
  }
}
