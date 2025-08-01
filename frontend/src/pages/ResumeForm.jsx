import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ResumeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingData = location.state || null;
  const userId = existingData?.userId ?? "650d4f12a5c8b9c123456789";

  const [selectedTemplate, setSelectedTemplate] = useState(
    existingData?.selectedTemplate || "template1"
  );

  const [formData, setFormData] = useState(
    existingData || {
      personalDetails: { name: "", email: "", phone: "", github: "" },
      education: [{ university: "", degree: "", cgpa: "", duration: "", courses: "" }],
      skills: { software: "", programming: "" },
      projects: [{ title: "", date: "", description: "" }],
      experience: [{ role: "", company: "", duration: "", responsibilities: "" }],
      certifications: [{ name: "" }],
      activitiesAwards: [{ description: "" }],
    }
  );

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
    if (!userId || userId.length !== 24) {
      alert("Invalid user ID. Please log in again.");
      return;
    }

    const dataToSubmit = { ...formData, selectedTemplate, userId };

    try {
     
      if (existingData) {
        await axios.put(
          `http://localhost:5000/api/resume/update/${userId}`,
          dataToSubmit
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/resume/save",
          dataToSubmit
        );
      }

      alert(existingData ? "Resume updated successfully!" : "Resume saved successfully!");
      navigate("/resume-preview", { state: dataToSubmit });
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-green-100 py-10 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 uppercase tracking-wide">
          {existingData ? "Edit Resume" : "Create Your Resume"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Template Selection */}
          <div className="md:col-span-2">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Resume Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl"
            >
              <option value="template1">Template 1 - Modern Professional</option>
              <option value="template2">Template 2 - Classic Clean</option>
              <option value="template3">Template 3 - Creative & Bold</option>
              <option value="template4">Template 4 - Elegant Blue Accent</option>
            </select>
          </div>

          {/* Static Sections: Personal & Skills */}
          {Object.entries({
            personalDetails: formData.personalDetails,
            skills: formData.skills,
          }).map(([section, values]) => (
            <div key={section} className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-indigo-700 mb-4 border-b pb-2 capitalize">
                {section.replace(/([A-Z])/g, " $1")}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
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

          {/* Dynamic Sections */}
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
                <div key={index} className="grid md:grid-cols-2 gap-4 mb-4">
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
                  <div className="flex items-center justify-end md:col-span-2 mt-2">
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

          {/* Submit Button */}
          <div className="md:col-span-2 mt-6">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl text-xl font-bold hover:bg-indigo-700 transition"
            >
              {existingData ? "Update Resume" : "Save & Preview"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeForm;
