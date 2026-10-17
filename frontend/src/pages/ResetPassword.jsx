import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";

export default function ResetPassword({ apiBase }) {
  const API_BASE =
    apiBase || import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error(
        "This reset link is missing its token. Please request a new one.",
      );
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters", {
        className:
          "rounded-xl bg-white text-green-900 border border-green-300 shadow-[0_4px_12px_rgba(16,185,129,0.3)]",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match", {
        className:
          "rounded-xl bg-white text-green-900 border border-green-300 shadow-[0_4px_12px_rgba(16,185,129,0.3)]",
      });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/doctors/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(
          json?.message || "This reset link is invalid or has expired.",
          { duration: 5000 },
        );
        setBusy(false);
        return;
      }

      setDone(true);
      toast.success("Password reset! Redirecting to login…", {
        className:
          "rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] font-semibold",
      });
      setTimeout(() => navigate("/doctor-admin/login"), 1500);
    } catch (err) {
      console.error("reset-password error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 via-emerald-100 to-green-200 relative font-serif overflow-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      <button
        onClick={() => navigate("/doctor-admin/login")}
        className="absolute top-6 left-6 cursor-pointer flex items-center gap-2 text-green-800 font-semibold hover:text-green-600 transition-all duration-300"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Login
      </button>

      <div className="relative z-10 bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-[90%] max-w-md border border-green-200 transition-all duration-500 hover:shadow-green-300/50">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Doctor Logo" className="w-28 h-28 object-contain drop-shadow-lg" />
        </div>

        <h2 className="text-3xl font-bold text-center text-emerald-700 tracking-wide mb-2">Set New Password</h2>

        {!token && (
          <p className="text-center mb-6 text-sm text-red-700">
            This link is missing its reset token. Please request a new password
            reset from the login page.
          </p>
        )}

        {token && !done && (
          <>
            <p className="text-center text-green-600 mb-6 text-sm">
              Choose a new password for your account.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-green-300 bg-white/80"
                minLength={8}
                required
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 rounded-full border border-green-300 bg-white/80"
                minLength={8}
                required
              />
              <button
                type="submit"
                disabled={busy}
                className="w-full py-3 bg-linear-to-r from-emerald-400 to-green-600 text-white font-semibold rounded-full"
              >
                {busy ? "Saving…" : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {done && (
          <p className="text-center text-green-600 mb-6 text-sm">
            Your password has been reset. Redirecting you to login…
          </p>
        )}
      </div>
    </div>
  );
}
