import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Brain, Database, MessageSquare, ChevronDown } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const docsSections = [
  {
    icon: UploadCloud,
    title: "Upload Documents",
    description: "Users can upload PDFs, policies, SOPs, and knowledge base documents. These files become the foundation of the AI knowledge system.",
    detail: "Supported formats include PDF. Files are uploaded via a secure multipart form, stored in memory, and immediately passed to the processing pipeline. Each document is tied to the authenticated user's account.",
    step: "Step 1",
    action: { label: "Upload a document →", path: "/chat" },
  },
  {
    icon: FileText,
    title: "Text Extraction",
    description: "Uploaded documents are processed and converted into plain text so that AI models can understand the content.",
    detail: "We use pdf-parse under the hood to extract raw text from PDF buffers. The text is then split into 500-word chunks to keep each piece focused and retrievable.",
    step: "Step 2",
  },
  {
    icon: Brain,
    title: "Embeddings Generation",
    description: "The extracted text is split into smaller chunks and converted into vector embeddings using AI embedding models.",
    detail: "Each chunk is passed through the all-MiniLM-L6-v2 model via @xenova/transformers, producing a 384-dimensional vector. These embeddings capture semantic meaning, not just keywords.",
    step: "Step 3",
  },
  {
    icon: Database,
    title: "Vector Storage",
    description: "Embeddings are stored in the database and used for semantic search to find the most relevant document sections.",
    detail: "Vectors are stored in MongoDB alongside the original text chunk. A vector index (vector_index) on the embeddings field enables Atlas Vector Search to find the top-5 most relevant chunks per query.",
    step: "Step 4",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Interaction",
    description: "When a user asks a question, the system retrieves relevant document chunks and sends them to the AI model to generate contextual responses.",
    detail: "Your question is embedded using the same model, then matched against stored vectors. The top results are injected as context into a Groq (llama-3.1-8b-instant) prompt, which returns a grounded, accurate answer.",
    step: "Step 5",
    action: { label: "Try the chat →", path: "/chat" },
  },
];

const Docs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 py-20">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Documentation</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Learn how NeuroDesk AI processes documents and transforms them into an
            intelligent AI-powered knowledge assistant using Retrieval-Augmented Generation (RAG).
          </p>
          <p className="text-slate-500 text-sm mt-3">Click any card to expand details</p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {docsSections.map((section, index) => {
            const Icon = section.icon;
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => toggle(index)}
                className={`bg-slate-900 border rounded-xl p-6 cursor-pointer transition-colors duration-200 ${
                  isOpen ? "border-indigo-500/60" : "border-slate-800 hover:border-indigo-500/30"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-indigo-600/10 w-12 h-12 flex items-center justify-center rounded-lg">
                    <Icon className="text-indigo-400" size={24} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full">
                      {section.step}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} className="text-slate-400" />
                    </motion.div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                <p className="text-slate-400 text-sm">{section.description}</p>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-slate-300 text-sm mt-4 pt-4 border-t border-slate-700 leading-relaxed">
                        {section.detail}
                      </p>
                      {section.action && (
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(section.action.path); }}
                          className="mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition"
                        >
                          {section.action.label}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Workflow */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-semibold mb-6">AI Workflow</h2>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-slate-400">
            <p className="mb-4">
              Upload Document → Extract Text → Generate Embeddings →
              Store in Vector Database → Retrieve Relevant Chunks →
              Generate AI Response
            </p>
            <p className="text-sm">
              This process is known as Retrieval-Augmented Generation (RAG),
              which allows the AI to provide accurate answers based on your uploaded documents.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Docs;
