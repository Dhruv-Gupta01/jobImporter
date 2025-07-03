# 🚀 MERN Job Importer System (with Queue, MongoDB, and Cron)

A scalable job importing system that fetches jobs from public XML APIs, processes them through a Redis-powered background queue, stores them in MongoDB, and logs import history — all visible via a clean Next.js admin dashboard.

---

## 📦 Features

- ⏱️ Scheduled Cron Job (every hour)
- 🌐 Fetches jobs from multiple XML feeds
- 🔁 Converts XML → JSON
- 📥 Queues jobs using Redis + Bull
- ⚙️ Worker processes handle insertion/updating of jobs
- 🗂️ Tracks import stats: total, new, updated, failed
- 📊 Admin dashboard to view import history (Next.js)

---

## 🧱 Tech Stack

| Layer      | Technology        |
|------------|-------------------|
| Frontend   | Next.js (React)   |
| Backend    | Node.js + Express |
| Queue      | Redis + Bull      |
| Database   | MongoDB + Mongoose|
| Cron       | node-cron         |
| Parser     | xml2js            |

---


## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/jobImporter.git
cd jobImporter

2. Setup Backend
cd server
npm install
Create .env (if needed):

MONGODB_URI=mongodb://localhost:27017/jobboard
REDIS_URL=redis://localhost:6379
Run Backend Server
node index.js

3. Setup Frontend
cd ../client
npm install
npm run dev
Visit: http://localhost:3000/import-logs

4. Run the Worker
In a new terminal:

cd server
node workers/jobWorker.js
🕐 Cron Job

The backend includes a cron that runs every hour and automatically:

Fetches job XML feeds
Converts and queues jobs
You can also manually trigger it in server/index.js for testing:

const { fetchAndQueueJobs } = require('./services/jobService');
fetchAndQueueJobs();

📊 Import History UI

Accessible at:

http://localhost:3000/import-logs
Displays:

Timestamp
Total jobs fetched
New jobs inserted
Updated jobs
Failed jobs (with reasons)
🧠 Design Decisions

See full architecture breakdown and flow diagrams in:

/docs/architecture.md
🛡️ Notes

Jobs are deduplicated via jobId (from <guid>)
Redis is required for queue processing
MongoDB Atlas and Redis Cloud can be used for production
.env files are excluded via .gitignore

🤝 Author

Dhruv Gupta


📄 License

MIT – Feel free to use and modify.


---
