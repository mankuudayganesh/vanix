import 'package:flutter/material.dart';
import '../theme/vanix_colors.dart';

/// Shimmer loading effect for content placeholders.
class ShimmerLoading extends StatefulWidget {
  final double width;
  final double height;
  final double borderRadius;

  const ShimmerLoading({
    super.key,
    this.width = double.infinity,
    required this.height,
    this.borderRadius = 8,
  });

  @override
  State<ShimmerLoading> createState() => _ShimmerLoadingState();
}

class _ShimmerLoadingState extends State<ShimmerLoading>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1500),
    )..repeat();
    _animation = Tween<double>(begin: -2, end: 2).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _animation,
      builder: (context, child) {
        return Container(
          width: widget.width,
          height: widget.height,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            gradient: LinearGradient(
              begin: Alignment(_animation.value - 1, 0),
              end: Alignment(_animation.value + 1, 0),
              colors: const [
                VanixColors.bgCard,
                VanixColors.bgTertiary,
                VanixColors.bgCard,
              ],
              stops: const [0.0, 0.5, 1.0],
            ),
          ),
        );
      },
    );
  }
}

/// Shimmer placeholder for a content row
class ShimmerContentRow extends StatelessWidget {
  final int itemCount;
  final double itemWidth;
  final double itemHeight;

  const ShimmerContentRow({
    super.key,
    this.itemCount = 4,
    this.itemWidth = 130,
    this.itemHeight = 200,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: itemHeight,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: itemCount,
        physics: const NeverScrollableScrollPhysics(),
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.only(right: 10),
            child: ShimmerLoading(
              width: itemWidth,
              height: itemHeight,
            ),
          );
        },
      ),
    );
  }
}

/// Shimmer for detail page hero
class ShimmerDetailHero extends StatelessWidget {
  const ShimmerDetailHero({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        ShimmerLoading(height: 300, borderRadius: 0),
        const SizedBox(height: 16),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              ShimmerLoading(width: 200, height: 24),
              const SizedBox(height: 8),
              ShimmerLoading(width: 140, height: 16),
              const SizedBox(height: 16),
              ShimmerLoading(height: 48),
              const SizedBox(height: 16),
              ShimmerLoading(height: 80),
            ],
          ),
        ),
      ],
    );
  }
}
