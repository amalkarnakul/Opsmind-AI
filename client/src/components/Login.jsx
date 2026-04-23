import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Login = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth();
  const url = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.post(`${url}/api/auth/login`, formData);
      storeToken(data.token, data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-slate-900 to-purple-900 opacity-90" />

      <motion.div
        className="absolute w-60 h-60 sm:w-96 sm:h-96 bg-indigo-600 rounded-full blur-3xl opacity-30 top-10 left-5 sm:left-10"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <motion.div
        className="absolute w-60 h-60 sm:w-96 sm:h-96 bg-purple-600 rounded-full blur-3xl opacity-30 bottom-10 right-5 sm:right-10"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Welcome Back
        </h2>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-5"
        >
          <motion.input
            variants={itemVariants}
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900/60 text-white border border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <motion.input
            variants={itemVariants}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900/60 text-white border border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}
        </motion.form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Register
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
