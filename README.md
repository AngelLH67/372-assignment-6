# Triviabook API

## Description

Triviabook is a trivia API built with Node.js, Express, and PostgreSQL. It allows users to retrieve trivia questions, check answers, and add new questions.

**Live API:** https://triviabook.onrender.com 
The API endpoints can be accessed by adding their paths to the base URL.

## Database Schema

The database contains two tables:

**topics**
- `id` - SERIAL PRIMARY KEY
- `name` - VARCHAR(100), UNIQUE, NOT NULL

**questions**
- `id` - SERIAL PRIMARY KEY
- `topic_id` - INTEGER, FOREIGN KEY referencing `topics(id)`
- `question` - TEXT, NOT NULL
- `answer` - TEXT, NOT NULL
- `difficulty` - VARCHAR(10), restricted to easy, medium, or hard

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/AngelLH67/triviabook.git
   ```

2. Navigate into the project folder:

   ```bash
   cd triviabook
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the project folder and add your Neon database connection:

   ```env
   DATABASE_URL=your_neon_connection_string
   ```

5. Run `schema.sql` and `seed.sql` from the `db` folder in your PostgreSQL database.

6. Start the server:

   ```bash
   node server.js
   ```

The API will run at `http://localhost:3000`.

## API Endpoints

All endpoints use `/triviabook` as the base path.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/triviabook/topics` | Retrieves all topics |
| GET | `/triviabook/topic/:topic` | Retrieves questions for a topic; supports optional `limit` and `difficulty` filters |
| GET | `/triviabook/random` | Retrieves a random question without its answer |
| POST | `/triviabook/answer` | Checks whether a submitted answer is correct |
| POST | `/triviabook/question/add` | Adds a new question and creates the topic if needed |

## Notes

- Keep your `.env` file  private. Do not commit it to GitHub.
- The `.gitignore` file excludes `.env` and `node_modules`.