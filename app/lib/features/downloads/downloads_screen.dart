import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/vanix_colors.dart';
import '../../core/widgets/vanix_button.dart';

class DownloadsScreen extends StatefulWidget {
  const DownloadsScreen({super.key});

  @override
  State<DownloadsScreen> createState() => _DownloadsScreenState();
}

class _DownloadsScreenState extends State<DownloadsScreen> {
  bool _smartDownloads = true;

  // Mock list of downloads
  final List<Map<String, dynamic>> _downloads = [
    {
      'id': 'cyberpunk_nights_s2e5',
      'title': 'Cyberpunk Nights',
      'subtitle': 'S2 E5 • The Memory Trader',
      'size': '420 MB',
      'quality': '1080p',
      'progress': 1.0,
      'isCompleted': true,
      'thumbnail': 'https://images.unsplash.com/photo-1542204172-e7052809564d?w=200',
    },
    {
      'id': 'shadow_realm_s1e8',
      'title': 'Shadow Realm',
      'subtitle': 'S1 E8 • Fire and Iron',
      'size': '310 MB',
      'quality': '1080p',
      'progress': 1.0,
      'isCompleted': true,
      'thumbnail': 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=200',
    },
    {
      'id': 'neon_genesis',
      'title': 'Neon Genesis',
      'subtitle': 'Movie (2024)',
      'size': '1.2 GB',
      'quality': '4K UHD',
      'progress': 0.45,
      'isCompleted': false,
      'thumbnail': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200',
    },
  ];

