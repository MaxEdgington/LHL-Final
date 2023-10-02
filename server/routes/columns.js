const express = require('express');
const router = express.Router();
const db = require('../db/queries');

router.get('/', async (req, res) => {
  console.log("Columns Route Hit");
  try {
    const columns = await db.getColumnsWithTasks();
    res.json(columns);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;