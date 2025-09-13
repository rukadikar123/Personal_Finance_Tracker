import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Categories for dropdown
let categories = [
  "Income",
  "Food",
  "Rent",
  "Travel",
  "Bills",
  "Shopping",
  "Other",
];

function AddOrEdit({ mode }) {
  // State to hold form data
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    amount: "",
    type: "income",
  });

  let navigate = useNavigate();

  // When mode changes, populate form for edit or reset for add
  useEffect(() => {
    if (mode?.mode === "edit" && mode?.data) {
      setFormData({
        title: mode?.data?.title,
        category: mode?.data?.category,
        date: mode.data.date
          ? new Date(mode.data.date).toISOString().split("T")[0]
          : "",
        amount: mode?.data?.amount != null ? Math.abs(mode?.data?.amount) : "",
        type: mode?.data?.amount < 0 ? "expense" : "income",
      });
    } else {
      // Reset form for adding new transaction
      setFormData({
        title: "",
        category: "",
        date: "",
        amount: "",
        type: "income",
      });
    }
  }, [mode]);

  // Update form state on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      title: formData?.title,
      category: formData?.category,
      date: formData?.date,
      amount:
        formData?.type === "expense"
          ? -Math.abs(Number(formData?.amount)) // negative for expense
          : Math.abs(Number(formData?.amount)), // positive for income
    };

    if (mode?.mode === "edit") {
      // Edit existing transaction
      try {
        let res = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/transaction/${mode?.data?._id}`,
          data,
          { withCredentials: true }
        );
        console.log(res);
        toast.success("Transaction updated successfully");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      // Add new transaction
      try {
        let res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/transaction/add`,
          data,
          { withCredentials: true }
        );
        console.log(res);
        toast.success("Transaction added successfully");
        navigate("/"); // redirect to home
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-xl mt-10 shadow-md space-y-4"
    >
      {/* Form title */}
      <h2 className="text-xl font-bold text-center">
        {mode?.mode === "edit" ? "Edit Transaction" : "Add Transaction"}
      </h2>
      {/* Title input */}
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Enter title"
          name="title"
          onChange={handleChange}
          value={formData?.title}
          required
        />
      </div>
      {/* Category select */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          className="w-full border border-gray-300 rounded-lg p-2"
          name="category"
          value={formData?.category}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      {/* Date input */}
      <div>
        <label className="block text-sm font-medium mb-1">Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg p-2"
          required
          name="date"
          value={formData?.date}
          onChange={handleChange}
        />
      </div>
      {/* Amount input */}
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="number"
          className="w-full border border-gray-300 rounded-lg p-2"
          placeholder="Enter amount"
          required
          name="amount"
          value={formData?.amount}
          onChange={handleChange}
        />
      </div>
      {/* Type select */}
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          name="type"
          value={formData?.type}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        >
          <option value="income">Income (+)</option>
          <option value="expense">Expense (-)</option>
        </select>
      </div>
      {/* Submit button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg mt-4"
      >
        {mode?.mode === "edit" ? "Update Transaction" : "Add Transaction"}
      </button>
    </form>
  );
}

export default AddOrEdit;
