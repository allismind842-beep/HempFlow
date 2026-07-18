import Stripe from 'stripe';
import express from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const router = express.Router();
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Webhook handler
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'] as string;

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('✅ Payment succeeded:', event.data.object);
        // Update order status to paid
        break;

      case 'payment_intent.payment_failed':
        console.log('❌ Payment failed:', event.data.object);
        // Update order status to failed
        break;

      case 'customer.subscription.updated':
        console.log('📝 Subscription updated:', event.data.object);
        // Update subscription status
        break;

      case 'customer.subscription.deleted':
        console.log('🗑️ Subscription canceled:', event.data.object);
        // Update subscription status to canceled
        break;

      case 'invoice.payment_succeeded':
        console.log('✅ Invoice paid:', event.data.object);
        // Send invoice confirmation
        break;

      case 'invoice.payment_failed':
        console.log('❌ Invoice payment failed:', event.data.object);
        // Send payment failure notification
        break;

      case 'payout.paid':
        console.log('💰 Payout completed:', event.data.object);
        // Update payout status
        break;

      case 'charge.refunded':
        console.log('🔄 Refund processed:', event.data.object);
        // Update order status to refunded
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error}`);
  }
});

export default router;
