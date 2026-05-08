import React from 'react';
import { Users, ShieldAlert, Activity, UserCheck } from 'lucide-react';
import './AdminHome.css'; // ✅ Ensure this file is in the same folder

const AdminHome = () => {
  const logs = [
    { id: '101', user: 'Admin_Ref', action: 'Created Internal Officer', time: '5m ago' },
    { id: '102', user: 'System', action: 'Database Backup', time: '1h ago' },
  ];

  return (
    <div className="admin-main-content">
      <header className="content-header">
        <h2>System Dashboard</h2>
        <p>Overview of National Financial Regulation activity</p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon blue"><Users /></div>
          <div><p>Citizens</p><h4>1,240</h4></div>
        </div>
        <div className="stat-card">
          <div className="icon orange"><UserCheck /></div>
          <div><p>Officers</p><h4>42</h4></div>
        </div>
        <div className="stat-card">
          <div className="icon green"><Activity /></div>
          <div><p>Daily Logs</p><h4>156</h4></div>
        </div>
      </div>

      <div className="activity-section">
        <h4>Recent Activity</h4>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Identity</th>
              <th>Action</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>#{log.id}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;