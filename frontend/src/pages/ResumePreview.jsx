import { useLocation, useNavigate } from "react-router-dom";
import Template1 from "../resumeTemplates/Template1";
import Template2 from "../resumeTemplates/Template2";
import Template3 from "../resumeTemplates/Template3";
import Template4 from "../resumeTemplates/Template4";
import BackToDashboardButton from "./BackToDashboardButton";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResumePreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location?.state ?? {};

  const selectedTemplate = formData.selectedTemplate || "template1";
  const userId = formData.userId ? String(formData.userId) : "650d4f12a5c8b9c123456789";

  const handleDownload = () => {
    document.querySelectorAll(".no-print-section").forEach((section) => {
      section.style.display = "none";
    });

    window.print();

    document.querySelectorAll(".no-print-section").forEach((section) => {
      section.style.display = "block";
    });
  };

  const handleSaveResume = async () => {
    const resumeData = { ...formData, userId, selectedTemplate };

    try {
      if (formData._id) {
        await axios.put(`https://resumeedge.onrender.com/api/resume/update/${formData._id}`, resumeData);
        toast.success("Resume updated successfully!");
      } else {
        const res = await axios.post("https://resumeedge.onrender.com/api/resume/save", resumeData);
        resumeData._id = res.data.resume._id;
        toast.success("Resume saved successfully!");
      }

      setTimeout(() => {
        navigate("/my-resumes");
      }, 1500);
    } catch (error) {
      toast.error("Error saving resume: " + (error.response?.data?.message || error.message));
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "template1":
        return <Template1 formData={formData} />;
      case "template2":
        return <Template2 formData={formData} />;
      case "template3":
        return <Template3 formData={formData} />;
      case "template4":
        return <Template4 formData={formData} />;
      default:
        return <Template1 formData={formData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 px-6 md:px-12 relative print:bg-white print:text-black print:p-0 print:shadow-none print:min-h-0">
      <ToastContainer position="top-center" autoClose={1500} />

    
      <div className="no-print-section sticky top-0 left-0 z-50 mb-6">
        <BackToDashboardButton />
      </div>

    
      <div>{renderTemplate()}</div>

      
      <div className="no-print-section flex flex-col md:flex-row gap-4 items-center justify-center mt-8">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Download PDF
        </button>

        <button
          onClick={() => navigate("/resume-form", { state: { ...formData, userId } })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Edit Resume
        </button>

        <button
          onClick={handleSaveResume}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Save Resume
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
