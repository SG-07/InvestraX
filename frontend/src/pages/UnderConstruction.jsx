import { Link } from "react-router-dom";

function UnderConstruction() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="text-center mt-40">
      <h1 className="text-4xl font-bold text-gray-700">🚧 Page Under Construction</h1>
      <p className="text-lg text-gray-500 mt-4">We’re working hard to bring this page to life. Stay tuned!</p>
    </div>
  );
}

export default UnderConstruction;
