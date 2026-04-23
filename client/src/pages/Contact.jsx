import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    // Simulate send (replace with real API call if needed)
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-slate-400">Have a question or want to work together? We'd love to hear from you.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-8"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-8 gap-4"
            >
              <CheckCircle size={52} className="text-indigo-400" />
              <h2 className="text-2xl font-bold">Message Sent!</h2>
              <p className="text-slate-400">Thanks for reaching out. We'll get back to you shortly.</p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                className="mt-4 px-6 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-sm"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

              {/* Name */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nakul Amalkar"
                    className={`w-full bg-slate-800 text-white pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.name ? "border-red-500" : "border-slate-700"}`}
                  />
                </div>
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full bg-slate-800 text-white pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition ${errors.email ? "border-red-500" : "border-slate-700"}`}
                  />
                </div>
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="text-sm text-slate-400 mb-1 block">Message</label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-4 text-slate-500" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className={`w-full bg-slate-800 text-white pl-9 pr-4 py-3 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none ${errors.message ? "border-red-500" : "border-slate-700"}`}
                  />
                </div>
                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg disabled:opacity-60 transition"
              >
                {loading ? (
                  <span className="animate-pulse">Sending...</span>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>

            </form>
          )}
        </motion.div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center gap-8 text-slate-500 text-sm"
        >
          <span>📧 support@neurodesk.ai</span>
          <span>🌐 neurodesk.ai</span>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
