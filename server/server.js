const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

mongodb://root:12345@127.0.0.1:27017/Roxiler
mongoose.connect('mongodb+srv://bhendekunal71:mongodpure1234@cluster0.dxfb8.mongodb.net/Roxiler?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
