import Expense from "../models/expenseModel.js";
import getDateRange from "../utils/dateFilter.js";
import XLSX from "xlsx";
export async function addExpense(req, res) {
  const userId = req.user._id;
  const { description, amount, category, date } = req.body;

  try {
    if (!description || !amount || !category || !date) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    const newExpense = new Expense({
      userId,
      description,
      amount,
      category,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json({
      success: true,
      message: "Expense added successfully",
      newExpense,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function getAllExpenses(req, res) {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function updateExpense(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  const { description, amount } = req.body;

  try {
    const updatedIncome = await Expense.findOneAndUpdate(
      { userId, _id: id },
      { description, amount },
      { new: true },
    );
    if (!updatedIncome) {
      return res.status(400).json({
        success: false,
        message: "Expense does not exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      updatedIncome,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function deleteExpense(req, res) {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id });
    if (!expense) {
      return res.status(400).json({
        success: false,
        message: "Expense does not exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function downloadExpenseData(req, res) {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }.sort({ date: -1 }));
    const plainData = expenses.map((expense) => ({
      Description: expense.description,
      Amount: expense.amount,
      Date: new Date(expense.date).toLocaleDateString(),
      Category: expense.category,
    }));
    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");
    XLSX.writeFile(workbook, "Expenses.xlsx");
    res.download("Expenses.xlsx");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function getExpenseOverview(req, res) {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.query;
    const { startDate, endDate } = getDateRange(range);
    const expenses = await Expense.find({
      userId,
      date: { $gte: dateRange.startDate, $lte: dateRange.endDate },
    }).sort({ date: -1 });
    const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const averageExpense =
      expenses.length > 0 ? totalExpense / expenses.length : 0;
    const numberOfTransaction = expenses.length;
    const recentExpense = expenses.slice(0, 5);
    res.status(200).json({
      success: true,
      data: {
        totalExpense,
        averageExpense,
        numberOfTransaction,
        recentExpense,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
