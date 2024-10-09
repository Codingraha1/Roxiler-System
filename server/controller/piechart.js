const Transaction = require('../models/transaction');

// Month mapping for comparison
const monthMap = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11
};

exports.getPieChartData = async (req, res) => {
    const { month } = req.query;

    // Validate month input
    if (!month || !monthMap[month]) {
        return res.status(400).json({ message: 'Invalid month. Please provide a month as a word (e.g., "January").' });
    }

    try {
        // Retrieve transactions for the specified month
        const transactions = await Transaction.find();

        // Filter transactions by the specified month
        const filteredTransactions = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.dateOfSale);
            return transactionDate.getMonth() === monthMap[month];
        });

        // Group by category and count occurrences
        const categoryCounts = filteredTransactions.reduce((acc, transaction) => {
            const category = transaction.category;
            if (!acc[category]) {
                acc[category] = { _id: category, count: 0 };
            }
            acc[category].count += 1;
            return acc;
        }, {});

        // Convert the object into an array
        const pieChartData = Object.values(categoryCounts);

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error("Error fetching pie chart data:", error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching pie chart data', error: error.message });
    }
};
