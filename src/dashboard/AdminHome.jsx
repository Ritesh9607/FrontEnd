import React from 'react';
import { Users, UserPlus, ClipboardList, Activity } from 'lucide-react';
import './AdminHome.css';

const AdminHome = () => {
  return (
    <div className="admin-content">
      <header className="dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Managed Endpoints: User Control & System Auditing</p>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><Users /></div>
          <div className="stat-data">
            <span className="label">Total Users</span>
            <span className="number">Fetch via /api/users</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon yellow"><UserPlus /></div>
          <div className="stat-data">
            <span className="label">Internal Officers</span>
            <span className="number">Active Role: OFFICER</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><ClipboardList /></div>
          <div className="stat-data">
            <span className="label">Logs Recorded</span>
            <span className="number">Fetch via /api/v1/audit/logs</span>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="card-header">
          <h3>System Audit Preview</h3>
          <button className="btn-view">View All</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Actor Email</th>
              <th>Action performed</th>
              <th>Target ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin@gov.in</td>
              <td><span className="badge-action">DELETE_USER</span></td>
              <td>User_104</td>
              <td><span className="status-success">COMPLETED</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;