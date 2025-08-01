// Template3.jsx
const Template3 = ({ formData }) => {
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
    <div className="text-sm max-w-[750px] mx-auto p-4 border border-gray-300 rounded-md bg-white shadow-md font-sans text-gray-800">
      <h1 className="text-center text-lg text-blue-600 font-extrabold uppercase mb-2">
        {formData.personalDetails?.name}
      </h1>
      <div className="text-center text-xs italic text-gray-600 mb-4">
        <span>{formData.personalDetails?.phone} | {formData.personalDetails?.email} | {formData.personalDetails?.github}</span>
      </div>

      {hasContent(formData.education) && (
        <DottedSection title="Education">
          {formData.education?.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{edu.university}, {edu.degree} <span className="text-gray-500">({edu.duration})</span></p>
              <p>CGPA: {edu.cgpa}</p>
              <p className="italic">{edu.courses}</p>
            </div>
          ))}
        </DottedSection>
      )}

      {hasContent(formData.skills) && (
        <DottedSection title="Technical Skills">
          <p><strong>Software/Tools:</strong> {formData.skills?.software}</p>
          <p><strong>Programming Languages:</strong> {formData.skills?.programming}</p>
        </DottedSection>
      )}

      {hasContent(formData.projects) && (
        <DottedSection title="Projects">
          {formData.projects?.map((proj, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{proj.title} <span className="text-gray-500">({proj.date})</span></p>
              <p>{proj.description}</p>
            </div>
          ))}
        </DottedSection>
      )}

      {hasContent(formData.experience) && (
        <DottedSection title="Experience">
          {formData.experience?.map((exp, i) => (
            <div key={i} className="mb-2">
              <p className="font-semibold">{exp.role} at {exp.company} <span className="text-gray-500">({exp.duration})</span></p>
              <p>{exp.responsibilities}</p>
            </div>
          ))}
        </DottedSection>
      )}

      {hasContent(formData.certifications) && (
        <DottedSection title="Certifications">
          {formData.certifications?.map((cert, i) => (
            <p key={i}>{cert.name}</p>
          ))}
        </DottedSection>
      )}

      {hasContent(formData.activitiesAwards) && (
        <DottedSection title="Activities & Awards">
          {formData.activitiesAwards?.map((act, i) => (
            <p key={i}>{act.description}</p>
          ))}
        </DottedSection>
      )}
    </div>
  );
};

const DottedSection = ({ title, children }) => (
  <section className="mb-3 p-3 bg-gray-50 border-b border-dashed border-gray-300 rounded-md">
    <h2 className="text-xs uppercase text-blue-600 font-semibold mb-1 italic">{title}</h2>
    {children}
  </section>
);

export default Template3;
