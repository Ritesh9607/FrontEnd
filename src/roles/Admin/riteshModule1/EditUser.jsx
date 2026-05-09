import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  // ✅ FIXED FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9091/api/users/getuserbyid/${id}`, // ✅ FIXED
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("User loaded:", res.data);

        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
          role: res.data.role || "",
        });

      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Failed to load user ❌");
      }
    };

    fetchUser();
  }, [id]);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:9091/api/users/${id}`,
        {
          username: formData.username,
          email: formData.email,
          role: {
            roleName: formData.role,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("User updated ✅");
      navigate("/admin/users");

    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="edit-user-container">

      <div className="edit-card">
        <h2>Edit User</h2>

        <form onSubmit={handleSubmit} className="edit-form">

          <label>Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_COMPLIANCE_OFFICER">
              Compliance Officer
            </option>
            <option value="ROLE_CITIZEN">Citizen</option>
             <option value="ROLE_FINANCIAL_OFFICER">
              Financial Officer
            </option>
             <option value="ROLE_PROGRAM_MANAGER">
              Program Manager
            </option>
             <option value="ROLE_GOVERNMENT_AUDITOR">
              Government Auditor
            </option>
          </select>

          <div className="form-actions">
            <button type="submit" className="btn save-btn">
              Save
            </button>

            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => navigate("/admin/users")}
            >
              Cancel
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default EditUser;