import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ImportLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5198/api/import-logs')
      .then((res) => {
        setLogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching import logs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading import logs...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📦 Job Import History</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Total</th>
            <th style={thStyle}>New</th>
            <th style={thStyle}>Updated</th>
            <th style={thStyle}>Failed</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index} style={{ textAlign: 'center' }}>
              <td style={tdStyle}>{new Date(log.timestamp).toLocaleString()}</td>
              <td style={tdStyle}>{log.totalFetched}</td>
              <td style={tdStyle}>{log.newJobs}</td>
              <td style={tdStyle}>{log.updatedJobs}</td>
              <td style={tdStyle}>{log.failedJobs?.length || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: '1px solid #ddd',
  padding: '8px',
  background: '#f2f2f2',
};

const tdStyle = {
  border: '1px solid #ddd',
  padding: '8px',
};
