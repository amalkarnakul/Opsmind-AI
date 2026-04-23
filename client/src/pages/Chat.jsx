import React from 'react'
import { useState, useEffect, useRef } from "react";
import Message from "../components/Message";
import ChatInput from "../components/Chatinput";
import ChatSidebar from "../components/ChatSidebar";
import { Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [error, setError] = useState("");

  const { user, isLoading, token } = useAuth(); // ✅ FIXED
  const bottomRef = useRef(null);
  const url = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loadingResponse]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => setError(""), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  // ✅ Load history
  useEffect(() => {
    if (isLoading) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`${url}/api/chat/chat/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // Normalize server shape {sender, text} → client shape {role, content}
        const normalized = (data.messages || []).map((m) => ({
          role: m.sender === "ai" ? "assistant" : m.sender,
          content: m.text,
          createdAt: m.createdAt,
        }));
        setMessages(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingHistory(false);
      }
    };

    if (token) fetchHistory();
  }, [user]);

  // ✅ Send Message
  const sendMessage = async (text) => {
    const userMsg = {
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoadingResponse(true);
    setError("");

    try {
      const res = await fetch(`${url}/api/chat/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      const aiMsg = {
        role: "assistant",
        content: data.reply || data.response || data.answer,
        sources: data.sources || data.citations || [],
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);

      window.dispatchEvent(new Event("chat-updated"));
    } catch (err) {
      console.error(err);
      setError("Unable to send message. Please try again.");
    } finally {
      setLoadingResponse(false);
    }
  };

  // 🔄 Auth Loading
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-linear-to-br from-black via-zinc-900 to-black text-white">

      <ChatSidebar />

      <div className="flex flex-col flex-1">

        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <h1 className="text-lg font-semibold">
            NeuroDesk <span className="text-indigo-400">AI</span>
          </h1>
        </div>

        {/* Chat Area */}
        {loadingHistory ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin text-indigo-400" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {messages.map((msg, i) => (
              <Message key={i} message={msg} />
            ))}

            {error && (
              <div className="text-sm text-red-400 text-center">{error}</div>
            )}

            {loadingResponse && (
              <div className="text-indigo-400 text-sm animate-pulse">
                NeuroDesk AI is thinking...
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        <ChatInput onSend={sendMessage} />

      </div>
    </div>
  );
}