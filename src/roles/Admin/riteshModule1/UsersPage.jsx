import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;

  // ✅ FETCH USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:9091/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUsers(res.data);
        setFilteredUsers(res.data);
      } catch {
        toast.error("Failed to load users ❌");
      }
    };

    fetchUsers();
  }, []);

  // ✅ SEARCH + FILTER
  useEffect(() => {
    let data = users;

    if (filter !== "ALL") {
      data = data.filter(u => u.status === filter);
    }

    if (search) {
      data = data.filter(
        u =>
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUsers(data);
    setCurrentPage(1);
  }, [search, filter, users]);

  // ✅ PAGINATION
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <div className="users-page">
      <h2>User Management</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {currentUsers.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>

                <td>
                  <span className="role-badge">
                    {user.role.replace("ROLE_", "")}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      user.status === "ACTIVE"
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="action-cell">
                  <button className="btn view-btn">View</button>
                  <button className="btn edit-btn">Edit</button>

                  {user.status === "ACTIVE" ? (
                    <button className="btn delete-btn">Deactivate</button>
                  ) : (
                    <button className="btn restore-btn">Restore</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
