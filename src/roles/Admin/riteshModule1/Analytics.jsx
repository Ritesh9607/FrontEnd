import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Analytics.css";

const Analytics = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("http://localhost:9091/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    };

    fetchUsers();
  }, []);

  /* =====================
     CALCULATED ANALYTICS
  ====================== */
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "ACTIVE").length;
  const inactiveUsers = users.filter(u => u.status === "INACTIVE").length;

  const adminCount = users.filter(u => u.role === "ROLE_ADMIN").length;
  const officerCount = users.filter(
    u => u.role === "ROLE_COMPLIANCE_OFFICER"
  ).length;
  const citizenCount = users.filter(
    u => u.role === "ROLE_CITIZEN"
  ).length;

  const activePercent =
    totalUsers === 0 ? 0 : Math.round((activeUsers / totalUsers) * 100);
  const inactivePercent = 100 - activePercent;

  return (
    <div className="analytics-page">

      {/* HEADER */}
      <div className="analytics-header">
        <h2>System Analytics</h2>
        <p>Computed using User Management data</p>
      </div>

      {/* KPI CARDS */}
      <div className="analytics-cards">

        <div className="analytics-card blue">
          <h3>{totalUsers}</h3>
          <p>Total Users</p>
        </div>

        <div className="analytics-card green">
          <h3>{activeUsers}</h3>
          <p>Active Users</p>
        </div>

        <div className="analytics-card red">
          <h3>{inactiveUsers}</h3>
          <p>Inactive Users</p>
        </div>

        <div className="analytics-card orange">
          <h3>{officerCount}</h3>
          <p>Compliance Officers</p>
        </div>

      </div>

      {/* DONUT ANALYTICS */}
      <div className="analytics-section">
        <h3>Active vs Inactive Users</h3>

        <div className="donut-wrapper">
          <div
            className="donut"
            style={{
              background: `conic-gradient(
                #198754 ${activePercent}%,
                #dc3545 ${activePercent}% 100%
              )`
            }}
          >
            <div className="donut-center">
              {activePercent}%<br />
              Active
            </div>
          </div>

          <div className="donut-legend">
            <div>
              <span className="dot green"></span> Active ({activeUsers})
            </div>
            <div>
              <span className="dot red"></span> Inactive ({inactiveUsers})
            </div>
          </div>
        </div>
      </div>

      {/* ROLE BAR ANALYTICS */}
      <div className="analytics-section">
        <h3>Users by Role</h3>

        <div className="bar-group">

          <div className="bar-row">
            <span>Admin</span>
            <div className="bar">
              <div
                className="bar-fill blue"
                style={{ width: `${(adminCount / totalUsers) * 100 || 0}%` }}
              />
            </div>
            <span>{adminCount}</span>
          </div>

          <div className="bar-row">
            <span>Officer</span>
            <div className="bar">
              <div
                className="bar-fill orange"
                style={{ width: `${(officerCount / totalUsers) * 100 || 0}%` }}
              />
            </div>
            <span>{officerCount}</span>
          </div>

          <div className="bar-row">
            <span>Citizen</span>
            <div className="bar">
              <div
                className="bar-fill green"
                style={{ width: `${(citizenCount / totalUsers) * 100 || 0}%` }}
              />
            </div>
            <span>{citizenCount}</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Analytics;