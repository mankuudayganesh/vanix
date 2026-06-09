import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '@middleware/auth.middleware';
import { ApiResponse } from '@utils/apiResponse';
import { prisma } from '@config/database';
import { AuthRequest } from '@custom-types/index';
import { BadRequestError } from '@utils/errors';
import { env } from '@config/env';
import crypto from 'crypto';

const router = Router();

// Create Razorpay order
router.post('/create-order', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { paymentId } = req.body;

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId, userId: req.user!.id },
    });

    if (!payment || payment.status !== 'PENDING') {
      throw new BadRequestError('Invalid or already processed payment');
    }

    // TODO: Create Razorpay order using Razorpay SDK
    // const Razorpay = require('razorpay');
    // const instance = new Razorpay({ key_id: env.RAZORPAY_KEY_ID, key_secret: env.RAZORPAY_KEY_SECRET });
    // const order = await instance.orders.create({
    //   amount: payment.amount,
    //   currency: payment.currency,
    //   receipt: payment.id,
    // });

    // For development, simulate order creation
    const orderId = `order_${crypto.randomBytes(12).toString('hex')}`;

    await prisma.payment.update({
      where: { id: payment.id },
      data: { razorpayOrderId: orderId },
    });

    ApiResponse.success({
      res,
      data: {
        orderId,
        amount: payment.amount,
        currency: payment.currency,
        keyId: env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        name: 'VANIX',
        description: 'Subscription Payment',
        prefill: {
          email: req.user!.email || '',
          contact: (req.user as any)?.phone || '',
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// Verify Razorpay payment
router.post('/verify', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Verify signature
    if (env.RAZORPAY_KEY_SECRET) {
      const body = `${razorpayOrderId}|${razorpayPaymentId}`;
      const expectedSignature = crypto
        .createHmac('sha256', env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpaySignature) {
        throw new BadRequestError('Payment verification failed');
      }
    }

    // Update payment
    const payment = await prisma.payment.update({
      where: { razorpayOrderId: razorpayOrderId },
      data: {
        razorpayPaymentId: razorpayPaymentId,
        status: 'CAPTURED',
        paidAt: new Date(),
      },
    });

    // Activate subscription
    if (payment.subscriptionId) {
      await prisma.subscription.update({
        where: { id: payment.subscriptionId },
        data: { status: 'ACTIVE' },
      });
    }

    ApiResponse.success({ res, message: 'Payment verified successfully' });
  } catch (error) {
    next(error);
  }
});

// Razorpay webhook
router.post('/webhook', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET;

    // Verify webhook signature
    if (webhookSecret) {
      const signature = req.headers['x-razorpay-signature'] as string;
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (signature !== expectedSignature) {
        res.status(400).json({ success: false, message: 'Invalid signature' });
        return;
      }
    }

    const event = req.body.event;
    const payload = req.body.payload;

    switch (event) {
      case 'payment.captured': {
        const paymentEntity = payload.payment.entity;
        await prisma.payment.updateMany({
          where: { razorpayOrderId: paymentEntity.order_id },
          data: {
            razorpayPaymentId: paymentEntity.id,
            status: 'CAPTURED',
            method: paymentEntity.method,
            paidAt: new Date(),
          },
        });
        break;
      }

      case 'payment.failed': {
        const paymentEntity = payload.payment.entity;
        await prisma.payment.updateMany({
          where: { razorpayOrderId: paymentEntity.order_id },
          data: {
            status: 'FAILED',
            metadata: { error: paymentEntity.error_description },
          },
        });
        break;
      }

      case 'subscription.cancelled': {
        const subEntity = payload.subscription.entity;
        await prisma.subscription.updateMany({
          where: { razorpaySubId: subEntity.id },
          data: { status: 'CANCELLED', cancelledAt: new Date() },
        });
        break;
      }

      default:
        break;
    }

    res.status(200).json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Payment history
router.get('/history', authenticate, async (req: AuthRequest, res, next) => {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: req.user!.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: {
        subscription: { include: { plan: true } },
      },
    });

    ApiResponse.success({ res, data: payments });
  } catch (error) {
    next(error);
  }
});

export default router;
