import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResumeForm from "./pages/ResumeForm";
import ResumePreview from "./pages/ResumePreview";
import MyResumes from "./pages/MyResumes";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/resume-form" element={<ResumeForm />} />
        <Route path="/resume-preview" element={<ResumePreview />} />
        <Route path="/my-resumes" element={<MyResumes />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;