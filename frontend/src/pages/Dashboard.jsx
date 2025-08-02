import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createResumeImg from "../assets/undraw_to-do-list_o3jf.svg";
import viewResumeImg from "../assets/undraw_chat-with-ai_ir62.svg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setUserName(user.name);
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 px-6 py-10">
      <div
        className={`w-full bg-white shadow-xl rounded-3xl p-10 border border-gray-200 transition-opacity duration-700 ease-in-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-indigo-700">
              Welcome, {userName} <span className="inline-block">👋</span>
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Get started by choosing an option below</p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div
            className="bg-indigo-100 rounded-2xl p-6 shadow-md hover:shadow-lg cursor-pointer hover:bg-indigo-200 transition"
            onClick={() => navigate("/resume-form")}
          >
            <img src={createResumeImg} alt="Create Resume" className="h-40 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-center text-indigo-800">Create New Resume</h2>
            <p className="text-center text-gray-700 mt-2">
              Start building your professional resume with our modern templates.
            </p>
          </div>

          <div
            className="bg-green-100 rounded-2xl p-6 shadow-md hover:shadow-lg cursor-pointer hover:bg-green-200 transition"
            onClick={() => navigate("/my-resumes")}
          >
            <img src={viewResumeImg} alt="View Resume" className="h-40 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-center text-green-800">View Your Resume</h2>
            <p className="text-center text-gray-700 mt-2">
              Preview the resume you’ve created and download it as a PDF.
            </p>
          </div>
        </div>

        <div className="text-center mt-10 pt-6 border-t border-gray-300">
          <p className="text-gray-500 italic text-sm">
            “Success usually comes to those who are too busy to be looking for it.” – Henry David Thoreau
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
