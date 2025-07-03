const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  company: String,
  location: String,
  description: String,
  postedDate: Date,
  // Add other fields from the XML
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
