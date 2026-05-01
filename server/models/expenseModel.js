import mongoose from "mongoose";

const expenseSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    type: {
      type: String,
      default: "Expense",
    },
  },
  {
    timestamps: true,
  },
);
const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
