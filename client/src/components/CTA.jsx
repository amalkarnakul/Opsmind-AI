import { useNavigate } from "react-router-dom";
import React from "react";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-center">
      <h2 className="text-4xl font-bold">Ready to build your AI workspace?</h2>

      <p className="mt-4 text-lg opacity-90">Start using NeuroDesk AI today</p>

      <button
        onClick={() => navigate("/register")}
        className="mt-8 px-8 py-3 bg-white text-black rounded-lg"
      >
        Get Started
      </button>
    </section>
  );
};

export default CTA;
