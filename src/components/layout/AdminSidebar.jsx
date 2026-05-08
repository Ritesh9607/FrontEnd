import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, UserPlus, Users, ClipboardList, Menu, ChevronLeft } from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Create Officer', icon: <UserPlus size={20} />, path: '/admin/create-officer' },
    { name: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Audit Logs', icon: <ClipboardList size={20} />, path: '/admin/audit-logs' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`} style={{ zIndex: 1000 }}>
      <div className="sidebar-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          {isOpen ? <ChevronLeft size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink 
            to={item.path} 
            key={item.name} 
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <div className="icon-wrapper">{item.icon}</div>
            {isOpen && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;