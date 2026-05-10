import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import {
  Menu,
  ChevronLeft,
  BarChart2,
  BarChart3,
  Users,
  UserPlus,
  ClipboardList,
  Settings,
} from "lucide-react";
import "./Sidebar.css";

export const Sidebar = ({ onToggle, initialState = true }) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle(newState);
  };

  /* ✅ ADMIN MENU STRUCTURE */
  const menuSections = [
    {
      title: "MAIN",
      items: [
        { label: "Dashboard", to: "/admin/dashboard", icon: BarChart2 },
        { label: "Analytics", to: "/admin/analytics", icon: BarChart3 },
      ],
    },
    {
      title: "USER MANAGEMENT",
      items: [
        { label: "All Users", to: "/admin/users", icon: Users },
        { label: "Create Officer", to: "/admin/create-officer", icon: UserPlus },
      ],
    },
    {
      title: "SYSTEM",
      items: [
        { label: "Audit Logs", to: "/admin/audit-logs", icon: ClipboardList },
        { label: "Settings", to: "/admin/settings", icon: Settings },
      ],
    },
  ];

  return (
    <motion.aside
      className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}
      animate={{ width: isOpen ? "280px" : "80px" }}
      transition={{ duration: 0.3 }}
    >
      {/* ✅ Toggle Button */}
      <motion.button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </motion.button>

      {/* ✅ MENU */}
      <nav className="sidebar-nav">
        {menuSections.map((section, index) => (
          <div key={index} className="sidebar-section">

            {/* ✅ Section Title */}
            {isOpen && (
              <p className="sidebar-section-title">{section.title}</p>
            )}

            {/* ✅ Items */}
            {section.items.map((item, i) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={i}
                  to={item.to}
                  className={({ isActive }) =>
                    `nav-item ${isActive ? "active" : ""}`
                  }
                >
                  <Icon size={20} />

                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* ✅ FOOTER INFO */}
      {isOpen && (
        <div className="sidebar-footer">
          <p className="text-muted">System Version</p>
          <p className="version">1.0.0</p>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;