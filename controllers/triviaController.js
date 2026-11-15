// Import the trivia model
const triviaModel = require("../models/triviaModel");

// Get all topics
async function getAllTopics(req, res) {
    try {
        const topics = await triviaModel.getAllTopics();
        res.status(200).json(topics);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve topics" });
    }
}

// Get questions for a specific topic
async function getQuestionsByTopic(req, res) {
    try {
        const topic = req.params.topic;
        const limit = req.query.limit;
        const difficulty = req.query.difficulty;

        // Check whether the topic exists
        const existingTopic = await triviaModel.getTopicByName(topic);

        if (!existingTopic) {
            return res.status(404).json({
                error: "Topic not found"
            });
        }

        // Check whether the difficulty is valid
        if (difficulty && !["easy", "medium", "hard"].includes(difficulty)) {
            return res.status(400).json({
                error: "Invalid difficulty"
            });
        }

        // Check whether the limit is valid
        if (limit !== undefined &&
            (!Number.isInteger(Number(limit)) || Number(limit) < 1)) {
            return res.status(400).json({
                error: "Limit must be a positive number"
            });
        }

        const questions = await triviaModel.getQuestionsByTopic(
            topic,
            limit ? Number(limit) : undefined,
            difficulty
        );

        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve questions"
        });
    }
}

// Get one random question
async function getRandomQuestion(req, res) {
    try {
        const question = await triviaModel.getRandomQuestion();

        if (!question) {
            return res.status(404).json({
                error: "No questions available"
            });
        }

        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({
            error: "Failed to retrieve random question"
        });
    }
}

// Check whether a submitted answer is correct
async function checkAnswer(req, res) {
    try {
        const { id, guess } = req.body;

        // Check for missing parameters
        if (id === undefined || guess === undefined) {
            return res.status(400).json({
                error: "Question id and guess are required"
            });
        }

        // Check whether the question ID is valid
        if (!Number.isInteger(Number(id)) || Number(id) < 1) {
            return res.status(400).json({
                error: "Invalid question id"
            });
        }

        const result = await triviaModel.checkAnswer(Number(id), guess);

        // Check whether the question exists
        if (!result) {
            return res.status(404).json({
                error: "Question not found"
            });
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            error: "Failed to check answer"
        });
    }
}

// Add a new question
async function addQuestion(req, res) {
    try {
        const { topic, question, answer, difficulty } = req.body;

        // Check for missing parameters
        if (!topic || !question || !answer || !difficulty) {
            return res.status(400).json({
                error: "Topic, question, answer, and difficulty are required"
            });
        }

        // Check whether the difficulty is valid
        if (!["easy", "medium", "hard"].includes(difficulty)) {
            return res.status(400).json({
                error: "Difficulty must be easy, medium, or hard"
            });
        }

        // Add the question to the database
        const questions = await triviaModel.addQuestion(
            topic.trim(),
            question.trim(),
            answer.trim(),
            difficulty
        );

        res.status(201).json(questions);
    } catch (error) {
        res.status(500).json({
            error: "Failed to add question"
        });
    }
}

// Export controller functions
module.exports = {
    getAllTopics,
    getQuestionsByTopic,
    getRandomQuestion,
    checkAnswer,
    addQuestion
};