import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Image,
  Upload,
  Settings,
  Coins
} from "lucide-react";

import "./Sidebar.css";

function Sidebar({ collapsed = false }) {
  const menu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/"
    },
    {
      label: "Metadata Generator",
      icon: FileText,
      path: "/metadata"
    },
    {
      label: "Duplicate Detector",
      icon: Layers,
      path: "/duplicate-detector"
    },
    {
      label: "Image Upscaler",
      icon: Image,
      path: "/upscale"
    },
    {
      label: "Upload Manager",
      icon: Upload,
      path: "/uploads"
    }
  ];

  return (
    <motion.aside
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
      initial={{ x: -60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* LOGO */}
      <div className="sidebar-header">
        <h2 className="logo">MetaForge</h2>
      </div>

      {/* NAV */}
      <nav className="sidebar-nav">
        {menu.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Icon size={20} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* FOOTER */}
      <div className="sidebar-footer">
        <div className="token-box">
          <Coins size={18} />
          {!collapsed && (
            <div>
              <strong>Tokens</strong>
              <p>50 / 50</p>
            </div>
          )}
        </div>

        <NavLink to="/settings" className="nav-item settings">
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </NavLink>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
