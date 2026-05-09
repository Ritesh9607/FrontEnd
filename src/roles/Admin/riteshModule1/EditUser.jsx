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
    email: ""
  });

  const [loading, setLoading] = useState(false);

  // ✅ FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:9091/api/users/getuserbyid/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setFormData({
          username: res.data.username || "",
          email: res.data.email || "",
        });

      } catch (err) {
        toast.error("Failed to load user ❌");
      }
    };

    fetchUser();
  }, [id]);

  // ✅ INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SUBMIT (NO ROLE SENT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(
        `http://localhost:9091/api/users/${id}`,
        {
          username: formData.username,
          email: formData.email
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
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
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
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="form-actions">
            <button type="submit" className="btn save-btn">
              {loading ? "Saving..." : "Save"}
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