import { motion } from "framer-motion";
import { Bell, User, Coins, ChevronDown } from "lucide-react";
import { useState } from "react";
import "./Topbar.css";

function Topbar({ tokens = 50, plan = "Free" }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="topbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* LEFT */}
      <div className="topbar-left">
        <h3 className="page-title">Metadata Generator</h3>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        {/* Tokens */}
        <div className="token-pill">
          <Coins size={16} />
          <span>{tokens} Tokens</span>
          <small className="plan">{plan}</small>
        </div>

        {/* Notifications */}
        <button className="icon-btn">
          <Bell size={18} />
        </button>

        {/* User */}
        <div
          className="user-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <div className="avatar">
            <User size={18} />
          </div>
          <ChevronDown size={16} />

          {open && (
            <motion.div
              className="dropdown"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <button>Account</button>
              <button>Billing</button>
              <button className="danger">Logout</button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

export default Topbar;
