const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { fetchAndQueueJobs } = require('./services/jobService');
const ImportLog = require('./models/ImportLog');
const app = express();
const cors = require('cors');

app.use(cors());

mongoose.connect('mongodb+srv://dhruv12:GV1COx01Npl0mX1v@cluster0.ddbdyvt.mongodb.net/jobboard');

app.use(express.json());

// Cron job that runs every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running cron job to fetch jobs...');
  await fetchAndQueueJobs(); // fetches job XML feeds, converts to JSON, and adds to Redis queue
});

//for testing
//fetchAndQueueJobs().then(() => console.log("Jobs queued successfully"));

// GET /api/import-logs
app.get('/api/import-logs', async (req, res) => {
    const logs = await ImportLog.find().sort({ timestamp: -1 }).limit(10);
    res.json(logs);
  });
  

app.listen(5198, () => console.log('Backend server on port 5198'));
