import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [step, setStep] = useState("form");
  const [otp, setOtp] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("https://resumeedge.onrender.com/api/auth/send-otp", {
        email: form.email,
      });

      if (res.data.success) {
        toast.success("OTP sent to your email!");
        setStep("otp");
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("https://resumeedge.onrender.com/api/auth/register", {
        ...form,
        otp,
      });

      if (res.data.success) {
        toast.success("Registration successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        toast.error(res.data.message || "OTP verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-white to-[#e0f2fe] flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white items-center justify-center p-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">ResumeEdge</h2>
            <p className="text-lg mt-2">Build Your Future with a Great Resume</p>
            <img
              src="https://illustrations.popsy.co/white/work-from-home.svg"
              alt="Login Illustration"
              className="mt-6 w-64 mx-auto"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-14 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            {step === "form" ? "Create Your Account" : "Verify OTP"}
          </h2>
          <p className="text-center text-gray-500 mt-2 mb-8">
            {step === "form"
              ? "Join ResumeEdge to get started"
              : "Enter the OTP sent to your email"}
          </p>

          <form
            onSubmit={step === "form" ? handleSendOtp : handleVerifyOtpAndRegister}
            className="space-y-6"
          >
            {step === "form" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}

            {step === "otp" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder="123456"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading
                ? step === "form"
                  ? "Sending OTP..."
                  : "Registering..."
                : step === "form"
                ? "Send OTP"
                : "Verify OTP & Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/" className="text-indigo-600 hover:underline font-medium">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
