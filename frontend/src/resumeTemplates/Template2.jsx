const Template2 = ({ formData }) => {
  return (
    <div className="text-sm max-w-[700px] mx-auto p-5 border border-gray-300 rounded-lg shadow-md bg-gradient-to-b from-white to-gray-50">
      <h1 className="text-center text-lg font-bold uppercase text-gray-800 relative pb-2 mb-2 after:content-[''] after:block after:w-12 after:h-1 after:bg-blue-500 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2" >
        {formData.personalDetails?.name}
      </h1>
      <div className="text-xs italic text-center flex flex-wrap justify-center gap-2 text-gray-600 mb-4">
        <span>{formData.personalDetails?.phone}</span>
        <span>{formData.personalDetails?.email}</span>
        <span>{formData.personalDetails?.github}</span>
      </div>

      <StyledSection title="Education" borderColor="border-blue-500">
        {formData.education?.map((edu, i) => (
          <div key={i}>
            <p className="font-semibold">{edu.university}, {edu.degree} <span className="text-gray-500">({edu.duration})</span></p>
            <p className="text-gray-700">CGPA: {edu.cgpa}</p>
            <p className="italic">Courses: {edu.courses}</p>
          </div>
        ))}
      </StyledSection>

      <StyledSection title="Technical Skills" borderColor="border-blue-500">
        <p><strong>Software/Tools:</strong> {formData.skills?.software}</p>
        <p><strong>Programming Languages:</strong> {formData.skills?.programming}</p>
      </StyledSection>

      <StyledSection title="Projects" borderColor="border-blue-500">
        {formData.projects?.map((proj, i) => (
          <div key={i}>
            <p className="font-semibold">{proj.title} <span className="text-gray-500">({proj.date})</span></p>
            <p>{proj.description}</p>
          </div>
        ))}
      </StyledSection>

      <StyledSection title="Experience" borderColor="border-blue-500">
        {formData.experience?.map((exp, i) => (
          <div key={i}>
            <p className="font-semibold">{exp.role} at {exp.company} <span className="text-gray-500">({exp.duration})</span></p>
            <p>{exp.responsibilities}</p>
          </div>
        ))}
      </StyledSection>

      <StyledSection title="Certifications" borderColor="border-blue-500">
        {formData.certifications?.map((cert, i) => <p key={i}>{cert.name}</p>)}
      </StyledSection>

      <StyledSection title="Activities & Awards" borderColor="border-blue-500">
        {formData.activitiesAwards?.map((act, i) => <p key={i}>{act.description}</p>)}
      </StyledSection>
    </div>
  );
};

const StyledSection = ({ title, borderColor, children }) => (
  <section className={`mb-4 p-3 rounded-md bg-gray-50 border-l-4 ${borderColor}`}>
    <h2 className="text-xs font-bold uppercase text-gray-800 mb-2">{title}</h2>
    {children}
  </section>
);

export default Template2;
