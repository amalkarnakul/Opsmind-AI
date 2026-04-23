import React, { useState, useRef, useEffect } from "react";
import ChatSidebar from "../components/ChatSidebar";
import ChatInput from "../components/Chatinput";
import Message from "../components/Message";
import { useAuth } from "../context/AuthContext";
import { FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Workspace() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const [error, setError] = useState("");

  const { token, isLoading, user } = useAuth();
  const navigate = useNavigate();
  const bottomRef = useRef();
  const url = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user]);

  useEffect(() => {
    if (messages.length === 0) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  const sendMessage = async (query) => {
    if (!token) { setError("Please log in first."); return; }

    setMessages((prev) => [...prev, { role: "user", content: query, createdAt: new Date() }]);
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${url}/api/chat/chat`,
        { message: query, documentIds: activeDoc ? [activeDoc._id] : [] },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.reply || res.data.answer || res.data.response || "No response.",
          citations: res.data.citations || [],
          createdAt: new Date(),
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <Loader2 className="animate-spin text-indigo-400" size={32} />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-black text-white overflow-hidden pt-16">

      <ChatSidebar onSelectDoc={setActiveDoc} />

      <div className="flex flex-col flex-1 min-w-0">

        {/* Header */}
        <div className="h-14 shrink-0 flex items-center justify-between px-6 border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <h1 className="text-base font-semibold">
            Opus-<span className="text-indigo-400">Mind</span> Workspace
          </h1>
          {activeDoc ? (
            <div className="flex items-center gap-2 text-sm text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full">
              <FileText size={14} />
              <span className="truncate max-w-[200px]">{activeDoc.originalname}</span>
            </div>
          ) : (
            <span className="text-xs text-white/30">No document selected</span>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-white/30">
              <FileText size={40} className="text-white/10" />
              <p className="text-sm">Select a document from the sidebar and start asking questions</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <Message key={i} message={msg} />
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-indigo-300 animate-pulse">
                Thinking...
              </div>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <div ref={bottomRef} />
        </div>

        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
}
