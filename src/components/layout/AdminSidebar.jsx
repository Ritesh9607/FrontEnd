import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  ClipboardList, 
  LogOut,
  ShieldCheck 
} from 'lucide-react';
import './AdminSidebar.css';

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Create Officer', icon: <UserPlus size={20} />, path: '/admin/create-officer' },
    { name: 'User Management', icon: <Users size={20} />, path: '/admin/users' },
    { name: 'Audit Logs', icon: <ClipboardList size={20} />, path: '/admin/audit-logs' },
  ];

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    navigate('/login');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <Menu size={22} />
      </button>

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

      <div className="sidebar-footer">
        <div className="admin-session-card">
          {isOpen ? (
            <>
              <div className="session-info">
                <ShieldCheck size={16} className="text-yellow" />
                <span className="session-text">Admin Active</span>
              </div>
              <button className="logout-btn-sidebar" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <button className="logout-icon-only" onClick={handleLogout}>
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;