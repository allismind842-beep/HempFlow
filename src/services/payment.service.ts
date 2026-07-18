import stripe from './stripe';

export interface CreatePaymentIntentParams {
  amount: number;
  currency?: string;
  description?: string;
  metadata?: Record<string, any>;
  customerId?: string;
}

export interface CreateSubscriptionParams {
  customerId: string;
  priceId: string;
  metadata?: Record<string, any>;
}

export interface CreatePayoutParams {
  amount: number;
  currency?: string;
  description?: string;
  connectedAccountId: string;
}

// Create a payment intent for one-time payments
export const createPaymentIntent = async (params: CreatePaymentIntentParams) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: params.amount * 100, // Convert to cents
      currency: params.currency || 'usd',
      description: params.description,
      metadata: params.metadata,
      customer: params.customerId,
    });

    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Create a subscription
export const createSubscription = async (params: CreateSubscriptionParams) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: params.customerId,
      items: [{ price: params.priceId }],
      metadata: params.metadata,
    });

    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Cancel a subscription
export const cancelSubscription = async (subscriptionId: string) => {
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};

// Create a payout to connected account
export const createPayout = async (params: CreatePayoutParams) => {
  try {
    const payout = await stripe.payouts.create(
      {
        amount: params.amount * 100, // Convert to cents
        currency: params.currency || 'usd',
        description: params.description,
      },
      {
        stripeAccount: params.connectedAccountId,
      }
    );

    return payout;
  } catch (error) {
    console.error('Error creating payout:', error);
    throw error;
  }
};

// Get customer
export const getCustomer = async (customerId: string) => {
  try {
    const customer = await stripe.customers.retrieve(customerId);
    return customer;
  } catch (error) {
    console.error('Error retrieving customer:', error);
    throw error;
  }
};

// Create customer
export const createCustomer = async (
  email: string,
  metadata?: Record<string, any>
) => {
  try {
    const customer = await stripe.customers.create({
      email,
      metadata,
    });

    return customer;
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

// Get payment method
export const getPaymentMethod = async (paymentMethodId: string) => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(
      paymentMethodId
    );
    return paymentMethod;
  } catch (error) {
    console.error('Error retrieving payment method:', error);
    throw error;
  }
};

// Attach payment method to customer
export const attachPaymentMethod = async (
  paymentMethodId: string,
  customerId: string
) => {
  try {
    const paymentMethod = await stripe.paymentMethods.attach(
      paymentMethodId,
      {
        customer: customerId,
      }
    );

    return paymentMethod;
  } catch (error) {
    console.error('Error attaching payment method:', error);
    throw error;
  }
};

// Get customer payment methods
export const getCustomerPaymentMethods = async (customerId: string) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });

    return paymentMethods.data;
  } catch (error) {
    console.error('Error listing payment methods:', error);
    throw error;
  }
};

// Create setup intent for saving payment methods
export const createSetupIntent = async (customerId: string) => {
  try {
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
    });

    return setupIntent;
  } catch (error) {
    console.error('Error creating setup intent:', error);
    throw error;
  }
};

// Get invoice
export const getInvoice = async (invoiceId: string) => {
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return invoice;
  } catch (error) {
    console.error('Error retrieving invoice:', error);
    throw error;
  }
};

// List invoices for customer
export const getCustomerInvoices = async (customerId: string) => {
  try {
    const invoices = await stripe.invoices.list({
      customer: customerId,
      limit: 50,
    });

    return invoices.data;
  } catch (error) {
    console.error('Error listing invoices:', error);
    throw error;
  }
};

// Refund a charge
export const refundCharge = async (chargeId: string, amount?: number) => {
  try {
    const refund = await stripe.refunds.create({
      charge: chargeId,
      amount: amount ? amount * 100 : undefined, // Convert to cents
    });

    return refund;
  } catch (error) {
    console.error('Error refunding charge:', error);
    throw error;
  }
};
