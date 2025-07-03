const jobQueue = require('../queues/jobQueue');
const Job = require('../models/Job');
const ImportLog = require('../models/ImportLog');

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dhruv12:GV1COx01Npl0mX1v@cluster0.ddbdyvt.mongodb.net/jobboard', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Worker connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error in worker:", err));


let stats = {
  total: 0,
  new: 0,
  updated: 0,
  failed: []
};

process.on('unhandledRejection', err => {
    console.error('Unhandled Rejection in worker:', err);
  });
  

jobQueue.process('processJob', 5, async (job) => {
  console.log("Processing job : ", job.data.title);
  const jobData = job.data;
  stats.total++;

  try {
    const jobId = typeof jobData.guid === 'object' ? jobData.guid._ : jobData.guid;
    const existing = await Job.findOne({ jobId });

    if (existing) {
      await Job.updateOne({ jobId: jobData.guid }, jobData);
      stats.updated++;
    } else {
      await Job.create({
        jobId: jobData.guid,
        title: jobData.title,
        company: jobData['job:company'] || 'Unknown',
        location: jobData['job:location'] || '',
        description: jobData.description,
        postedDate: new Date(jobData.pubDate)
      });
      stats.new++;
    }
  } catch (err) {
    stats.failed.push({ jobId, reason: err.message });
  }
});
 
// On job queue completion
jobQueue.on('drained', async () => {
  console.log("Job queue drained");
  await ImportLog.create({
    timestamp: new Date(),
    totalFetched: stats.total,
    totalImported: stats.new + stats.updated,
    newJobs: stats.new,
    updatedJobs: stats.updated,
    failedJobs: stats.failed
  });

  // Reset stats
  stats = { total: 0, new: 0, updated: 0, failed: [] };
});
