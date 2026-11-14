
-- Insert the topics
INSERT INTO topics (name)
VALUES ('science'), ('geography')
ON CONFLICT (name) DO NOTHING;

-- Insert science questions
INSERT INTO questions (topic_id, question, answer, difficulty)
SELECT id, 'What planet is known as the Red Planet?', 'Mars', 'easy'
FROM topics WHERE name = 'science';

INSERT INTO questions (topic_id, question, answer, difficulty)
SELECT id, 'What is the chemical symbol for gold?', 'Au', 'medium'
FROM topics WHERE name = 'science';

INSERT INTO questions (topic_id, question, answer, difficulty)
SELECT id, 'What is the powerhouse of the cell?', 'Mitochondria', 'easy'
FROM topics WHERE name = 'science';

-- Insert geography questions
INSERT INTO questions (topic_id, question, answer, difficulty)
SELECT id, 'What is the capital of Australia?', 'Canberra', 'medium'
FROM topics WHERE name = 'geography';

INSERT INTO questions (topic_id, question, answer, difficulty)
SELECT id, 'Which river flows through Cairo?', 'The Nile', 'easy'
FROM topics WHERE name = 'geography';
