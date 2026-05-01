import Income from "../models/incomeModel.js";
import Expense from "../models/expenseModel.js";
export async function getDashboardOverview(req, res) {
  const userId = req.user._id;
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  try {
    const incomes = await Income.find({
      user: userId,
      date: { $gte: startOfMonth, $lte: now },
    }).lean();
    const expenses = await Expense.find({
      userId,
      date: { $gte: startOfMonth, $lte: now },
    }).lean();
    const monthlyIncome = incomes.reduce(
      (acc, curr) => acc + Number(curr.amount || 0),
      0,
    );
    const monthlyExpense = expenses.reduce(
      (acc, curr) => acc + Number(curr.amount || 0),
      0,
    );
    const savings = monthlyIncome - monthlyExpense;
    const savingsRate =
      monthlyIncome === 0 ? 0 : (monthlyExpense / monthlyIncome) * 100;
    const recentTransactions = [
      ...incomes.map((income) => ({ ...income, type: "income" })),
      ...expenses.map((expense) => ({ ...expense, type: "expense" })),
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const spendByCategory = {};
    for (const exp of expenses) {
      const cat = exp.category || "Others";
      spendByCategory[cat] =
        (spendByCategory[cat] || 0) + Number(exp.amount || 0);
    }
    const expenseDistribution = Object.entries(spendByCategory).map(
      ([category, amount]) => ({
        category,
        amount,
        percent:
          monthlyExpense === 0
            ? 0
            : Math.round((amount / monthlyExpense) * 100),
      }),
    );
    res.status(200).json({
      success: true,
      data: {
        monthlyIncome,
        monthlyExpense,
        savings,
        savingsRate,
        recentTransactions,
        spendByCategory,
        expenseDistribution,
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
