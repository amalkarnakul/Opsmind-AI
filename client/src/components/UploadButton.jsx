import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UploadButton({ onUploadSuccess }) {
  const { token } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const url = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessage({ text: `Uploading ${file.name}...`, type: "info" });
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${url}/api/documents/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || `Error ${res.status}`);

      setMessage({ text: "✅ Uploaded successfully", type: "success" });
      onUploadSuccess();

    } catch (err) {
      setMessage({ text: `❌ ${err.message}`, type: "error" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label
        className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition
          ${uploading
            ? "bg-indigo-600/50 cursor-not-allowed pointer-events-none"
            : "bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
          }`}
      >
        {uploading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4" />
            Upload Document
          </>
        )}
        <input
          type="file"
          className="hidden"
          disabled={uploading}
          accept=".pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.odt,.odp,.ods,.txt,.md,.json,.csv,.html,.js,.jsx,.ts,.tsx,.py,.java,.c,.cpp,.cs,.xml,.jpg,.jpeg,.png,.bmp,.tiff,.webp"
          onChange={handleFileChange}
        />
      </label>

      {message.text && (
        <p className={`text-xs text-center break-words ${
          message.type === "success" ? "text-green-400" :
          message.type === "error"   ? "text-red-400"   : "text-slate-400"
        }`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
