import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.VITE_STRIPE_PUBLIC_KEY || ''
);

export const SubscriptionForm: React.FC<{
  priceId: string;
  planName: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}> = ({ priceId, planName, onSuccess, onError }) => {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionCheckout
        priceId={priceId}
        planName={planName}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
};

const SubscriptionCheckout: React.FC<{
  priceId: string;
  planName: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}> = ({ priceId, planName, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get or create customer
      const customerResponse = await fetch('/api/payment/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'customer@example.com', // Get from user
          metadata: {
            plan: planName,
          },
        }),
      });

      const customer = await customerResponse.json();

      // Create setup intent
      const setupResponse = await fetch('/api/payment/setup-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: customer.id,
        }),
      });

      const { clientSecret } = await setupResponse.json();

      // Confirm card setup
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {},
        },
      });

      if (result.error) {
        setError(result.error.message || 'Setup failed');
        onError?.(result.error.message || 'Setup failed');
      } else {
        // Create subscription
        const subResponse = await fetch('/api/payment/subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerId: customer.id,
            priceId,
            metadata: {
              plan: planName,
            },
          }),
        });

        await subResponse.json();
        onSuccess?.();
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubscribe} className="space-y-4">
      <div className="p-4 border border-gray-300 rounded">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Subscribe to ${planName}`}
      </button>
    </form>
  );
};
