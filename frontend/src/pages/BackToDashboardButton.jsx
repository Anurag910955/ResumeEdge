import { useNavigate } from "react-router-dom";

const BackToDashboardButton = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-start mb-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition text-sm sm:text-base"
      >
        🏠 Dashboard
      </button>
    </div>
  );
};

export default BackToDashboardButton;
