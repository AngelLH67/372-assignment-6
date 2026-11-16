// Import Express
const express = require("express");

// Create a router
const router = express.Router();

// Import the trivia controller
const triviaController = require("../controllers/triviaController");

// Get all topics
router.get("/topics", triviaController.getAllTopics);

// Get questions for a specific topic
router.get("/topic/:topic", triviaController.getQuestionsByTopic);

// Get a random question
router.get("/random", triviaController.getRandomQuestion);

// Check an answer
router.post("/answer", triviaController.checkAnswer);

// Add a new question
router.post("/question/add", triviaController.addQuestion);

// Export the router
module.exports = router;