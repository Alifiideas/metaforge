import Sidebar from "../layout/Sidebar";
import Topbar from "../layout/Topbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

import "./Layout.css";

function Layout({ tokens = 50, plan = "Free" }) {
  return (
    <div className="layout">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="layout-main">
        <Topbar tokens={tokens} plan={plan} />

        <motion.main
          className="layout-content"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}

export default Layout;
