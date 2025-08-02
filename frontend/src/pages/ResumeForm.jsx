import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BackToDashboardButton from "./BackToDashboardButton";
import axios from "axios";

const ResumeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state || null;

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.userId ?? existingData?.userId;

  const [statusMessage, setStatusMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(
    existingData?.selectedTemplate || "template1"
  );
  const [modalImage, setModalImage] = useState(null);

  const [formData, setFormData] = useState({
    _id: existingData?._id || null,
    personalDetails: existingData?.personalDetails || {
      name: "", email: "", phone: "", github: ""
    },
    education: existingData?.education || [
      { university: "", degree: "", cgpa: "", duration: "", courses: "" }
    ],
    skills: existingData?.skills || { software: "", programming: "" },
    projects: existingData?.projects || [
      { title: "", date: "", description: "" }
    ],
    experience: existingData?.experience || [
      { role: "", company: "", duration: "", responsibilities: "" }
    ],
    certifications: existingData?.certifications || [{ name: "" }],
    activitiesAwards: existingData?.activitiesAwards || [{ description: "" }]
  });

  const singularLabels = {
    education: "education",
    projects: "project",
    experience: "experience",
    certifications: "certification",
    activitiesAwards: "activity and award",
  };

  const handleChange = (e, section, index = null, field = null) => {
    const value = e.target.value;
    setFormData((prevData) => {
      if (index !== null) {
        const updatedArray = [...prevData[section]];
        updatedArray[index] = { ...updatedArray[index], [field]: value };
        return { ...prevData, [section]: updatedArray };
      }
      if (section === "skills") {
        return { ...prevData, skills: { ...prevData.skills, [field]: value } };
      }
      return { ...prevData, [section]: { ...prevData[section], [field]: value } };
    });
  };

  const addMore = (section, newItem) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [...prevData[section], newItem],
    }));
  };

  const removeField = (section, index) => {
    setFormData((prevData) => {
      const updatedArray = prevData[section].filter((_, i) => i !== index);
      return { ...prevData, [section]: updatedArray };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Saving your resume...");

    if (!userId || userId.length !== 24) {
      setStatusMessage("Invalid user ID. Please log in again.");
      return;
    }

    const dataToSubmit = { ...formData, selectedTemplate, userId };

    try {
      if (formData._id) {
        await axios.put(
          `https://resumeedge.onrender.com/api/resume/update/${formData._id}`,
          dataToSubmit
        );
        setStatusMessage("Resume updated successfully!");
      } else {
        const res = await axios.post("https://resumeedge.onrender.com/api/resume/save", dataToSubmit);
        dataToSubmit._id = res.data.resume._id;
        setStatusMessage("Resume submitted successfully!");
      }

      setTimeout(() => {
        navigate("/resume-preview", { state: dataToSubmit });
      }, 800);
    } catch (error) {
      setStatusMessage("Error saving resume. Please try again.");
      console.error("Resume submission error:", error);
    }
  };

  const templates = [
    { id: "template1", name: "Template 1", thumbnail: "/thumbnails/template1.png" },
    { id: "template2", name: "Template 2", thumbnail: "/thumbnails/template2.png" },
    { id: "template3", name: "Template 3", thumbnail: "/thumbnails/template3.png" },
    { id: "template4", name: "Template 4", thumbnail: "/thumbnails/template4.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-green-100 py-10 px-4 font-sans">
      <BackToDashboardButton />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 uppercase tracking-wide">
          {formData._id ? "Edit Resume" : "Create Your Resume"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Choose a Resume Template
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`cursor-pointer border-4 rounded-xl overflow-hidden transition ${
                    selectedTemplate === template.id
                      ? "border-indigo-600 shadow-lg"
                      : "border-transparent"
                  } hover:border-indigo-400`}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage(template.thumbnail);
                    }}
                    className="w-full h-40 object-cover bg-white"
                  />
                  <p className="text-center py-2 font-semibold">{template.name}</p>
                </div>
              ))}
            </div>
          </div>

         
          {modalImage && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
              onClick={() => setModalImage(null)}
            >
              <div
                className="bg-white p-4 rounded-lg max-w-3xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setModalImage(null)}
                  className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                >
                  ×
                </button>
                <img src={modalImage} alt="Full Preview" className="w-full h-auto rounded" />
              </div>
            </div>
          )}

          
          {Object.entries({
            personalDetails: formData.personalDetails,
            skills: formData.skills,
          }).map(([section, values]) => (
            <div key={section} className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2 capitalize">
                {section.replace(/([A-Z])/g, " $1")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(values).map(([field, value]) => (
                  <input
                    key={field}
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={value}
                    onChange={(e) => handleChange(e, section, null, field)}
                    required
                    className="w-full border border-gray-300 p-3 rounded-xl"
                  />
                ))}
              </div>
            </div>
          ))}

          
          {Object.entries({
            education: { university: "", degree: "", cgpa: "", duration: "", courses: "" },
            projects: { title: "", date: "", description: "" },
            experience: { role: "", company: "", duration: "", responsibilities: "" },
            certifications: { name: "" },
            activitiesAwards: { description: "" },
          }).map(([section, template]) => (
            <div key={section} className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2 capitalize">
                {section.replace(/([A-Z])/g, " $1")}
              </h2>
              {formData[section].map((item, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {Object.entries(template).map(([field]) => (
                    <input
                      key={field}
                      type="text"
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={item[field]}
                      onChange={(e) => handleChange(e, section, index, field)}
                      required
                      className="w-full border border-gray-300 p-3 rounded-xl"
                    />
                  ))}
                  <div className="flex items-center justify-end sm:col-span-2 mt-2">
                    <button
                      type="button"
                      onClick={() => removeField(section, index)}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-xl hover:bg-red-200 transition"
                    >
                      − Remove {singularLabels[section] || "Item"}
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addMore(section, template)}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-200"
              >
                + Add More {section.replace(/([A-Z])/g, " $1")}
              </button>
            </div>
          ))}

         
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-xl font-bold hover:bg-indigo-700 transition"
            >
              {formData._id ? "Update Resume" : "Save & Preview"}
            </button>
            {statusMessage && (
              <p className="mt-4 text-center text-lg font-medium text-gray-600">{statusMessage}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
