// routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../configs/db.config'); // Adjust the path to point to your actual db config file

router.get('/', async (req, res) => {
    console.log('Tasks route hit');
    try {
        const tasks = await db.query('SELECT * FROM tasks');
        res.status(200).json(tasks.rows);
    } catch (error) {
        console.error('Error during fetching tasks:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;