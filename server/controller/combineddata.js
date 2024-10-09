const Transaction = require('../models/transaction');
const { getPieChartData } = require('./piechart'); // Adjust the path as necessary
const { getStatistics } = require('./statistics'); // Adjust the path as necessary
const { getBarChartData } = require('./barchart'); // Adjust the path as necessary

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

exports.getCombinedData = async (req, res) => {
    const { month } = req.query;

    // Validate month input
    if (!month || !monthMap[month]) {
        return res.status(400).json({ message: 'Invalid month. Please provide a month as a word (e.g., "January").' });
    }

    try {
        // Fetch pie chart data
        const pieChartResponse = await new Promise((resolve, reject) => {
            getPieChartData(req, { json: resolve, status: (code) => ({ json: resolve }) }, reject);
        });

        // Fetch statistics
        const statisticsResponse = await new Promise((resolve, reject) => {
            getStatistics(req, { json: resolve, status: (code) => ({ json: resolve }) }, reject);
        });

        // Fetch bar chart data
        const barChartResponse = await new Promise((resolve, reject) => {
            getBarChartData(req, { json: resolve, status: (code) => ({ json: resolve }) }, reject);
        });

        // Combine all responses
        const combinedResponse = {
            pieChartData: pieChartResponse,
            statistics: statisticsResponse,
            barChartData: barChartResponse,
        };

        // Respond with the combined data
        res.status(200).json(combinedResponse);
    } catch (error) {
        console.error("Error fetching combined data:", error); // Log error for debugging
        res.status(500).json({ message: 'Error fetching combined data', error: error.message });
    }
};
