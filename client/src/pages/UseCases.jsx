import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Users, Brain, MessageSquare, X, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const useCases = [
  {
    icon: FileText,
    title: "Document Intelligence",
    description:
      "Upload company documents and instantly retrieve answers using AI-powered semantic search.",
    details:
      "Stop searching through hundreds of pages manually. Upload any PDF and our AI indexes every chunk, letting you ask natural language questions and get precise answers with source references.",
    benefits: [
      "Instant answers from any uploaded PDF",
      "Semantic search across all documents",
      "Source-cited responses",
      "Supports large document collections",
    ],
    color: "indigo",
  },
  {
    icon: Users,
    title: "Employee Knowledge Base",
    description:
      "Help employees quickly find internal policies, SOPs, and documentation through conversational AI.",
    details:
      "Replace static wikis with a living, conversational knowledge base. Employees ask questions in plain English and get answers pulled directly from your internal docs — no training required.",
    benefits: [
      "Conversational access to internal docs",
      "Reduces time spent searching wikis",
      "Always up-to-date with latest uploads",
      "Role-based document access",
    ],
    color: "purple",
  },
  {
    icon: Brain,
    title: "AI Knowledge Assistant",
    description:
      "Turn your internal documents into an intelligent AI assistant that understands context.",
    details:
      "Our RAG pipeline combines vector search with LLM reasoning to give context-aware answers — not just keyword matches. The assistant understands follow-up questions and maintains conversation history.",
    benefits: [
      "Context-aware multi-turn conversations",
      "RAG-powered accurate responses",
      "Understands follow-up questions",
      "Powered by Groq llama-3.1-8b-instant",
    ],
    color: "cyan",
  },
  {
    icon: MessageSquare,
    title: "Smart Customer Support",
    description:
      "Provide instant AI-powered responses to common support questions using company knowledge.",
    details:
      "Train the AI on your product docs, FAQs, and support guides. It handles common queries instantly, reducing support ticket volume and improving response times.",
    benefits: [
      "Instant responses to common queries",
      "Trained on your product documentation",
      "Reduces support ticket volume",
      "24/7 availability",
    ],
    color: "emerald",
  },
];

const colorMap = {
  indigo: { bg: "bg-indigo-600/10", text: "text-indigo-400", border: "border-indigo-500/40", btn: "bg-indigo-600 hover:bg-indigo-500" },
  purple: { bg: "bg-purple-600/10", text: "text-purple-400", border: "border-purple-500/40", btn: "bg-purple-600 hover:bg-purple-500" },
  cyan:   { bg: "bg-cyan-600/10",   text: "text-cyan-400",   border: "border-cyan-500/40",   btn: "bg-cyan-600 hover:bg-cyan-500" },
  emerald:{ bg: "bg-emerald-600/10",text: "text-emerald-400",border: "border-emerald-500/40",btn: "bg-emerald-600 hover:bg-emerald-500" },
};

const UseCases = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <section className="bg-slate-950 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover how NeuroDesk AI helps organizations transform their knowledge into an intelligent AI assistant.
          </p>
          <p className="text-slate-500 text-sm mt-2">Click any card to learn more</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {useCases.map((item, index) => {
            const Icon = item.icon;
            const c = colorMap[item.color];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => setSelected(item)}
                className={`group bg-slate-900 border border-slate-800 hover:${c.border} rounded-xl p-6 cursor-pointer transition-colors duration-200`}
              >
                <div className={`${c.bg} w-12 h-12 flex items-center justify-center rounded-lg mb-4`}>
                  <Icon className={c.text} size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm mb-4">{item.description}</p>
                <span className={`text-xs ${c.text} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
                  Learn more →
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (() => {
          const Icon = selected.icon;
          const c = colorMap[selected.color];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className={`bg-slate-900 border ${c.border} rounded-2xl p-8 max-w-lg w-full relative`}
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
                >
                  <X size={20} />
                </button>

                <div className={`${c.bg} w-14 h-14 flex items-center justify-center rounded-xl mb-5`}>
                  <Icon className={c.text} size={28} />
                </div>

                <h3 className="text-2xl font-bold mb-3">{selected.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed">{selected.details}</p>

                <ul className="space-y-3 mb-8">
                  {selected.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                      <CheckCircle size={17} className={`${c.text} mt-0.5 shrink-0`} />
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => { setSelected(null); navigate("/chat"); }}
                  className={`w-full py-3 rounded-lg ${c.btn} text-white font-semibold transition`}
                >
                  Try it in Workspace →
                </button>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default UseCases;
