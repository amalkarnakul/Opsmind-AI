import { motion } from "framer-motion";
import React from 'react'

const Pricing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-20 px-6">

      <h1 className="text-4xl font-bold text-center mb-16">
        Pricing Plans
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {[
          { name: "Starter", price: "$0", features: ["Basic AI Chat", "5 Documents"] },
          { name: "Pro", price: "$19", features: ["Unlimited Documents", "Automation"] },
          { name: "Enterprise", price: "$49", features: ["Full AI Suite", "Priority Support"] }
        ].map((plan, index) => (

          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-slate-900 p-8 rounded-xl border border-slate-800"
          >
            <h2 className="text-2xl font-bold mb-4">
              {plan.name}
            </h2>

            <p className="text-4xl font-bold text-indigo-400 mb-6">
              {plan.price}
            </p>

            <ul className="space-y-3 text-slate-400 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>

            <button className="w-full bg-indigo-600 py-2 rounded-lg">
              Choose Plan
            </button>

          </motion.div>

        ))}

      </div>
    </div>
  );
};

export default Pricing;