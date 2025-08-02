import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState("request");
  const [form, setForm] = useState({ email: "", otp: "", newPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("https://resumeedge.onrender.com/api/auth/forgot-password", {
        email: form.email,
      });
      if (res.data.success) {
        toast.success("📨 OTP sent to your email");
        setStep("verify");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("https://resumeedge.onrender.com/api/auth/reset-password", {
        email: form.email,
        otp: form.otp,
        newPassword: form.newPassword,
      });
      if (res.data.success) {
        toast.success("✅ Password reset successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-white to-[#e0f2fe] flex items-center justify-center px-4 py-12">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600">
            {step === "request" ? "Forgot Password?" : "Reset Your Password"}
          </h1>
          <p className="text-gray-500 mt-2">
            {step === "request"
              ? "Enter your email to receive an OTP"
              : "Enter the OTP and your new password"}
          </p>
        </div>

        <form
          onSubmit={step === "request" ? sendOtp : resetPassword}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {step === "verify" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  required
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
          >
            {isLoading
              ? "Processing..."
              : step === "request"
              ? "Send OTP"
              : "Reset Password"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          <a
            href="/"
            className="text-indigo-600 hover:underline font-medium"
          >
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
