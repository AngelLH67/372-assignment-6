
// Import the database connection
const pool = require("../db/database");

// Get all topics from the database
async function getAllTopics() {
    const result = await pool.query(
        "SELECT * FROM topics ORDER BY name"
    );

    return result.rows;
}

// Check whether a topic exists
async function getTopicByName(topic) {
    const result = await pool.query(
        "SELECT * FROM topics WHERE name = $1",
        [topic]
    );

    return result.rows[0];
}

// Get all questions for a specific topic
async function getQuestionsByTopic(topic, limit, difficulty) {
    let query = `
        SELECT questions.id, topics.name AS topic,
               questions.question, questions.answer,
               questions.difficulty
        FROM questions
        JOIN topics ON questions.topic_id = topics.id
        WHERE topics.name = $1
    `;

    const values = [topic];

    // Filter by difficulty if provided
    if (difficulty) {
        values.push(difficulty);
        query += ` AND questions.difficulty = $${values.length}`;
    }

    // Limit the number of questions if provided
    if (limit !== undefined && limit !== null) {
        values.push(limit);
        query += ` LIMIT $${values.length}`;
    }

    const result = await pool.query(query, values);

    return result.rows;
}

// Get one random question without its answer
async function getRandomQuestion() {
    const result = await pool.query(`
        SELECT questions.id, topics.name AS topic,
               questions.question, questions.difficulty
        FROM questions
        JOIN topics ON questions.topic_id = topics.id
        ORDER BY RANDOM()
        LIMIT 1
    `);

    return result.rows[0];
}

// Check whether a submitted answer is correct
async function checkAnswer(id, guess) {
    const result = await pool.query(
        "SELECT answer FROM questions WHERE id = $1",
        [id]
    );

    // Return null if the question does not exist
    if (result.rows.length === 0) {
        return null;
    }

    const correctAnswer = result.rows[0].answer;

    // Compare answers without considering capitalization or extra spaces
    const correct =
        guess.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

    return {
        correct: correct,
        answer: correctAnswer
    };
}

// Add a new question and create its topic if necessary
async function addQuestion(topic, question, answer, difficulty) {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Create the topic if it does not already exist
        await client.query(
            `INSERT INTO topics (name)
             VALUES ($1)
             ON CONFLICT (name) DO NOTHING`,
            [topic]
        );

        // Find the topic ID
        const topicResult = await client.query(
            "SELECT id FROM topics WHERE name = $1",
            [topic]
        );

        const topicId = topicResult.rows[0].id;

        // Insert the new question
        await client.query(
            `INSERT INTO questions (topic_id, question, answer, difficulty)
             VALUES ($1, $2, $3, $4)`,
            [topicId, question, answer, difficulty]
        );

        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }

    // Return the updated questions for this topic
    return getQuestionsByTopic(topic);
}

// Export the model functions so the controller can use them
module.exports = {
    getAllTopics,
    getTopicByName,
    getQuestionsByTopic,
    getRandomQuestion,
    checkAnswer,
    addQuestion
};
