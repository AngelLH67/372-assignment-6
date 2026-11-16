// Import Express
const express = require("express");

// Import the trivia routes
const triviaRoutes = require("./routes/triviaRoutes");

// Create the Express application
const app = express();

// Allow the server to read JSON request bodies
app.use(express.json());

// Connect the trivia routes
app.use("/triviabook", triviaRoutes);

// Set the server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});