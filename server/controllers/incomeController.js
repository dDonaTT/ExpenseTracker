import Income from "../models/incomeModel.js";
import XLSX from "xlsx";
import getDateRange from "../utils/dateFilter.js";
export const getAllIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      message: "Incomes fetched successfully",
      incomes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export async function addIncome(req, res) {
  const userId = req.user._id;
  const { description, amount, date, category } = req.body;
  try {
    const newIncome = new Income({
      description,
      amount,
      date,
      category,
      user: userId,
    });
    await newIncome.save();
    res.status(200).json({
      success: true,
      message: "Income added successfully",
      newIncome,
    });
    if (!description || !amount || !date || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function updateIncome(req, res) {
  const { id } = req.params;
  const userId = req.user._id;
  const { description, amount } = req.body;
  try {
    const income = await Income.findOneAndUpdate(
      { user: userId, _id: id },
      { description, amount },
      { new: true },
    );
    if (!income) {
      return res.status(400).json({
        success: false,
        message: "Income does not exist",
      });
    }
    income.description = description;
    income.amount = amount;
    await income.save();
    res.status(200).json({
      success: true,
      message: "Income updated successfully",
      income,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function deleteIncome(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const income = await Income.findOneAndDelete({ user: userId, _id: id });
    if (!income) {
      return res.status(400).json({
        success: false,
        message: "Income does not exist",
      });
    }
    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function donwnloadIncomeExcel(req, res) {
  const userId = req.user._id;
  try {
    const income = await Income.find({ user: userId }.sort({ date: -1 }));
    const plainData = income.map((income) => ({
      Description: income.description,
      Amount: income.amount,
      Date: new Date(income.date).toLocaleDateString(),
      Category: income.category,
    }));
    const worksheet = XLSX.utils.json_to_sheet(plainData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income");
    XLSX.writeFile(workbook, "Income.xlsx");
    res.download("Income.xlsx");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function getIncomeOverview(req, res) {
  try {
    const userId = req.user._id;
    const { range = "monthly" } = req.query;
    const { startDate, endDate } = getDateRange(range);

    const income = await Income.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate },
    }).sort({ date: -1 });
    const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
    const averageIncome = income.lenth > 0 ? totalIncome / income.length : 0;
    const numberOfTransaction = income.lenth;
    const recentIncome = income.slice(0, 9);
    res.status(200).json({
      success: true,
      data: {
        totalIncome,
        range,
        averageIncome,
        numberOfTransaction,
        recentIncome,
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
