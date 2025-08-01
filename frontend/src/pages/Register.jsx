import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert(res.data.message);
      if (res.data.message === "User registered successfully") {
        navigate("/");
      }
    } catch (error) {
      alert("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f3f4f6] via-white to-[#e0f2fe] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl flex bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        {/* Left Illustration / Branding */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white items-center justify-center p-10">
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

        {/* Register Form */}
        <div className="w-full md:w-1/2 p-10 md:p-14 bg-white">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Create Your Account</h2>
          <p className="text-center text-gray-500 mt-2 mb-8">Join ResumeEdge to get started</p>

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/"
              className="text-indigo-600 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
