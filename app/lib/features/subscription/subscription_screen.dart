import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:go_router/go_router.dart';
import '../../core/theme/vanix_colors.dart';
import '../../core/widgets/vanix_button.dart';

class SubscriptionScreen extends ConsumerStatefulWidget {
  const SubscriptionScreen({super.key});

  @override
  ConsumerState<SubscriptionScreen> createState() => _SubscriptionScreenState();
}

class _SubscriptionScreenState extends ConsumerState<SubscriptionScreen> {
  bool _isBillingYearly = false;
  int _selectedPlanIndex = 1; // Default to Premium
  final TextEditingController _couponController = TextEditingController();
  bool _isCouponApplied = false;
  double _discountAmount = 0.0;
  String _couponMessage = '';

  // Mock plan data
  final List<Map<String, dynamic>> _plans = [
    {
      'name': 'VANIX Mobile',
      'monthlyPrice': 149.0,
      'yearlyPrice': 999.0,
      'quality': '720p (HD)',
      'screens': 1,
      'downloads': 10,
      'ads': 'Ad-Supported',
      'dolby': false,
      'hdr': false,
      'isPopular': false,
    },
    {
      'name': 'VANIX Premium',
      'monthlyPrice': 299.0,
      'yearlyPrice': 1999.0,
      'quality': '4K UHD + HDR',
      'screens': 4,
      'downloads': 100,
      'ads': 'Ad-Free',
      'dolby': true,
      'hdr': true,
      'isPopular': true,
    },
    {
      'name': 'VANIX Ultimate',
      'monthlyPrice': 499.0,
      'yearlyPrice': 3499.0,
      'quality': '4K UHD + Dolby Vision',
      'screens': 6,
      'downloads': 500,
      'ads': 'Ad-Free',
      'dolby': true,
      'hdr': true,
      'isPopular': false,
    }
  ];

  @override
  void dispose() {
    _couponController.dispose();
    super.dispose();
  }

  void _applyCoupon() {
    final code = _couponController.text.trim().toUpperCase();
    if (code == 'VANIX50') {
      setState(() {
        _isCouponApplied = true;
        _discountAmount = 0.50; // 50% off
        _couponMessage = '50% DISCOUNT APPLIED!';
      });
    } else if (code == 'FIRSTFREE') {
      setState(() {
        _isCouponApplied = true;
        _discountAmount = 1.00; // 100% off
        _couponMessage = 'FIRST MONTH FREE APPLIED!';
      });
    } else {
      setState(() {
        _isCouponApplied = false;
        _discountAmount = 0.0;
        _couponMessage = 'Invalid coupon code';
      });
    }
  }

