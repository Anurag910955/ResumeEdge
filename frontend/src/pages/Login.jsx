import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("https://resumeedge.onrender.com/api/auth/login", {
        email,
        password,
      });

      const { token, userId, name, message } = res.data;

      if (token && userId) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ userId, name }));
        toast.success(message || "✅ Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast.error("⚠️ Unexpected login response");
      }
    } catch (error) {
      toast.error("❌ Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-white to-[#e0f2fe] flex items-center justify-center px-4 py-8">
      <ToastContainer position="top-center" autoClose={1500} />
      <div className="w-full max-w-5xl flex bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 items-center justify-center text-white p-10">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight">ResumeEdge</h2>
            <p className="text-lg mt-2">Craft your resume with precision</p>
            <img
              src="https://illustrations.popsy.co/white/work-from-home.svg"
              alt="Login Illustration"
              className="mt-6 w-64 mx-auto"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 md:p-14 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>
          <p className="text-center text-gray-500 mt-2 mb-8">Login to your ResumeEdge account</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 hover:underline font-medium">
              Register here
            </a>
          </p>
          <p className="mt-6 text-center text-sm text-gray-600">
            <a href="/forgot-password" className="text-indigo-600 hover:underline font-medium">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
