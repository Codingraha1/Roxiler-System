const Transaction = require('../models/transaction');

// API for statistics
exports.getStatistics = async (req, res) => {
    const { month } = req.query;

    // Validate month input (it should be in word form, like 'January', 'February')
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
        December: 11,
    };

    if (!month || !monthMap[month]) {
        return res.status(400).json({ message: 'Invalid month. Please provide a month as a word (e.g., "January", "November").' });
    }

    try {
        // Retrieve all transactions from the database
        const transactions = await Transaction.find();

        // Initialize counters for total sales, sold items, and unsold items
        let totalSales = 0;
        let soldItems = 0;
        let unsoldItems = 0;

        // Iterate over each transaction
        transactions.forEach(transaction => {
            // Extract the date of sale
            const transactionDate = new Date(transaction.dateOfSale);

            // Check if the transaction month matches the provided month
            if (transactionDate.getMonth() === monthMap[month]) {
                // If it matches, accumulate the sales and item counts
                totalSales += transaction.price;

                if (transaction.sold) {
                    soldItems += 1; // Increment sold items count
                } else {
                    unsoldItems += 1; // Increment unsold items count
                }
            }
        });

        // Respond with the statistics
        res.status(200).json({
            totalSales,
            soldItems,
            unsoldItems,
        });
    } catch (error) {
        console.error("Error fetching statistics:", error); // Log the error for debugging
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
};