  void _processPayment() {
    final selectedPlan = _plans[_selectedPlanIndex];
    final basePrice = _isBillingYearly ? selectedPlan['yearlyPrice'] : selectedPlan['monthlyPrice'];
    final finalPrice = basePrice * (1.0 - _discountAmount);

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        backgroundColor: VanixColors.bgElevated,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
          side: const BorderSide(color: VanixColors.borderColor),
        ),
        title: Row(
          children: [
            const Icon(Icons.payment, color: VanixColors.vanixRed),
            const SizedBox(width: 8),
            Text(
              'Secure Payment Gateway',
              style: GoogleFonts.montserrat(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
            ),
          ],
        ),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Initiating Razorpay API...',
              style: GoogleFonts.poppins(color: Colors.white70, fontSize: 13),
            ),
            const SizedBox(height: 12),
            Text(
              'Plan: ${selectedPlan['name']}',
              style: GoogleFonts.poppins(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 13),
            ),
            Text(
              'Amount: ₹${finalPrice.toStringAsFixed(2)}',
              style: GoogleFonts.poppins(color: VanixColors.vanixRed, fontWeight: FontWeight.bold, fontSize: 14),
            ),
            const SizedBox(height: 16),
            const Center(
              child: CircularProgressIndicator(color: VanixColors.vanixRed),
            ),
          ],
        ),
      ),
    );

    // Simulate payment response
    Future.delayed(const Duration(seconds: 2), () {
      if (!mounted) return;
      Navigator.pop(context); // Close loading dialog

      // Success popup
      showDialog(
        context: context,
        builder: (context) => AlertDialog(
          backgroundColor: VanixColors.bgElevated,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: VanixColors.borderColor),
          ),
          title: Row(
            children: [
              const Icon(Icons.check_circle, color: VanixColors.success),
              const SizedBox(width: 8),
              Text(
                'Payment Successful',
                style: GoogleFonts.montserrat(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 16),
              ),
            ],
          ),
          content: Text(
            'Welcome to VANIX Premium! Your subscription is now active.',
            style: GoogleFonts.poppins(color: Colors.white70, fontSize: 13),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context); // Close alert
                context.go('/'); // Navigate home
              },
              child: Text(
                'Let\'s Stream',
                style: GoogleFonts.poppins(color: VanixColors.vanixRed, fontWeight: FontWeight.bold),
              ),
            ),
          ],
        ),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: VanixColors.bgPrimary,
      appBar: AppBar(
        title: Text(
          'VANIX PLANS',
          style: GoogleFonts.orbitron(letterSpacing: 2, fontWeight: FontWeight.w800, fontSize: 18),
        ),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Top branding text
            Center(
              child: Column(
                children: [
                  Text(
                    'Choose Your Streaming Experience',
                    style: GoogleFonts.montserrat(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: 6),
                  Text(
                    'Cancel anytime. No hidden fees.',
                    style: GoogleFonts.poppins(
                      fontSize: 12,
                      color: VanixColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 20),

            // Billing Toggle (Monthly / Yearly)
            Center(
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  color: VanixColors.bgSecondary,
                  borderRadius: BorderRadius.circular(30),
                  border: Border.all(color: VanixColors.borderColor),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    _buildBillingToggleButton('Monthly', !_isBillingYearly),
                    _buildBillingToggleButton('Yearly (Save 40%)', _isBillingYearly),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),

            // Plan list (horizontal swipeable cards)
            SizedBox(
              height: 280,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                itemCount: _plans.length,
                separatorBuilder: (_, __) => const SizedBox(width: 14),
                itemBuilder: (context, index) {
                  final plan = _plans[index];
                  final isSelected = _selectedPlanIndex == index;
                  final price = _isBillingYearly ? plan['yearlyPrice'] : plan['monthlyPrice'];

                  return GestureDetector(
                    onTap: () => setState(() => _selectedPlanIndex = index),
                    child: AnimatedContainer(
                      duration: const Duration(milliseconds: 300),
                      width: 200,
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: isSelected ? VanixColors.bgCard : VanixColors.bgSecondary,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(
                          color: isSelected ? VanixColors.vanixRed : VanixColors.borderColor,
                          width: isSelected ? 2 : 1,
                        ),
                        boxShadow: isSelected ? [
                          BoxShadow(
                            color: VanixColors.vanixRed.withOpacity(0.15),
                            blurRadius: 16,
                            spreadRadius: 2,
                          )
                        ] : [],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // Top popular badge
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                plan['name']!,
                                style: GoogleFonts.montserrat(
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                  color: Colors.white,
                                ),
                              ),
                              if (plan['isPopular'])
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                  decoration: BoxDecoration(
                                    color: VanixColors.vanixRed,
                                    borderRadius: BorderRadius.circular(4),
                                  ),
                                  child: Text(
                                    'POPULAR',
                                    style: GoogleFonts.poppins(
                                      fontSize: 8,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                    ),
                                  ),
                                ),
                            ],
                          ),
                          const SizedBox(height: 14),

                          // Price
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.baseline,
                            textBaseline: TextBaseline.alphabetic,
                            children: [
                              Text(
                                '₹${price.toStringAsFixed(0)}',
                                style: GoogleFonts.orbitron(
                                  fontSize: 24,
                                  fontWeight: FontWeight.w800,
                                  color: Colors.white,
                                ),
                              ),
                              Text(
                                _isBillingYearly ? '/yr' : '/mo',
                                style: GoogleFonts.poppins(
                                  fontSize: 12,
                                  color: VanixColors.textSecondary,
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),
                          const Divider(),
                          const SizedBox(height: 12),

                          // Key Specs
                          _buildPlanFeature(Icons.personal_video_rounded, plan['quality']),
                          _buildPlanFeature(Icons.devices_rounded, '${plan['screens']} Screen${plan['screens'] > 1 ? 's' : ''}'),
                          _buildPlanFeature(Icons.download_for_offline_rounded, plan['ads']),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
            const SizedBox(height: 24),

            // Coupon Code Expandable Block
            Theme(
              data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
              child: ExpansionTile(
                title: Text(
                  'Have a Promo Code / Coupon?',
                  style: GoogleFonts.poppins(fontSize: 13, color: Colors.white, fontWeight: FontWeight.bold),
                ),
                leading: const Icon(Icons.card_membership, color: VanixColors.vanixRed),
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: _couponController,
                                style: GoogleFonts.poppins(fontSize: 13, color: Colors.white),
                                decoration: InputDecoration(
                                  hintText: 'Enter code (e.g. VANIX50)',
                                  filled: true,
                                  fillColor: VanixColors.bgSecondary,
                                  contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
                                  enabledBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(color: VanixColors.borderColor),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  focusedBorder: OutlineInputBorder(
                                    borderSide: const BorderSide(color: VanixColors.vanixRed),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            ElevatedButton(
                              onPressed: _applyCoupon,
                              style: ElevatedButton.styleFrom(
                                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                              ),
                              child: Text('Apply', style: GoogleFonts.poppins(fontSize: 12)),
                            ),
                          ],
                        ),
                        if (_couponMessage.isNotEmpty) ...[
                          const SizedBox(height: 6),
                          Text(
                            _couponMessage,
                            style: GoogleFonts.poppins(
                              fontSize: 11,
                              color: _isCouponApplied ? VanixColors.success : VanixColors.vanixRed,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                        const SizedBox(height: 12),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),

            // Feature Comparison Table Matrix
            Text(
              'Compare Features',
              style: GoogleFonts.montserrat(fontWeight: FontWeight.bold, fontSize: 16, color: Colors.white),
            ),
            const SizedBox(height: 12),
            Container(
              decoration: BoxDecoration(
                color: VanixColors.bgSecondary,
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: VanixColors.borderColor),
              ),
              child: Table(
                border: TableBorder.symmetric(inside: const BorderSide(color: VanixColors.borderColor)),
                columnWidths: const {
                  0: FlexColumnWidth(2),
                  1: FlexColumnWidth(1.2),
                  2: FlexColumnWidth(1.2),
                },
                children: [
                  _buildTableHeader(),
                  _buildTableRow('Video Quality', 'HD', '4K UHD'),
                  _buildTableRow('Dolby Atmos', 'No', 'Yes'),
                  _buildTableRow('HDR10+ / Vision', 'No', 'Yes'),
                  _buildTableRow('Devices supported', 'Mobile/Tab', 'All Screen sizes'),
                  _buildTableRow('Smart Downloads', 'No', 'Unlimited'),
                ],
              ),
            ),
            const SizedBox(height: 80), // spacing for bottom bar
          ],
        ),
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: VanixColors.bgSecondary,
          border: const Border(top: BorderSide(color: VanixColors.borderColor)),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'TOTAL AMOUNT',
                  style: GoogleFonts.orbitron(fontSize: 9, color: VanixColors.textMuted, letterSpacing: 1.2),
                ),
                Text(
                  '₹${((_isBillingYearly ? _plans[_selectedPlanIndex]['yearlyPrice'] : _plans[_selectedPlanIndex]['monthlyPrice']) * (1.0 - _discountAmount)).toStringAsFixed(0)}',
                  style: GoogleFonts.montserrat(fontSize: 20, fontWeight: FontWeight.bold, color: Colors.white),
                ),
              ],
            ),
            SizedBox(
              width: 180,
              child: VanixButton(
                text: 'Subscribe Now',
                onPressed: _processPayment,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBillingToggleButton(String text, bool isActive) {
    return GestureDetector(
      onTap: () => setState(() => _isBillingYearly = text.contains('Yearly')),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isActive ? VanixColors.vanixRed : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(
          text,
          style: GoogleFonts.poppins(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: isActive ? Colors.white : VanixColors.textSecondary,
          ),
        ),
      ),
    );
  }

  Widget _buildPlanFeature(IconData icon, String text) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10.0),
      child: Row(
        children: [
          Icon(icon, color: VanixColors.vanixRed, size: 16),
          const SizedBox(width: 8),
          Expanded(
            child: Text(
              text,
              style: GoogleFonts.poppins(fontSize: 11, color: VanixColors.textSecondary),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }

  TableRow _buildTableHeader() {
    return TableRow(
      decoration: const BoxDecoration(color: VanixColors.bgCard),
      children: [
        TableCell(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text('Features', style: GoogleFonts.poppins(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ),
        TableCell(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text('Mobile', style: GoogleFonts.poppins(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ),
        TableCell(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text('Premium', style: GoogleFonts.poppins(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.white)),
          ),
        ),
      ],
    );
  }

  TableRow _buildTableRow(String feature, String v1, String v2) {
    return TableRow(
      children: [
        TableCell(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text(feature, style: GoogleFonts.poppins(fontSize: 11, color: VanixColors.textSecondary)),
          ),
        ),
        TableCell(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text(v1, style: GoogleFonts.poppins(fontSize: 11, color: Colors.white70)),
          ),
        ),
        TableCell(
          child: Padding(
            padding: const EdgeInsets.all(10.0),
            child: Text(v2, style: GoogleFonts.poppins(fontSize: 11, color: Colors.white70, fontWeight: FontWeight.bold)),
          ),
        ),
      ],
    );
  }
}
