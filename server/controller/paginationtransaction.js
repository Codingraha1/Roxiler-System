const Transaction = require('../models/transaction');

// API to list transactions with pagination and search
exports.getTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    // Validate that month is provided and is in the correct format (MM format, e.g., '03' for March)
    if (!month || !/^(0[1-9]|1[0-2])$/.test(month)) {
        return res.status(400).json({ message: 'Invalid month. Please provide a valid month in MM format (e.g., "01" for January).' });
    }

    // Log the received query parameters for debugging
    console.log('Query Params:', { page, perPage, search, month });

    // Create a start and end date for the given month
    const year = new Date().getFullYear();
    const startDate = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1); // Set endDate to the first day of the next month

    // Log the date range being used for filtering
    console.log('Date Range:', { startDate, endDate });

    // Create filter for date range
    const filter = {
        dateOfSale: { $gte: startDate, $lt: endDate }  // Filter transactions by the selected month
    };

    // Apply search query to `title` and `description`
    if (search) {
        const searchFilter = {
            $or: [
                { title: { $regex: search, $options: 'i' } },  // Case-insensitive search in title
                { description: { $regex: search, $options: 'i' } }  // Case-insensitive search in description
            ]
        };

        // Add search filter to the main filter object
        Object.assign(filter, searchFilter);
    }

    // Log the final filter being used for the query
    console.log('Final Filter:', filter);

    try {
        // Fetch transactions based on the filter and apply pagination
        const transactions = await Transaction.find(filter)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));

        // Log the fetched transactions for debugging
        console.log('Fetched Transactions:', transactions);

        // Count total number of matching documents for pagination
        const total = await Transaction.countDocuments(filter);

        // Log the total count of matching transactions
        console.log('Total Matching Transactions:', total);

        // Return transactions and total count
        res.status(200).json({ transactions, total });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
};
