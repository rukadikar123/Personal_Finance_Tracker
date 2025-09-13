import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home({ setMode }) {
  const [transactions, setTransactions] = useState(null); // Local state to store fetched transactions
  const { user } = useSelector((state) => state?.auth);
  let navigate = useNavigate();
  // Fetch transactions from backend

  const fetchTransactions = async () => {
    try {
      let res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/transaction`,
        { withCredentials: true }
      );
      setTransactions(res?.data?.listOfTransactions); // Store transactions in state
    } catch (error) {
      console.log(error);
    }
  };
  // Handle edit button click: set mode to edit and navigate to form page
  const handleEdit = (t) => {
    setMode({ mode: "edit", data: t });
    navigate("/addOrEdit");
  };
  // Handle delete button click: delete transaction and refresh list
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/transaction/${id}`,
        { withCredentials: true }
      );
      toast.success("Transaction Deleted successfully");
      fetchTransactions();
    } catch (error) {
      console.log(error);
    }
  };
  // Fetch transactions only when user is available (logged in)
  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);
  return (
    <main className="max-w-6xl  mx-auto px-4 mt-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
        Transactions
      </h2>
      {/* Show list of transactions if available */}
      {transactions && transactions.length > 0 ? (
        <div className="flex flex-col gap-4">
          {transactions.map((t) => (
            <div
              key={t._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 w-full sm:w-auto">
                <div>
                  <h3 className="font-semibold text-gray-800">{t.title}</h3>
                  <p className="text-sm text-gray-500">
                    {t.category} • {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`font-bold text-lg ${
                    t.amount >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.amount >= 0 ? `₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
                </span>
              </div>
              {/* Action buttons */}
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => handleEdit(t)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // If no transactions found
        <p className="mt-6 text-lg text-center">No Transactions found</p>
      )}
    </main>
  );
}

export default Home;
