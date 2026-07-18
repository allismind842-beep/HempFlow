import express from 'express';
import {
  createPaymentIntent,
  createSubscription,
  cancelSubscription,
  createPayout,
  getCustomerPaymentMethods,
  createSetupIntent,
  getCustomerInvoices,
  refundCharge,
  createCustomer,
} from '../services/payment.service';

const router = express.Router();

// Create a payment intent
router.post('/payment-intent', async (req, res) => {
  try {
    const { amount, description, metadata, customerId } = req.body;

    const paymentIntent = await createPaymentIntent({
      amount,
      description,
      metadata,
      customerId,
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      publishableKey: process.env.VITE_STRIPE_PUBLIC_KEY,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a subscription
router.post('/subscription', async (req, res) => {
  try {
    const { customerId, priceId, metadata } = req.body;

    const subscription = await createSubscription({
      customerId,
      priceId,
      metadata,
    });

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Cancel a subscription
router.post('/subscription/:subscriptionId/cancel', async (req, res) => {
  try {
    const { subscriptionId } = req.params;

    const subscription = await cancelSubscription(subscriptionId);

    res.json(subscription);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create a payout
router.post('/payout', async (req, res) => {
  try {
    const { amount, description, connectedAccountId } = req.body;

    const payout = await createPayout({
      amount,
      description,
      connectedAccountId,
    });

    res.json(payout);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get customer payment methods
router.get('/customers/:customerId/payment-methods', async (req, res) => {
  try {
    const { customerId } = req.params;

    const paymentMethods = await getCustomerPaymentMethods(customerId);

    res.json(paymentMethods);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create setup intent
router.post('/setup-intent', async (req, res) => {
  try {
    const { customerId } = req.body;

    const setupIntent = await createSetupIntent(customerId);

    res.json({
      clientSecret: setupIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Get customer invoices
router.get('/customers/:customerId/invoices', async (req, res) => {
  try {
    const { customerId } = req.params;

    const invoices = await getCustomerInvoices(customerId);

    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Refund a charge
router.post('/refund', async (req, res) => {
  try {
    const { chargeId, amount } = req.body;

    const refund = await refundCharge(chargeId, amount);

    res.json(refund);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Create customer
router.post('/customers', async (req, res) => {
  try {
    const { email, metadata } = req.body;

    const customer = await createCustomer(email, metadata);

    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
