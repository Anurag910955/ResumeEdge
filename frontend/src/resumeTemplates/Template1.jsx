const Template1 = ({ formData }) => {
  return (
    <div className="text-sm leading-tight max-w-[700px] mx-auto p-4 border border-black print:shadow-none shadow-md">
      <h1 className="text-center text-lg font-bold mb-1">{formData.personalDetails?.name}</h1>
      <div className="flex flex-wrap justify-center gap-2 text-xs mb-2 text-gray-700 italic">
        <span>{formData.personalDetails?.phone}</span>
        <span>{formData.personalDetails?.email}</span>
        <span>{formData.personalDetails?.github}</span>
      </div>

      <Section title="Education">
        {formData.education?.map((edu, i) => (
          <div key={i}>
            <p className="font-semibold">{edu.university}, {edu.degree} <span className="text-gray-500">({edu.duration})</span></p>
            <p>CGPA: {edu.cgpa}</p>
            <p className="italic">Courses: {edu.courses}</p>
          </div>
        ))}
      </Section>

      <Section title="Technical Skills">
        <p><strong>Software/Tools:</strong> {formData.skills?.software}</p>
        <p><strong>Programming Languages:</strong> {formData.skills?.programming}</p>
      </Section>

      <Section title="Projects">
        {formData.projects?.map((proj, i) => (
          <div key={i}>
            <p className="font-semibold">{proj.title} <span className="text-gray-500">({proj.date})</span></p>
            <p>{proj.description}</p>
          </div>
        ))}
      </Section>

      <Section title="Experience">
        {formData.experience?.map((exp, i) => (
          <div key={i}>
            <p className="font-semibold">{exp.role} at {exp.company} <span className="text-gray-500">({exp.duration})</span></p>
            <p>{exp.responsibilities}</p>
          </div>
        ))}
      </Section>

      <Section title="Certifications">
        {formData.certifications?.map((cert, i) => <p key={i}>{cert.name}</p>)}
      </Section>

      <Section title="Activities & Awards">
        {formData.activitiesAwards?.map((act, i) => <p key={i}>{act.description}</p>)}
      </Section>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-3">
    <h2 className="text-xs uppercase font-bold border-b border-black mb-1">{title}</h2>
    {children}
  </section>
);

export default Template1;