  void _removeDownload(int index) {
    final title = _downloads[index]['title'];
    setState(() {
      _downloads.removeAt(index);
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Deleted download: $title'),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void _removeAllDownloads() {
    setState(() {
      _downloads.clear();
    });
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Cleared all downloads')),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: VanixColors.bgPrimary,
      appBar: AppBar(
        title: Text(
          'OFFLINE DOWNLOADS',
          style: GoogleFonts.orbitron(letterSpacing: 1.5, fontWeight: FontWeight.w800, fontSize: 16),
        ),
        centerTitle: true,
        actions: [
          if (_downloads.isNotEmpty)
            IconButton(
              icon: const Icon(Icons.delete_sweep_outlined, color: Colors.white70),
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => AlertDialog(
                    backgroundColor: VanixColors.bgElevated,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                      side: const BorderSide(color: VanixColors.borderColor),
                    ),
                    title: Text(
                      'Clear Downloads',
                      style: GoogleFonts.montserrat(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
                    ),
                    content: Text(
                      'Are you sure you want to delete all offline movies and episodes from this device?',
                      style: GoogleFonts.poppins(color: Colors.white70, fontSize: 13),
                    ),
                    actions: [
                      TextButton(
                        onPressed: () => Navigator.pop(context),
                        child: Text('Cancel', style: GoogleFonts.poppins(color: VanixColors.textMuted)),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          Navigator.pop(context);
                          _removeAllDownloads();
                        },
                        style: ElevatedButton.styleFrom(backgroundColor: VanixColors.vanixRed),
                        child: const Text('Delete All'),
                      ),
                    ],
                  ),
                );
              },
            ),
        ],
      ),
      body: _downloads.isEmpty ? _buildEmptyState() : _buildDownloadsList(),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircleAvatar(
              radius: 40,
              backgroundColor: VanixColors.bgSecondary,
              child: Icon(
                Icons.download_for_offline_outlined,
                color: VanixColors.textMuted.withOpacity(0.5),
                size: 44,
              ),
            ),
            const SizedBox(height: 20),
            Text(
              'No Downloads Found',
              style: GoogleFonts.montserrat(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: Colors.white,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Download your favorite movies and shows to watch offline during transit or without internet.',
              style: GoogleFonts.poppins(
                fontSize: 12,
                color: VanixColors.textSecondary,
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: 200,
              child: VanixButton(
                text: 'Find Something to Watch',
                onPressed: () {
                  context.go('/');
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDownloadsList() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Smart downloads header configuration
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          color: VanixColors.bgSecondary,
          child: Row(
            children: [
              const Icon(Icons.info_outline, color: Colors.blueAccent, size: 20),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Smart Downloads Enabled',
                      style: GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 12, color: Colors.white),
                    ),
                    Text(
                      'Automatically deletes watched episodes and fetches the next one when on Wi-Fi.',
                      style: GoogleFonts.poppins(fontSize: 10, color: VanixColors.textMuted),
                    ),
                  ],
                ),
              ),
              Switch.adaptive(
                activeColor: VanixColors.vanixRed,
                value: _smartDownloads,
                onChanged: (val) {
                  setState(() {
                    _smartDownloads = val;
                  });
                },
              ),
            ],
          ),
        ),

        // Device Storage summary bar indicator
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 20, 16, 12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Device Storage',
                    style: GoogleFonts.montserrat(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                  ),
                  Text(
                    '1.9 GB used of 64 GB • 18.2 GB free',
                    style: GoogleFonts.poppins(fontSize: 10, color: VanixColors.textSecondary),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: 0.12, // 12% space occupied
                  minHeight: 6,
                  color: VanixColors.vanixRed,
                  backgroundColor: VanixColors.bgTertiary,
                ),
              ),
            ],
          ),
        ),

        const Divider(height: 24),

        // Download list view
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            physics: const BouncingScrollPhysics(),
            itemCount: _downloads.length,
            separatorBuilder: (_, __) => const SizedBox(height: 16),
            itemBuilder: (context, index) {
              final item = _downloads[index];
              final isCompleted = item['isCompleted'] as bool;
              final double progress = item['progress'] as double;

              return Container(
                decoration: BoxDecoration(
                  color: VanixColors.bgCard,
                  borderRadius: BorderRadius.circular(10),
                  border: Border.all(color: VanixColors.borderColor),
                ),
                padding: const EdgeInsets.all(12),
                child: Row(
                  children: [
                    // Thumbnail container with play button (if complete)
                    GestureDetector(
                      onTap: () {
                        if (isCompleted) {
                          context.push('/player/${item['id']}');
                        }
                      },
                      child: Stack(
                        children: [
                          Container(
                            width: 100,
                            height: 60,
                            decoration: BoxDecoration(
                              color: VanixColors.bgSecondary,
                              borderRadius: BorderRadius.circular(6),
                              image: DecorationImage(
                                image: NetworkImage(item['thumbnail']!),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          if (isCompleted)
                            Positioned.fill(
                              child: Container(
                                color: Colors.black26,
                                child: const Center(
                                  child: CircleAvatar(
                                    radius: 12,
                                    backgroundColor: Colors.white,
                                    child: Icon(Icons.play_arrow_rounded, color: Colors.black, size: 16),
                                  ),
                                ),
                              ),
                            ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 14),

                    // Metadata info
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Row(
                            children: [
                              Expanded(
                                child: Text(
                                  item['title']!,
                                  style: GoogleFonts.poppins(fontWeight: FontWeight.bold, fontSize: 13, color: Colors.white),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 4, vertical: 1),
                                decoration: BoxDecoration(
                                  color: VanixColors.bgTertiary,
                                  borderRadius: BorderRadius.circular(2),
                                  border: Border.all(color: VanixColors.borderColor),
                                ),
                                child: Text(
                                  item['quality']!,
                                  style: GoogleFonts.orbitron(fontSize: 7, fontWeight: FontWeight.bold, color: Colors.white70),
                                ),
                              ),
                            ],
                          ),
                          Text(
                            item['subtitle']!,
                            style: GoogleFonts.poppins(fontSize: 11, color: Colors.white70),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 6),
                          if (!isCompleted) ...[
                            // Progress bar + text for active downloads
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  'Downloading...',
                                  style: GoogleFonts.poppins(fontSize: 10, color: VanixColors.vanixRed, fontWeight: FontWeight.bold),
                                ),
                                Text(
                                  '${(progress * 100).toStringAsFixed(0)}%',
                                  style: GoogleFonts.poppins(fontSize: 10, color: Colors.white70),
                                ),
                              ],
                            ),
                            const SizedBox(height: 4),
                            ClipRRect(
                              borderRadius: BorderRadius.circular(2),
                              child: LinearProgressIndicator(
                                value: progress,
                                minHeight: 3,
                                color: VanixColors.vanixRed,
                                backgroundColor: VanixColors.bgTertiary,
                              ),
                            ),
                          ] else ...[
                            Text(
                              item['size']!,
                              style: GoogleFonts.poppins(fontSize: 10, color: VanixColors.textMuted),
                            ),
                          ]
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),

                    // Actions (Delete option)
                    IconButton(
                      icon: const Icon(Icons.cancel_outlined, color: Colors.white60, size: 20),
                      onPressed: () => _removeDownload(index),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }
}
