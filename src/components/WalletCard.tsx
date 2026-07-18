import React, { useState, useEffect } from 'react';

export const WalletCard: React.FC<{
  customerId: string;
}> = ({ customerId }) => {
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addAmount, setAddAmount] = useState<string>('');

  useEffect(() => {
    fetchWalletData();
  }, [customerId]);

  const fetchWalletData = async () => {
    try {
      // Get customer invoices (represents transactions)
      const response = await fetch(
        `/api/payment/customers/${customerId}/invoices`
      );
      const invoices = await response.json();
      setTransactions(invoices);

      // Calculate balance from transactions
      const total = invoices.reduce(
        (sum: number, inv: any) => sum + (inv.amount_paid || 0),
        0
      );
      setBalance(total / 100);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async () => {
    if (!addAmount) return;

    try {
      const response = await fetch('/api/payment/payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(addAmount) * 100,
          customerId,
          description: `Add funds to wallet`,
        }),
      });

      const data = await response.json();
      // Redirect to payment or show payment modal
      console.log('Payment intent created:', data);
      setAddAmount('');
      setShowAddFunds(false);
      fetchWalletData();
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  if (loading) {
    return <div>Loading wallet...</div>;
  }

  return (
    <div className="space-y-4">
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-lg">
        <div className="text-sm opacity-75 mb-2">Wallet Balance</div>
        <div className="text-3xl font-bold mb-4">${balance.toFixed(2)}</div>
        <button
          onClick={() => setShowAddFunds(!showAddFunds)}
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
        >
          {showAddFunds ? 'Cancel' : 'Add Funds'}
        </button>
      </div>

      {/* Add Funds Form */}
      {showAddFunds && (
        <div className="border border-gray-300 p-4 rounded">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Amount to Add
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                $
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddFunds}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Funds
          </button>
        </div>
      )}

      {/* Transaction History */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border border-gray-200 rounded"
              >
                <div>
                  <div className="font-medium">
                    {transaction.description || 'Transaction'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(
                      transaction.date * 1000
                    ).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">
                    ${((transaction.amount_paid || 0) / 100).toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {transaction.status}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              No transactions yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
