import { Transaction } from "../model/transaction.schema.js";

export const getListOfTransactions = async (req, res) => {
  try {
    
    const listOfTransactions = await Transaction.findById();

    if (listOfTransactions.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Transactions not found",
      });
    }

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

export const getTransaction = async (req,res) => {
  try {
    const { id: transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    return res.status(200).json({
      success: true,
      transaction,
      message: "Transaction Fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `getTransaction: ${error.message}`,
    });
  }
};

export const addTransactions = async (req,res) => {
  try {
    let { title, amount, date, category } = req.body;

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

    let newTransaction=await Transaction.create({
        title,
        amount,
        date,
        category
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

export const updateTransaction = async (req,res) => {
  try {
    const {id:transactionId}=req.params
    let updates=req.body

    if(!updates ||  Object.keys(updates).length===0){
      return res.status(400).json({
        success:false,
        message:"No update data provided"
      })
    }

    if(updates.amount !== undefined && isNaN(updates.amount)){
      return res.status(400).json({
        success: false,
        message: "Amount must be a number",
      });
    }

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

export const deleteTransaction = async (req,res) => {
  try {
    let { id: transactionId } = req.params;

    if (!transactionId) {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is required",
      });
    }

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
