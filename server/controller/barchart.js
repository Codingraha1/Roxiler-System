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

exports.getBarChartData = async (req, res) => {
    const { month } = req.query;

    // Validate month input
    if (!month || !monthMap[month]) {
        return res.status(400).json({ message: 'Invalid month. Please provide a month as a word (e.g., "January").' });
    }

    try {
        // Retrieve all transactions from the database
        const transactions = await Transaction.find();

        // Define price ranges
        const priceRanges = [
            { label: '0-100', min: 0, max: 100 },
            { label: '101-200', min: 101, max: 200 },
            { label: '201-300', min: 201, max: 300 },
            { label: '301-400', min: 301, max: 400 },
            { label: '401-500', min: 401, max: 500 },
            { label: '501-600', min: 501, max: 600 },
            { label: '601-700', min: 601, max: 700 },
            { label: '701-800', min: 701, max: 800 },
            { label: '801-900', min: 801, max: 900 },
            { label: '901-above', min: 901, max: Infinity } // Handle items above 900
        ];

        // Initialize count for each price range, including min and max values
        const barChartData = priceRanges.map(range => ({
            label: range.label,
            count: 0,
            min: range.min,  // Include min value
            max: range.max   // Include max value
        }));

        // Debugging log to check price ranges
        console.log('Price Ranges:', priceRanges);

        // Iterate over each transaction
        transactions.forEach(transaction => {
            // Extract the date of sale
            const transactionDate = new Date(transaction.dateOfSale);
            
            // Check if the transaction month matches the provided month
            if (transactionDate.getMonth() === monthMap[month]) {
                // Convert transaction price to a number
                const transactionPrice = Number(transaction.price);
                
                // Check which price range the transaction price falls into
                barChartData.forEach(range => {
                    // Log the current range being checked
                    console.log(`Checking range: ${range.label}, Min: ${range.min}, Max: ${range.max}, Price: ${transactionPrice}`);
                    
                    // Check if transaction price falls within the current range
                    if (transactionPrice >= range.min && transactionPrice <= range.max) {
                        console.log(`Price ${transactionPrice} falls into range: ${range.label}`); // Log successful match
                        range.count += 1; // Increment the count for the corresponding range
                    } else {
                        console.log(`Price ${transactionPrice} does NOT fall into range: ${range.label}`); // Log failure to match
                    }
                });
            }
        });

        // Log final barChartData for debugging
        console.log('Final Bar Chart Data:', barChartData);

        // Respond with the bar chart data, filtering to only include label and count
        const response = barChartData.map(({ label, count }) => ({ label, count }));
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching bar chart data:", error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching bar chart data', error: error.message });
    }
};
