import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import homeimg from "../assets/image.png";

const Home1 = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center bg-slate-950 text-white overflow-hidden">
      {/* Gradient Glow Background */}
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full bottom-[-100px] right-[-100px]" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold leading-tight">
            Enterprise AI <br /> Knowledge Assistant
          </h1>

          <p className="mt-6 text-slate-400 text-lg">
            Upload company documents, automate workflows, and get instant
            AI-powered answers using advanced language models.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/chat")}
              className="px-6 py-3 border border-slate-600 rounded-lg"
            >
              Try Demo
            </button>
          </div>
        </motion.div>

        {/* Right Dashboard Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={homeimg}
            alt="AI Dashboard"
            className="rounded-xl shadow-2xl border border-slate-800"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Home1;
