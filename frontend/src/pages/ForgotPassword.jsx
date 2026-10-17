import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import logo from "../assets/logo.png";

export default function ForgotPassword({ apiBase }) {
  const API_BASE =
    apiBase || import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email address", {
        className:
          "rounded-xl bg-white text-green-900 border border-green-300 shadow-[0_4px_12px_rgba(16,185,129,0.3)]",
      });
      return;
    }

    setBusy(true);
    try {
      const res = await fetch(`${API_BASE}/api/doctors/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const json = await res.json().catch(() => null);

      if (!res.ok) {
        toast.error(json?.message || "Something went wrong. Please try again.");
        setBusy(false);
        return;
      }

      setSubmitted(true);
      toast.success(
        json?.message ||
          "If an account exists for that email, a reset link has been sent.",
        {
          className:
            "rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-[0_4px_15px_rgba(16,185,129,0.3)] font-semibold",
          duration: 6000,
        },
      );
    } catch (err) {
      console.error("forgot-password error:", err);
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

        <h2 className="text-3xl font-bold text-center text-emerald-700 tracking-wide mb-2">Reset Password</h2>
        <p className="text-center text-green-600 mb-6 text-sm">
          {submitted
            ? "Check your email for a reset link. It expires in 15 minutes."
            : "Enter your account email and we'll send you a reset link."}
        </p>

        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-green-300 bg-white/80"
              required
            />

            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 bg-linear-to-r from-emerald-400 to-green-600 text-white font-semibold rounded-full"
            >
              {busy ? "Sending…" : "Send Reset Link"}
            </button>
          </form>
        )}

        {submitted && (
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="block text-center text-sm text-emerald-700 hover:text-emerald-900 hover:underline mt-4"
          >
            Didn&rsquo;t get it? Try again
          </button>
        )}
      </div>
    </div>
  );
}
