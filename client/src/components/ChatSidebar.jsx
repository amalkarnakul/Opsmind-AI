import React, { useState } from 'react';
import { FileText, Trash2 } from "lucide-react";
import useDocuments from '../hooks/useDocuments';
import UploadButton from './UploadButton';
import { useAuth } from '../context/AuthContext';

const ChatSidebar = ({ onSelectDoc }) => {
  const { docs, loading, refetch } = useDocuments();
  const [activeDocId, setActiveDocId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const { token } = useAuth();

  const url = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

  const handleSelect = (doc) => {
    setActiveDocId(doc._id);
    onSelectDoc(doc);
  };

  const handleDelete = async (docId) => {
    setDeletingId(docId);
    setConfirmId(null);
    setDeleteError("");
    try {
      const res = await fetch(`${url}/api/documents/${docId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      if (activeDocId === docId) {
        setActiveDocId(null);
        onSelectDoc(null);
      }
      refetch();
    } catch (err) {
      setDeleteError(err.message);
      setTimeout(() => setDeleteError(""), 4000);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <aside className="w-72 border-r border-white/10 bg-black/60 flex flex-col gap-4 p-4 overflow-y-auto">

      {/* Upload */}
      <UploadButton onUploadSuccess={refetch} />

      {/* Divider */}
      <div className="border-t border-white/10" />

      {/* Document list */}
      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-widest px-1">Your Documents</p>

        {loading ? (
          <p className="text-white/40 text-sm px-1">Loading...</p>
        ) : docs.length === 0 ? (
          <p className="text-white/30 text-sm px-1">No documents yet. Upload one to get started.</p>
        ) : (
          docs.map((doc) => (
            <div key={doc._id} className="space-y-1">
              <div
                onClick={() => confirmId !== doc._id && handleSelect(doc)}
                className={`p-3 rounded-lg cursor-pointer flex gap-2 items-center transition group ${
                  activeDocId === doc._id
                    ? "bg-indigo-600/20 border border-indigo-500/60"
                    : "bg-white/5 hover:bg-white/10 border border-transparent"
                }`}
              >
                <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                <p className="text-sm truncate text-white/80 flex-1">{doc.originalName || doc.originalname}</p>
                {deletingId === doc._id ? (
                  <span className="w-3.5 h-3.5 border border-white/30 border-t-white rounded-full animate-spin block shrink-0" />
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); setConfirmId(doc._id); }}
                    className="opacity-0 group-hover:opacity-100 transition text-white/40 hover:text-red-400 shrink-0"
                    title="Delete document"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {/* Inline confirm row */}
              {confirmId === doc._id && (
                <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs">
                  <span className="text-red-300 flex-1">Delete this document?</span>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="text-red-400 hover:text-red-300 font-semibold"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmId(null)}
                    className="text-white/40 hover:text-white/70"
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          ))
        )}

        {deleteError && (
          <p className="text-xs text-red-400 px-1">{deleteError}</p>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
