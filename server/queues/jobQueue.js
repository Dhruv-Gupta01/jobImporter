const Queue = require('bull');
const Redis = require('ioredis');

const redisClient = new Redis();

const jobQueue = new Queue('jobQueue', {
  redis: redisClient
});

module.exports = jobQueue;
