import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./UsersPage.css";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;
  const navigate = useNavigate();

  // ✅ FETCH USERS
 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9091/api/users", // ✅ FIXED
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Users:", res.data);

      setUsers(res.data);
      setFilteredUsers(res.data);

    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to load users ❌");
    }
  };

  fetchUsers();
}, []);


  // ✅ FILTER + SEARCH
  useEffect(() => {
    let data = users;

    if (filter !== "ALL") {
      data = data.filter((u) => u.status === filter);
    }

    if (search) {
      data = data.filter(
        (u) =>
          u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredUsers(data);
    setCurrentPage(1);
  }, [search, filter, users]);

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:9091/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.userId === id ? { ...u, status: "INACTIVE" } : u
        )
      );

      toast.success("User deactivated ✅");
    } catch {
      toast.error("Operation failed ❌");
    }
  };

  // ✅ RESTORE
  const handleRestore = async (id) => {
    try {
      await axios.put(
        `http://localhost:9091/api/users/${id}/status?status=ACTIVE`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u.userId === id ? { ...u, status: "ACTIVE" } : u
        )
      );

      toast.success("User restored ✅");
    } catch {
      toast.error("Restore failed ❌");
    }
  };

  // ✅ PAGINATION
  const indexOfLast = currentPage * USERS_PER_PAGE;
  const indexOfFirst = indexOfLast - USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  return (
    <div className="users-page">

      <h2>User Management</h2>

      {/* ✅ SEARCH + FILTER */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* ✅ TABLE */}
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
            {currentUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-state">
                  No users found
                </td>
              </tr>
            ) : (
              currentUsers.map((user) => (
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

                  {/* ✅ ACTIONS */}
                  <td className="action-cell">

                    {/* ✅ VIEW */}
                    <button
                      className="btn view-btn"
                      onClick={() =>
                        navigate(`/admin/users/${user.userId}`)
                      }
                    >
                      View
                    </button>

                    {/* ✅ EDIT */}
                    <button
                      className="btn edit-btn"
                      onClick={() =>
                        navigate(`/admin/users/edit/${user.userId}`)
                      }
                    >
                      Edit
                    </button>

                    {/* ✅ ROLE BASED */}
                    {user.role === "ROLE_ADMIN" ? (
                      <button
                        className="btn lock-btn"
                        disabled
                        title="Admin cannot be modified"
                      >
                        Protected
                      </button>
                    ) : user.status === "ACTIVE" ? (
                      <button
                        className="btn delete-btn"
                        onClick={() =>
                          handleDelete(user.userId)
                        }
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        className="btn restore-btn"
                        onClick={() =>
                          handleRestore(user.userId)
                        }
                      >
                        Restore
                      </button>
                    )}

                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* ✅ PAGINATION */}
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