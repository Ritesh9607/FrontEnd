import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CreateOfficer.css";

const checkStrength = (password) => {
  const rules = {
    length: password.length >= 10,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[@#$%^&+=!]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  let level = "Weak";
  if (score >= 4) level = "Medium";
  if (score === 5) level = "Strong";

  return { rules, score, level };
};

const CreateOfficer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const strength = checkStrength(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select a role ❌");
      return;
    }

    if (strength.level !== "Strong") {
      toast.error("Password does not meet security requirements ❌");
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        "http://localhost:9091/api/admin/create-internal-user",
        {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Internal user created successfully ✅");

      setFormData({
        username: "",
        email: "",
        phone: "",
        role: "",
        password: "",
      });

    } catch {
      toast.error("Failed to create internal user ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-officer-page">

      <h2>Create Internal User</h2>
      <p>Admin onboarding for internal government roles</p>

      <form className="officer-form" onSubmit={handleSubmit}>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>Official Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          required
        />

        <label>Assign Role</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Role --</option>
          <option value="ROLE_COMPLIANCE_OFFICER">Compliance Officer</option>
         <option value="ROLE_FINANCIAL_OFFICER">Financial Officer</option>
          <option value="ROLE_PROGRAM_MANAGER">Program Manager</option>
          <option value="ROLE_GOVERNMENT_AUDITOR">Government Auditor</option>
        </select>

        <label>Temporary Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {/* ✅ PASSWORD STRENGTH INDICATOR */}
        <div className="strength-box">

          <div className={`strength-bar ${strength.level.toLowerCase()}`}>
            {strength.level}
          </div>

          <ul className="strength-list">
            <li className={strength.rules.length ? "ok" : "bad"}>
              ≥ 10 characters
            </li>
            <li className={strength.rules.upper ? "ok" : "bad"}>
              Uppercase letter
            </li>
            <li className={strength.rules.lower ? "ok" : "bad"}>
              Lowercase letter
            </li>
            <li className={strength.rules.number ? "ok" : "bad"}>
              Number
            </li>
            <li className={strength.rules.special ? "ok" : "bad"}>
              Special character (@#$%^&+=!)
            </li>
          </ul>

        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create User"}
        </button>

      </form>

    </div>
  );
};

export default CreateOfficer;