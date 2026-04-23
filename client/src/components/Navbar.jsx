import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Logo from "./Logo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const { isLoggedIn, logoutUser, user } = useAuth();

  console.log("Navbar User:", user);
console.log("isLoggedIn:", isLoggedIn);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/70 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-slate-300 font-medium">
          <motion.span whileHover={{ scale: 1.1 }}>
            <Link to="/">Home</Link>
          </motion.span>

          <motion.span whileHover={{ scale: 1.1 }}>
            <Link to="/features">Features</Link>
          </motion.span>

          <motion.span whileHover={{ scale: 1.1 }}>
            <Link to="/chat">Workspace</Link>
          </motion.span>

          <motion.span whileHover={{ scale: 1.1 }}>
            <Link to="/docs">Use Cases</Link>
          </motion.span>

          <motion.span whileHover={{ scale: 1.1 }}>
            <Link to="/contact">Contact</Link>
          </motion.span>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4 relative">
          
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-slate-300 hover:text-white"
              >
                Login
              </button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg"
              >
                Get Started
              </motion.button>
            </>
          ) : (
            <div className="relative">
              
              {/* Profile Icon */}
              <div
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold cursor-pointer"
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* Dropdown */}
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-3 w-48 bg-slate-900 border border-slate-700 rounded-lg shadow-lg p-3 z-50"
                >
                  <p className="text-slate-300 text-sm mb-2">
                    {user?.name || "User"}
                  </p>

                  <hr className="border-slate-700 mb-2" />

                  <button
                    onClick={() => {
                      navigate("/profile");
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-slate-800 rounded text-slate-300"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      logoutUser();
                      navigate("/");
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-2 py-1 hover:bg-red-500 rounded text-red-400"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-slate-900 px-6 pb-6 space-y-4 text-slate-300"
        >
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/chat">Workspace</Link>
          <Link to="/docs">Use Cases</Link>
          <Link to="/contact">Contact</Link>

          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="block w-full text-left"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-indigo-600 text-white"
              >
                Get Started
              </button>
            </>
          ) : (
            <>
              <div className="text-slate-300">
                {user?.name || "User"}
              </div>

              <button
                onClick={() => navigate("/profile")}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-slate-700 text-white"
              >
                Profile
              </button>

              <button
                onClick={() => { logoutUser(); navigate("/"); }}
                className="w-full mt-2 px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;