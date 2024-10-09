MERN Stack Transactions Dashboard
A full-stack MERN (MongoDB, Express, React, Node.js) application to visualize transaction data with various charts and statistics. The app features a dashboard that allows users to select a month and view detailed transaction data, statistics, a pie chart by category, and a bar chart by price range.

Features
Transaction Table: List all transactions with pagination and search functionality.
Statistics: Display total sales, sold items, and unsold items for a selected month.
Pie Chart: Visualize transactions by category for the selected month.
Bar Chart: Visualize transactions by price range for the selected month.
Responsive Design: The dashboard is responsive and adapts to various screen sizes (desktop, tablet, and mobile).
Technologies Used
Frontend:
React.js (with hooks for state management)
Axios (for API requests)
Chart.js (for data visualization)
CSS (with media queries for responsive design)
Backend:
Node.js
Express.js (for REST API endpoints)
MongoDB (for storing transactions data)
Mongoose (for MongoDB object modeling)
Luxon (for date handling)
Setup Instructions
1. Clone the Repository
bash
Copy code
git clone https://github.com/your-username/mern-transactions-dashboard.git
cd mern-transactions-dashboard
2. Install Dependencies
Backend Setup
Navigate to the backend directory:

bash
Copy code
cd server
Install dependencies:

bash
Copy code
npm install
Create a .env file in the server directory and add the following environment variables:

bash
Copy code
MONGO_URI=your-mongodb-connection-string
PORT=5000
Start the backend server:

bash
Copy code
npm run dev
The backend will run on http://localhost:5000.

Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd client
Install dependencies:

bash
Copy code
npm install
Ensure the proxy setup is correct in the package.json of the React app:

json
Copy code
{
  "name": "mern-transactions-dashboard",
  "version": "1.0.0",
  "proxy": "http://localhost:5000"
}
Start the React app:

bash
Copy code
npm start
The frontend will run on http://localhost:3000.

3. MongoDB Setup
If you don’t have MongoDB installed, follow MongoDB Installation Instructions.
Alternatively, you can use MongoDB Atlas for a cloud-based solution. Add your MongoDB URI to the .env file as MONGO_URI.
4. Seeding Data (Optional)
To seed the database with some initial transaction data, you can create a seed script or fetch data from a third-party API (if implemented).

Example seed script:

bash
Copy code
# Run this command inside the server directory
npm run seed
Available API Endpoints
GET /api/transactions

Fetch transactions with pagination and search.
Query Params: page, perPage, search, month.
GET /api/transactions/statistics

Fetch statistics (total sales, sold items, unsold items) for a specific month.
Query Params: month.
GET /api/transactions/pie-chart

Fetch data for pie chart visualization by category.
Query Params: month.
GET /api/transactions/bar-chart

Fetch data for bar chart visualization by price range.
Query Params: month.
Project Structure
bash
Copy code
mern-transactions-dashboard/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components (TransactionTable, Statistics, PieChart, BarChart)
│   │   ├── App.js          # Main application file
│   │   ├── App.css         # Global styles
│   └── package.json        # Frontend dependencies
├── server/                 # Express backend
│   ├── models/             # Mongoose models (e.g., Transaction.js)
│   ├── routes/             # API routes
│   ├── controllers/        # API controllers
│   ├── app.js              # Main Express app
│   └── package.json        # Backend dependencies
├── README.md               # Project README file
└── .env                    # Environment variables for backend
