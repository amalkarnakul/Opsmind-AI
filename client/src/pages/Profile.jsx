import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const url = import.meta.env.VITE_BASE_URL || "http://localhost:5001";

export default function Profile() {
  const { user, token, storeToken, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await axios.put(
        `${url}/api/auth/me/update`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      storeToken(token, res.data.user);
      setMessage({ text: "Profile updated successfully", type: "success" });
    } catch (err) {
      setMessage({ text: err.response?.data?.message || "Update failed", type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 pt-20">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">

        {/* Avatar */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <p className="text-white/50 text-sm">{user?.email}</p>
        </div>

        {/* Update form */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs text-white/40 uppercase tracking-widest block mb-1">Email</label>
            <input
              type="text"
              value={user?.email || ""}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/40 cursor-not-allowed"
            />
          </div>

          {message.text && (
            <p className={`text-sm text-center ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-sm font-semibold transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>

        <hr className="border-white/10" />

        <button
          onClick={handleLogout}
          className="w-full py-2.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 text-sm font-semibold transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
