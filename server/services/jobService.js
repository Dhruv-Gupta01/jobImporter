const axios = require('axios');
const parseXml = require('../utils/xmlToJson');
const jobQueue = require('../queues/jobQueue');

const jobFeeds = [
  'https://jobicy.com/?feed=job_feed',
  'https://jobicy.com/?feed=job_feed&job_categories=data-science',
  // Add more feeds
];

async function fetchAndQueueJobs() {
  let totalJobs = 0;
  for (const url of jobFeeds) {
    try {
      const { data } = await axios.get(url);
      const json = await parseXml(data);
      const jobs = json.rss.channel.item || [];

      totalJobs += jobs.length;

      for (const job of jobs) {
        await jobQueue.add('processJob', job); // Queue each job
      }
    } catch (err) {
      console.error(`Error fetching from ${url}`, err);
    }
  }
  console.log("Total jobs fetched : ", totalJobs);

  return totalJobs;
}

module.exports = { fetchAndQueueJobs };
