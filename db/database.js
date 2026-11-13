
// Load environment variables from .env
require("dotenv").config();

// Import PostgreSQL
const { Pool } = require("pg");

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
