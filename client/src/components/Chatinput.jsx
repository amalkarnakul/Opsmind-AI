import React, { useState } from 'react';
import { Send } from "lucide-react";

const ChatInput = ({ onSend, sendMessage }) => {
  const [input, setInput] = useState("");
  const send = onSend || sendMessage;

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !send) return;
    send(trimmed);
    setInput("");
  };

  return (
    <div className="border-t border-white/10 p-4 flex gap-3 items-center bg-black/40 backdrop-blur-xl">
      <input
        type="text"
        autoComplete="off"
        autoFocus
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); handleSend(); }
        }}
        placeholder="Ask a question about your document..."
        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-indigo-500/60 focus:bg-white/15 transition"
      />
      <button
        type="button"
        onClick={handleSend}
        disabled={!input.trim()}
        className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-3 rounded-xl flex items-center justify-center transition"
      >
        <Send size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
