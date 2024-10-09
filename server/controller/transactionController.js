const axios = require('axios');
const Transaction = require('../models/transaction');


exports.seedData = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        let transactions = response.data.map(transaction => ({
            ...transaction,
            dateOfSale: new Date(transaction.dateOfSale) // Convert string to Date
        }));

        // Log the fetched transactions for debugging
       // console.log('Fetched Data: ', transactions.slice(0, 5)); // Log first 5 items

        // Optionally clear existing data or handle based on your requirements
        await Transaction.deleteMany();  // Clear the collection before seeding

        try {
            await Transaction.insertMany(transactions);  // Seed new data
        } catch (dbError) {
            console.error('Database Insertion Error:', dbError.message);
            return res.status(500).json({ message: 'Error inserting data', error: dbError.message });
        }

        res.status(200).json({ message: 'Database seeded successfully!' });
    } catch (error) {
        console.error('Error: ', error); // Log any errors
        res.status(500).json({ message: 'Error seeding database', error: error.message });
    }
};







