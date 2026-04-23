import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
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

const Register = () => {
  const navigate = useNavigate();
  const { storeToken } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData,
      );
      console.log("Register success", data);
      storeToken(data.token, data.user);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const res = await axios.post(
        "http://localhost:5001/api/auth/google-login",
        {
          token: tokenResponse.access_token,
        },
      );

      storeToken(res.data.token, res.data.user);
      navigate("/");
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 bg-slate-950 overflow-hidden ">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900 via-slate-900 to-purple-900 opacity-90" />

      {/* Animated Blobs */}
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

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl mt-10 p-6 sm:p-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6">
          Create Account
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
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-slate-900/60 text-white border border-slate-600 focus:ring-2 focus:ring-indigo-500 outline-none"
          />

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
            type="text"
            name="phone"
            placeholder="Phone Number"
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
            className="w-full py-3 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg"
          >
            Register
          </motion.button>
          <div className="flex items-center gap-3 text-slate-400">
            <div className="flex-1 h-px bg-slate-700"></div>
            <span className="text-sm">or continue with</span>
            <div className="flex-1 h-px bg-slate-700"></div>
          </div>

          {/* Google Login */}

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => googleLogin()}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-600 text-white hover:bg-slate-800 transition"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </motion.button>
        </motion.form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
