# Stripe Payment Integration for HempFlow

This guide covers integrating Stripe for payments, subscriptions, and vendor payouts.

## Setup

### 1. Get Stripe Credentials

1. Go to [stripe.com](https://stripe.com)
2. Create an account
3. Get your API keys from the Dashboard
4. Add to `.env`:

```
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## Features

✅ One-time payments
✅ Subscriptions
✅ Vendor payouts
✅ Wallet system
✅ Webhook handling
