# Dashboard Application

A full-stack dashboard application that displays various statistics, a bar chart, pie chart, and transaction data for a given month. This project uses **React** on the frontend and **Node.js** with **Express** and **MongoDB** for the backend.

---

## Technologies Used

- **Frontend**:
  - React.js
  - Bootstrap (for UI)
  - Chart.js (for charts)
  - Axios (for API calls)
  - React-Bootstrap (for responsive layout)
  
- **Backend**:
  - Node.js
  - Express
  - MongoDB (for storing transaction data)
  - Mongoose (for MongoDB data modeling)
  
- **Deployment**:
  - AWS (EC2, S3 for static files)

---

## Features

- **Dropdown**: Allows users to select the month for viewing data.
- **Statistics**: Displays the total sales amount, total sold items, and total unsold items for the selected month.
- **Bar Chart**: Shows a bar chart of the number of items sold within specific price ranges.
- **Pie Chart**: Displays the distribution of items sold across different categories.
- **Transactions Table**: Displays all transactions for the selected month, with pagination support.

---

## Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
Install required dependencies:
bash
Copy
npm install
2. Configure MongoDB Connection
Ensure that MongoDB is installed and running locally, or set up a MongoDB Atlas instance for cloud storage.
Update your server.js to use the correct MongoDB URI:

javascript
Copy
mongoose.connect('mongodb://localhost:27017/your-db-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
3. Run the Backend Locally
To start the backend server, run:

bash
Copy
node server.js
The server will run on http://localhost:5000.

Frontend Setup
1. Install Dependencies
Navigate to the frontend directory:

bash
Copy
cd frontend
Install required dependencies:

bash
Copy
npm install
2. Running the Frontend Locally
Start the React development server:

bash
Copy
npm start
The frontend will be running on http://localhost:3000.

3. Update API Base URL
Ensure that the base URL for API calls is set correctly in your api.js file:

javascript
Copy
const api = axios.create({
    baseURL: "http://localhost:5000/api", // Ensure this is the correct backend URL
});
Running the Application Locally
1. Start the Backend Server
Run the following command in the backend directory:

bash
Copy
node server.js
2. Start the Frontend Server
In the frontend directory, run:

bash
Copy
npm start
Now open http://localhost:3000 in your browser. The frontend will fetch data from the backend and display it.