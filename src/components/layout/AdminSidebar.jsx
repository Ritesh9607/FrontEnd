import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, LayoutDashboard, UserPlus, Users, History, ShieldCheck } from 'lucide-react';
import './AdminSidebar.css'; // ✅ Make sure this file name matches

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={22} />, path: '/admin/dashboard' },
    { name: 'Internal Officers', icon: <UserPlus size={22} />, path: '/admin/officers' },
    { name: 'Citizen Registry', icon: <Users size={22} />, path: '/admin/citizens' },
    { name: 'Activity Logs', icon: <History size={22} />, path: '/admin/logs' },
    { name: 'Compliance', icon: <ShieldCheck size={22} />, path: '/admin/compliance' },
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-top">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        {isOpen && <span className="brand-name">ADMIN PANEL</span>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink to={item.path} key={item.name} className="nav-item">
            <div className="icon-wrapper">{item.icon}</div>
            {isOpen && <span className="link-text">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {isOpen && (
        <div className="sidebar-footer">
          <small>FinanceGov v1.0</small>
        </div>
      )}
    </aside>
  );
};

export default AdminSidebar;