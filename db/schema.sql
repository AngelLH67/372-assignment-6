
-- Create the topics table
CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create the questions table
CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty VARCHAR(10) NOT NULL
        CHECK (difficulty IN ('easy', 'medium', 'hard'))
);
