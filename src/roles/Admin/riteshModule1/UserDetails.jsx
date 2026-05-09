import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
//import "./UserDetails.css";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9091/api/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        toast.error("Failed to load user ❌");
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <p className="loading-text">Loading user...</p>;
  }

  return (
    <div className="user-details-container">

      <div className="user-header">
        <h2>User Details</h2>

        <button
          className="back-btn"
          onClick={() => navigate("/admin/users")}
        >
          ← Back
        </button>
      </div>

      <div className="user-card">

        <div className="user-row">
          <label>ID:</label>
          <span>{user.userId}</span>
        </div>

        <div className="user-row">
          <label>Name:</label>
          <span>{user.username}</span>
        </div>

        <div className="user-row">
          <label>Email:</label>
          <span>{user.email}</span>
        </div>

        <div className="user-row">
          <label>Phone:</label>
          <span>{user.phone}</span>
        </div>

        <div className="user-row">
          <label>Role:</label>
          <span className="role-badge">
            {user.role.replace("ROLE_", "")}
          </span>
        </div>

        <div className="user-row">
          <label>Status:</label>
          <span
            className={`status-badge ${
              user.status === "ACTIVE"
                ? "active"
                : "inactive"
            }`}
          >
            {user.status}
          </span>
        </div>

      </div>

    </div>
  );
};

export default UserDetails;