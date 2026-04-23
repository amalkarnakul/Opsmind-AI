import React from "react";
import ReactMarkdown from "react-markdown";
import { FileText } from "lucide-react";

const Message = ({ message }) => {
  const isUser = message.role === "user";
  const time = message.createdAt
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-2xl w-full space-y-1">

        <p className={`text-xs text-white/30 ${isUser ? "text-right" : "text-left"}`}>
          {isUser ? "You" : "OpsMind AI"}
        </p>

        {/* Bubble */}
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-sm"
            : "bg-white/10 border border-white/20 backdrop-blur-xl text-white/90 rounded-bl-sm"
        }`}>
          {isUser ? (
            message.content
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                code: ({ children }) => (
                  <code className="bg-black/30 px-1 py-0.5 rounded text-indigo-300 text-xs">{children}</code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-black/40 p-3 rounded-lg overflow-x-auto text-xs mt-2">{children}</pre>
                ),
                strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {/* Citation Reference Cards */}
        {!isUser && message.citations?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {message.citations.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-xs text-indigo-300"
              >
                <FileText size={12} />
                <span className="font-medium truncate max-w-[160px]">{c.fileName}</span>
                <span className="text-indigo-400/60">·</span>
                <span>p.{c.pageNumber}</span>
              </div>
            ))}
          </div>
        )}

        {time && (
          <p className={`text-[10px] text-white/20 px-1 ${isUser ? "text-right" : "text-left"}`}>{time}</p>
        )}
      </div>
    </div>
  );
};

export default Message;
