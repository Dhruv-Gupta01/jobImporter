const mongoose = require('mongoose');

const importLogSchema = new mongoose.Schema({
  timestamp: Date,
  totalFetched: Number,
  totalImported: Number,
  newJobs: Number,
  updatedJobs: Number,
  failedJobs: [{ jobId: String, reason: String }]
});

module.exports = mongoose.model('ImportLog', importLogSchema);
