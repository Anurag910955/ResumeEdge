import React from "react";

const Template4 = ({ formData }) => {
  const hasContent = (section) => {
    if (!section) return false;
    if (Array.isArray(section)) {
      return section.length > 0 && section.some(item => 
        Object.values(item).some(value => value && value.toString().trim())
      );
    }
    if (typeof section === 'object') {
      return Object.values(section).some(value => value && value.toString().trim());
    }
    return section && section.toString().trim();
  };

  return (
    <div className="text-black text-sm leading-relaxed print:text-black bg-white p-6 md:p-10 rounded-xl border shadow-md max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{formData.personalDetails?.name || "Your Name"}</h1>
        <p className="mt-1 text-gray-600 text-sm md:text-base">
          {formData.personalDetails?.phone} | {formData.personalDetails?.email} | {formData.personalDetails?.github}
        </p>
      </div>

      {/* Education */}
      {hasContent(formData.education) && (
        <Section title="Education">
          {formData.education?.map((edu, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">
                {edu.university}, {edu.degree} <span className="text-sm text-gray-500">({edu.duration})</span>
              </p>
              <p className="text-sm text-gray-700">CGPA: {edu.cgpa}</p>
              <p className="text-sm italic text-gray-500">Courses: {edu.courses}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {hasContent(formData.skills) && (
        <Section title="Technical Skills">
          <p><strong>Software/Tools:</strong> {formData.skills?.software}</p>
          <p><strong>Programming Languages:</strong> {formData.skills?.programming}</p>
        </Section>
      )}

      {/* Projects */}
      {hasContent(formData.projects) && (
        <Section title="Projects">
          {formData.projects?.map((proj, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">
                {proj.title} <span className="text-sm text-gray-500">({proj.date})</span>
              </p>
              <p className="text-sm text-gray-700">{proj.description}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Experience */}
      {hasContent(formData.experience) && (
        <Section title="Experience">
          {formData.experience?.map((exp, i) => (
            <div key={i} className="mb-3">
              <p className="font-medium">
                {exp.role} at {exp.company} <span className="text-sm text-gray-500">({exp.duration})</span>
              </p>
              <p className="text-sm text-gray-700">{exp.responsibilities}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {hasContent(formData.certifications) && (
        <Section title="Certifications">
          {formData.certifications?.map((cert, i) => (
            <p key={i} className="text-sm text-gray-700">{cert.name}</p>
          ))}
        </Section>
      )}

      {/* Activities & Awards */}
      {hasContent(formData.activitiesAwards) && (
        <Section title="Activities & Awards">
          {formData.activitiesAwards?.map((act, i) => (
            <p key={i} className="text-sm text-gray-700">{act.description}</p>
          ))}
        </Section>
      )}
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-lg font-semibold text-blue-700 mb-2">{title}</h2>
    {children}
  </section>
);

export default Template4;
