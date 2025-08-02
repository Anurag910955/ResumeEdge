import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BackToDashboardButton from "./BackToDashboardButton";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const resumesPerPage = 5;

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId;

  const fetchResumes = async () => {
    try {
      const res = await axios.get(`https://resumeedge.onrender.com/api/resume/${userId}`);
      setResumes(res.data.reverse());
    } catch (err) {
      toast.error("❌ Failed to load resumes.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (userId) fetchResumes();
  }, [userId]);

  const handleEdit = (resume) => {
    if (!resume._id) {
      toast.error("❌ Cannot edit resume: Missing _id");
      return;
    }
    navigate("/resume-form", { state: { ...resume } });
  };

  const handlePreview = (resume) => {
    navigate("/resume-preview", { state: resume });
  };

  const confirmDelete = async () => {
    if (!resumeToDelete) return;
    try {
      await axios.delete(`https://resumeedge.onrender.com/api/resume/delete/${resumeToDelete}`);
      toast.success("🗑️ Resume deleted successfully");
      setResumeToDelete(null);
      fetchResumes();
    } catch (error) {
      toast.error("❌ Failed to delete resume.");
      console.error(error);
    }
  };

  const indexOfLast = currentPage * resumesPerPage;
  const indexOfFirst = indexOfLast - resumesPerPage;
  const currentResumes = resumes.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(resumes.length / resumesPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-50 py-10 px-6 relative">
      <ToastContainer position="top-center" autoClose={1500} />
      <BackToDashboardButton />
       
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 tracking-wide">Your Saved Resumes</h1>
          <button
            onClick={() => navigate("/resume-form")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md transition text-lg"
          >
            + Create New
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center mt-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
              alt="Empty folder"
              className="mx-auto w-40 opacity-60"
            />
            <p className="text-gray-500 text-xl mt-4">
              You haven't created any resumes yet.
            </p>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {currentResumes.map((resume, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition duration-300"
                >
                  <h2 className="text-2xl font-semibold text-indigo-700">
                    {resume.personalDetails?.name || "Untitled Resume"}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Email: <span className="text-gray-700">{resume.personalDetails?.email}</span>
                  </p>

                  <p className="text-sm mt-1">
                    Template:{" "}
                    <span className="capitalize font-medium text-blue-600">
                      {resume.selectedTemplate?.replace("template", "Template ")}
                    </span>
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Last Updated:{" "}
                    <span className="text-gray-700">
                      {new Date(resume.updatedAt || resume.createdAt).toLocaleString()}
                    </span>
                  </p>

                  <div className="flex flex-wrap gap-3 mt-5">
                    <button
                      onClick={() => handleEdit(resume)}
                      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handlePreview(resume)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setResumeToDelete(resume._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-10 flex-wrap">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm disabled:opacity-50"
                >
                  ⬅ Previous
                </button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl text-sm disabled:opacity-50"
                >
                  Next ➡
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {resumeToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Resume?</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to permanently delete this resume?</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={confirmDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setResumeToDelete(null)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg shadow"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyResumes;
