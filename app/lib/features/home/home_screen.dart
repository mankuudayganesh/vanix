import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../core/theme/vanix_colors.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final PageController _heroController = PageController();
  int _currentHeroIndex = 0;

  // Mock data
  final List<Map<String, dynamic>> heroBanners = [
    {'title': 'CYBERPUNK NIGHTS', 'subtitle': 'Season 2 Now Streaming', 'tag': 'VANIX ORIGINAL', 'description': 'In a city where memories are traded like currency, a rogue detective uncovers a conspiracy that threatens reality itself.', 'color': Color(0xFF1A0A2E)},
    {'title': 'NEON GENESIS', 'subtitle': 'A VANIX Original Film', 'tag': '4K ULTRA HD', 'description': 'A young bio-hacker discovers a hidden frequency that could rewrite the fabric of reality.', 'color': Color(0xFF0A1E0A)},
    {'title': 'DUNE: PART TWO', 'subtitle': 'Now Streaming in 4K', 'tag': 'BLOCKBUSTER', 'description': 'Paul Atreides unites with the Fremen to avenge the destruction of his family.', 'color': Color(0xFF2E1A0A)},
  ];

  final List<Map<String, String>> continueWatching = [
    {'title': 'Cyberpunk Nights', 'episode': 'S2 E5', 'progress': '0.65'},
    {'title': 'Shadow Realm', 'episode': 'S1 E8', 'progress': '0.3'},
    {'title': 'The Void', 'episode': '', 'progress': '0.45'},
  ];

  final List<Map<String, String>> trendingContent = [
    {'title': 'Dune: Part Two', 'genre': 'Sci-Fi', 'rating': '9.2'},
    {'title': 'Cyberpunk Nights', 'genre': 'Thriller', 'rating': '9.1'},
    {'title': 'Ronin Red', 'genre': 'Action', 'rating': '9.0'},
    {'title': 'Neon Genesis', 'genre': 'Sci-Fi', 'rating': '8.9'},
    {'title': 'The Void', 'genre': 'Fantasy', 'rating': '8.7'},
    {'title': 'Beyond the Code', 'genre': 'Thriller', 'rating': '8.6'},
  ];

  final List<Map<String, String>> top10India = [
    {'title': 'Shadow Realm', 'genre': 'Fantasy'},
    {'title': 'Beyond the Code', 'genre': 'Thriller'},
    {'title': 'Neon Genesis', 'genre': 'Sci-Fi'},
    {'title': 'Cinema Classic', 'genre': 'Drama'},
    {'title': 'Global Vision', 'genre': 'Documentary'},
  ];

  final List<Map<String, String>> originals = [
    {'title': 'Shadow Realm', 'type': 'Drama • Warrior • 3 Seasons'},
    {'title': 'Neon Beat', 'type': 'Music • Documentary • Special'},
    {'title': 'Code Infinite', 'type': 'Sci-Fi • Thriller • 5 Seasons'},
    {'title': 'Cyberpunk Nights', 'type': 'Sci-Fi • Thriller • 2 Seasons'},
  ];

  @override
  void initState() {
    super.initState();
    // Auto-slide hero banner
    Future.delayed(const Duration(seconds: 4), _autoSlide);
  }

  void _autoSlide() {
    if (!mounted) return;
    final nextPage = (_currentHeroIndex + 1) % heroBanners.length;
    _heroController.animateToPage(
      nextPage,
      duration: const Duration(milliseconds: 800),
      curve: Curves.easeInOutCubic,
    );
    Future.delayed(const Duration(seconds: 5), _autoSlide);
  }

  @override
  void dispose() {
    _heroController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: VanixColors.bgPrimary,
      body: CustomScrollView(
        slivers: [
          // VANIX App Bar
          SliverAppBar(
            floating: true,
            backgroundColor: VanixColors.bgPrimary.withOpacity(0.9),
            title: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Container(
                  width: 30,
                  height: 30,
                  decoration: BoxDecoration(
                    color: VanixColors.vanixRed,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Center(
                    child: Text(
                      'V',
                      style: GoogleFonts.orbitron(
                        color: Colors.white,
                        fontSize: 18,
                        fontWeight: FontWeight.w900,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8),
                Text('VANIX',
                  style: GoogleFonts.orbitron(
                    fontSize: 24,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 4,
                  ),
                ),
              ],
            ),
            actions: [
              IconButton(
                icon: const Icon(Icons.cast, size: 22),
                onPressed: () {},
              ),
              IconButton(
                icon: const Icon(Icons.notifications_none_rounded, size: 24),
                onPressed: () {},
              ),
              Padding(
                padding: const EdgeInsets.only(right: 12),
                child: CircleAvatar(
                  radius: 14,
                  backgroundColor: VanixColors.vanixRed,
                  child: Text('A', style: GoogleFonts.poppins(fontSize: 12, fontWeight: FontWeight.w700, color: Colors.white)),
                ),
              ),
            ],
          ),

          // Hero Banner
          SliverToBoxAdapter(
            child: _buildHeroBanner(),
          ),

          // Continue Watching
          SliverToBoxAdapter(
            child: _buildContentSection(
              'Continue Watching',
              showSeeAll: true,
              child: _buildContinueWatchingRow(),
            ),
          ),

          // Trending Now
          SliverToBoxAdapter(
            child: _buildContentSection(
              'Trending Now',
              showSeeAll: true,
              child: _buildContentRow(trendingContent, showBadge: true, badgeText: 'PREVIEW'),
            ),
          ),

          // Top 10 in India Today
          SliverToBoxAdapter(
            child: _buildContentSection(
              'Top 10 in India Today',
              child: _buildTop10Row(),
            ),
          ),

          // VANIX Originals
          SliverToBoxAdapter(
            child: _buildContentSection(
              'VANIX Originals',
              child: _buildOriginalsRow(),
            ),
          ),

          // Popular Movies
          SliverToBoxAdapter(
            child: _buildContentSection(
              'Popular Movies',
              showSeeAll: true,
              child: _buildContentRow(trendingContent.reversed.toList()),
            ),
          ),

          // Recently Added
          SliverToBoxAdapter(
            child: _buildContentSection(
              'Recently Added',
              showSeeAll: true,
              child: _buildContentRow(trendingContent.take(4).toList()),
            ),
          ),

          // Bottom spacing
          const SliverToBoxAdapter(
            child: SizedBox(height: 100),
          ),
        ],
      ),
    );
  }

  Widget _buildHeroBanner() {
    return SizedBox(
      height: 480,
      child: Stack(
        children: [
          // Banner pages
          PageView.builder(
            controller: _heroController,
            onPageChanged: (index) => setState(() => _currentHeroIndex = index),
            itemCount: heroBanners.length,
            itemBuilder: (context, index) {
              final banner = heroBanners[index];
              return Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      banner['color'] as Color,
                      VanixColors.bgPrimary,
                    ],
                  ),
                ),
                child: Stack(
                  children: [
                    // Gradient overlay
                    Positioned.fill(
                      child: Container(
                        decoration: const BoxDecoration(
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [Colors.transparent, Color(0xCC0A0A0A), Color(0xFF0A0A0A)],
                            stops: [0.3, 0.7, 1.0],
                          ),
                        ),
                      ),
                    ),

                    // Content
                    Positioned(
                      left: 20,
                      right: 20,
                      bottom: 60,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Tag
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                            decoration: BoxDecoration(
                              color: VanixColors.vanixRed,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              banner['tag'] as String,
                              style: GoogleFonts.poppins(fontSize: 10, fontWeight: FontWeight.w700, color: Colors.white, letterSpacing: 1),
                            ),
                          ),
                          const SizedBox(height: 12),

                          // Title
                          Text(
                            banner['title'] as String,
                            style: GoogleFonts.montserrat(
                              fontSize: 32,
                              fontWeight: FontWeight.w800,
                              color: Colors.white,
                              height: 1.1,
                            ),
                          ),
                          const SizedBox(height: 8),

                          // Description
                          Text(
                            banner['description'] as String,
                            style: GoogleFonts.poppins(
                              fontSize: 13,
                              color: VanixColors.textSecondary,
                              height: 1.4,
                            ),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 20),

                          // Buttons
                          Row(
                            children: [
                              // Play Now
                              ElevatedButton.icon(
                                onPressed: () {},
                                icon: const Icon(Icons.play_arrow_rounded, size: 22),
                                label: Text('Play Now', style: GoogleFonts.poppins(fontWeight: FontWeight.w600)),
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: VanixColors.vanixRed,
                                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                                ),
                              ),
                              const SizedBox(width: 12),

                              // More Info
                              OutlinedButton.icon(
                                onPressed: () {},
                                icon: const Icon(Icons.info_outline, size: 18),
                                label: Text('More Info', style: GoogleFonts.poppins(fontWeight: FontWeight.w500, fontSize: 13)),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.white,
                                  side: const BorderSide(color: Colors.white38),
                                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(30)),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              );
            },
          ),

          // Page indicators
          Positioned(
            bottom: 20,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(heroBanners.length, (index) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 3),
                  width: _currentHeroIndex == index ? 24 : 8,
                  height: 4,
                  decoration: BoxDecoration(
                    color: _currentHeroIndex == index ? VanixColors.vanixRed : VanixColors.textMuted,
                    borderRadius: BorderRadius.circular(2),
                  ),
                );
              }),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildContentSection(String title, {Widget? child, bool showSeeAll = false}) {
    return Padding(
      padding: const EdgeInsets.only(top: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(title,
                  style: GoogleFonts.montserrat(
                    fontSize: 18,
                    fontWeight: FontWeight.w700,
                    color: VanixColors.textPrimary,
                  ),
                ),
                if (showSeeAll)
                  TextButton(
                    onPressed: () {},
                    child: Row(
                      children: [
                        Text('See All',
                          style: GoogleFonts.poppins(fontSize: 12, color: VanixColors.vanixRed, fontWeight: FontWeight.w600),
                        ),
                        const SizedBox(width: 4),
                        const Icon(Icons.arrow_forward_ios, size: 12, color: VanixColors.vanixRed),
                      ],
                    ),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          if (child != null) child,
        ],
      ),
    );
  }

  Widget _buildContinueWatchingRow() {
    return SizedBox(
      height: 140,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: continueWatching.length,
        itemBuilder: (context, index) {
          final item = continueWatching[index];
          final progress = double.parse(item['progress']!);
          return Container(
            width: 220,
            margin: const EdgeInsets.only(right: 12),
            decoration: BoxDecoration(
              color: VanixColors.bgCard,
              borderRadius: BorderRadius.circular(8),
              border: Border.all(color: VanixColors.borderColor),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Thumbnail
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(8)),
                      gradient: LinearGradient(
                        colors: [VanixColors.bgTertiary, VanixColors.bgCard],
                      ),
                    ),
                    child: Center(
                      child: Icon(Icons.play_circle_outline, color: VanixColors.vanixRed, size: 36),
                    ),
                  ),
                ),
                // Progress bar
                LinearProgressIndicator(
                  value: progress,
                  backgroundColor: VanixColors.bgTertiary,
                  color: VanixColors.vanixRed,
                  minHeight: 3,
                ),
                // Info
                Padding(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(item['title']!, style: GoogleFonts.poppins(fontSize: 12, fontWeight: FontWeight.w600, color: VanixColors.textPrimary)),
                      if (item['episode']!.isNotEmpty)
                        Text(item['episode']!, style: GoogleFonts.poppins(fontSize: 10, color: VanixColors.textMuted)),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildContentRow(List<Map<String, String>> items, {bool showBadge = false, String badgeText = ''}) {
    return SizedBox(
      height: 200,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: items.length,
        itemBuilder: (context, index) {
          final item = items[index];
          return GestureDetector(
            onTap: () {},
            child: Container(
              width: 130,
              margin: const EdgeInsets.only(right: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: VanixColors.bgCard,
                border: Border.all(color: VanixColors.borderColor.withOpacity(0.5)),
              ),
              child: Stack(
                children: [
                  // Gradient background
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          VanixColors.bgTertiary,
                          VanixColors.bgCard,
                        ],
                      ),
                    ),
                    child: Center(
                      child: Icon(Icons.movie_creation_outlined, color: VanixColors.textMuted.withOpacity(0.3), size: 40),
                    ),
                  ),

                  // Gradient overlay
                  Positioned.fill(
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(8),
                        gradient: VanixColors.cardGradient,
                      ),
                    ),
                  ),

                  // Badge
                  if (showBadge && index == 0)
                    Positioned(
                      top: 8,
                      left: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(
                          color: VanixColors.vanixRed,
                          borderRadius: BorderRadius.circular(3),
                        ),
                        child: Text(badgeText, style: GoogleFonts.poppins(fontSize: 8, fontWeight: FontWeight.w700, color: Colors.white)),
                      ),
                    ),

                  // Title & info
                  Positioned(
                    left: 8,
                    right: 8,
                    bottom: 8,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(item['title']!,
                          style: GoogleFonts.montserrat(fontSize: 12, fontWeight: FontWeight.w600, color: Colors.white),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 2),
                        Text('${item['genre'] ?? ''} ${item['rating'] != null ? '• ★ ${item['rating']}' : ''}',
                          style: GoogleFonts.poppins(fontSize: 9, color: VanixColors.textMuted),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildTop10Row() {
    return SizedBox(
      height: 180,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: top10India.length,
        itemBuilder: (context, index) {
          return Container(
            width: 140,
            margin: const EdgeInsets.only(right: 12),
            child: Stack(
              clipBehavior: Clip.none,
              children: [
                // Card
                Positioned(
                  left: 30,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      color: VanixColors.bgCard,
                      border: Border.all(color: VanixColors.borderColor.withOpacity(0.5)),
                    ),
                    child: Center(
                      child: Icon(Icons.movie, color: VanixColors.textMuted.withOpacity(0.2), size: 32),
                    ),
                  ),
                ),

                // Number
                Positioned(
                  left: -5,
                  bottom: 0,
                  child: Text(
                    '${index + 1}',
                    style: GoogleFonts.orbitron(
                      fontSize: 72,
                      fontWeight: FontWeight.w900,
                      color: Colors.transparent,
                      shadows: [],
                      decoration: TextDecoration.none,
                      decorationColor: Colors.transparent,
                    ).copyWith(
                      foreground: Paint()
                        ..style = PaintingStyle.stroke
                        ..strokeWidth = 2
                        ..color = VanixColors.vanixRed.withOpacity(0.6),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildOriginalsRow() {
    return SizedBox(
      height: 260,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        padding: const EdgeInsets.symmetric(horizontal: 16),
        itemCount: originals.length,
        itemBuilder: (context, index) {
          final item = originals[index];
          return Container(
            width: 180,
            margin: const EdgeInsets.only(right: 12),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(12),
              color: VanixColors.bgCard,
              border: Border.all(color: VanixColors.borderColor),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image placeholder
                Expanded(
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [
                          VanixColors.vanixRed.withOpacity(0.1),
                          VanixColors.bgCard,
                        ],
                      ),
                    ),
                    child: Stack(
                      children: [
                        Center(child: Icon(Icons.play_circle_filled, color: VanixColors.vanixRed.withOpacity(0.5), size: 48)),
                        Positioned(
                          top: 8,
                          left: 8,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              gradient: VanixColors.redGradient,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text('ORIGINAL', style: GoogleFonts.orbitron(fontSize: 8, fontWeight: FontWeight.w700, color: Colors.white)),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                // Info
                Padding(
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(item['title']!, style: GoogleFonts.montserrat(fontSize: 14, fontWeight: FontWeight.w700, color: Colors.white)),
                      const SizedBox(height: 4),
                      Text(item['type']!, style: GoogleFonts.poppins(fontSize: 10, color: VanixColors.textMuted)),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
