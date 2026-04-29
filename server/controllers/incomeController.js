import Income from "../models/incomeModel.js";

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