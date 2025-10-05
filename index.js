const express = require('express');
const { Pool } = require('pg');
const redis = require('redis');

const app = express();
app.use(express.json());

// Postgres
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
app.get('/test-pg', async (req, res) => {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows);
});

// Redis
const redisClient = redis.createClient({ url: process.env.REDIS_URL });
redisClient.connect();
app.get('/test-redis', async (req, res) => {
    await redisClient.set('key', 'value');
    const value = await redisClient.get('key');
    res.json({ key: value });
});

app.listen(process.env.PORT || 3000, () => console.log('Server running'));
