"use client";

import { useEffect, useState } from "react";

const TransactionHistoryTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error("Failed to load transactions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <p className="text-center">Loading transactions...</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Transaction ID</th>
            <th className="p-3 border">Ticket Title</th>
            <th className="p-3 border">Amount</th>
            <th className="p-3 border">Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.transactionId} className="border-t">
                <td className="p-3">{tx.transactionId}</td>
                <td className="p-3">{tx.ticketTitle}</td>
                <td className="p-3">
                  ${(tx.amount / 100).toFixed(2)}
                </td>
                <td className="p-3">
                  {new Date(tx.paymentDate).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
export default TransactionHistoryTable