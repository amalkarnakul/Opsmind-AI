import { motion } from "framer-motion";
import React from "react";
import { Brain, Database, Bot, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Brain,
    title: "AI Chat Assistant",
    desc: "Ask questions and get answers from your company documents.",
    slug: "ai-chat-assistant",
    color: "group-hover:text-indigo-400",
    border: "hover:border-indigo-500/50",
  },
  {
    icon: Database,
    title: "Vector Search",
    desc: "Semantic search powered by embeddings and vector databases.",
    slug: "vector-search",
    color: "group-hover:text-cyan-400",
    border: "hover:border-cyan-500/50",
  },
  {
    icon: Bot,
    title: "Automation Engine",
    desc: "Automate workflows and data extraction tasks.",
    slug: "automation-engine",
    color: "group-hover:text-emerald-400",
    border: "hover:border-emerald-500/50",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    desc: "Secure authentication and document access control.",
    slug: "enterprise-security",
    color: "group-hover:text-rose-400",
    border: "hover:border-rose-500/50",
  },
];

const Features = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-950 text-white py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-4"
      >
        Powerful AI Features
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 text-center mb-16"
      >
        Click any feature to learn more
      </motion.p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => navigate(`/features/${feature.slug}`)}
              className={`group bg-slate-900 p-6 rounded-xl border border-slate-800 ${feature.border} cursor-pointer transition-colors duration-200`}
            >
              <Icon className={`mb-4 text-slate-400 transition-colors duration-200 ${feature.color}`} size={28} />

              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>

              <p className="text-slate-400 text-sm mb-4">{feature.desc}</p>

              <span className="text-xs text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Learn more →
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;
