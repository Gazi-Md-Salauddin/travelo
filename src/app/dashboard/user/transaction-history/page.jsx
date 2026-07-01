"use client";

import { useEffect, useState } from "react";
import { getUserSession } from '@/lib/core/session';

const TransactionHistoryTable = () => { 
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLog, setErrorLog] = useState("");

  useEffect(() => {
    const initFetch = async () => {
      try {
        setLoading(true);
        setErrorLog("Checking session...");
        
        // 1. Fetching session
        const session = await getUserSession();
        
        if (!session || !session.email) {
          setErrorLog("Not found any valid session. Please sign in");
          setLoading(false);
          return;
        }

        setErrorLog(`(${session.email}) loading data...`);

        // 2. Fetching data
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await fetch(`${baseUrl}/api/transactions/user/${session.email}`);
        
        if (!res.ok) {
          throw new Error(`${res.status}`);
        }

        const data = await res.json();
        
        if (Array.isArray(data)) {
          setTransactions(data);
          setErrorLog("");
        } else {
          setTransactions([]);
          setErrorLog();
        }

      } catch (err) {
        console.error("Error in component:", err);
        setErrorLog(`${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    initFetch();
  }, []);

  // show error message in screen
  if (loading || errorLog) {
    return (
      <div className="text-center p-10 bg-gray-50 rounded-lg m-4 border border-dashed">
        <p className="text-lg font-medium text-gray-700">{loading ? "please wait..." : "status"}</p>
        <p className="text-sm text-amber-600 mt-2 font-mono">{errorLog}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
      <table className="w-full border border-gray-200 text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-black dark:text-white">
          <tr>
            <th className="p-3 border">Booking/Tx ID</th>
            <th className="p-3 border">Ticket Title</th>
            <th className="p-3 border">Route</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Amount Paid</th>
            <th className="p-3 border">Payment Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((tx) => {
              const totalAmount = Number(tx.pricePerTicket || 0) * Number(tx.bookingQuantity || 0);
              
              return (
                <tr key={tx._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-mono text-sm text-gray-600">{tx._id}</td>
                  <td className="p-3 font-medium">{tx.ticketTitle}</td>
                  <td className="p-3 text-sm">{tx.ticketFrom} → {tx.ticketTo}</td>
                  <td className="p-3 text-center">{tx.bookingQuantity}</td>
                  <td className="p-3 font-semibold text-green-600">{totalAmount}</td>
                  <td className="p-3 text-sm text-gray-600">
                    {tx.paymentDate ? new Date(tx.paymentDate).toLocaleString() : "N/A"}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistoryTable;
