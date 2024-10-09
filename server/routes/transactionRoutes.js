const express = require('express');
const { seedData } = require('../controller/transactionController');
const { getStatistics } = require('../controller/statistics');
const { getTransactions } = require('../controller/paginationtransaction');
const { getPieChartData } = require('../controller/piechart');
const { getBarChartData } = require('../controller/barchart');
const { getCombinedData } = require('../controller/combineddata.js');

const router = express.Router();

// Route to seed the database
router.get('/seed', seedData);

// Route for all transactions (pagination and search)
router.get('/', getTransactions);

// Route for all statistics
router.get('/statistics', getStatistics);

// Route for bar chart API
router.get('/barchart', getBarChartData);

// Route for pie chart API
router.get('/piechart', getPieChartData);

// Route to get all chart data together
router.get('/combineanalysis', getCombinedData);

// Export the router
module.exports = router;
