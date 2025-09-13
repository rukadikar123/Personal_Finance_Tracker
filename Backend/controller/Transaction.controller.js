import { Transaction } from "../model/transaction.schema.js";

// Controller function to fetch the list of transactions for the logged-in user

export const getListOfTransactions = async (req, res) => {
  try {
        // Fetch transactions from the database where the user ID matches the logged-in user
    const listOfTransactions = await Transaction.find({user:req.user._id});

    if (listOfTransactions.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Transactions not found",
      });
    }
    // If transactions are found, send them in the response along with a success message
    return res.status(200).json({
      success: true,
      listOfTransactions,
      message: "Transactions Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `getListOfTransactions: ${error.message}`,
    });
  }
};

// Controller function to add a new transaction for the logged-in user
export const addTransactions = async (req,res) => {
  try {
    let { title, amount, date, category } = req.body;       // Destructure transaction details from request body

     // Validate input fields
    if (
      [title, date, category].some(
        (elem) => typeof elem !== "string" || elem.trim() === ""
      ) ||
      amount === undefined ||
      amount === null ||
      amount === "" ||
      isNaN(amount)
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

      // Create a new transaction in the database
    let newTransaction=await Transaction.create({
        title,
        amount,
        date,
        category,
        user:req.user._id
    })

    return res.status(201).json({
        success:true,
        newTransaction,
        message:"New Transaction created"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `addTransactions: ${error.message}`,
    });
  }
};

// Controller function to update a transaction by its ID
export const updateTransaction = async (req,res) => {
  try {
    const {id:transactionId}=req.params       // Get transactionId from route parameters
    let updates=req.body

        // Validate that some update data is provided
    if(!updates ||  Object.keys(updates).length===0){
      return res.status(400).json({
        success:false,
        message:"No update data provided"
      })
    }

        // Validate amount field if it exists
    if(updates.amount !== undefined && isNaN(updates.amount)){
      return res.status(400).json({
        success: false,
        message: "Amount must be a number",
      });
    }

    // Find the transaction by ID and update it
    let updatedTransaction=await Transaction.findByIdAndUpdate(transactionId,updates,{new:true,  runValidators: true })

     if (!updatedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success:true,
      updatedTransaction,
      message: "Transaction updated successfully",
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `updateTransaction: ${error.message}`,
    });
  }
};

// Controller function to delete a transaction by its ID
export const deleteTransaction = async (req,res) => {
  try {
    let { id: transactionId } = req.params;       // Get transactionId from route parameters

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }
    // Find the transaction by ID and delete it
    const deletedTransaction = await Transaction.findByIdAndDelete(
      transactionId
    );

    if (!deletedTransaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `deleteTransaction: ${error.message}`,
    });
  }
};
