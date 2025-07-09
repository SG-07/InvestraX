import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (  
    <div className="max-w-3xl mx-auto text-center mt-10">
      <h2 className="text-2xl md:text-4xl font-semibold text-gray-900 mb-5">
        The page you are trying to is under development.
      </h2>
      
      <button
        onClick={handleGoHome}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 mt-5 mb-5"
      >
        Home Page
      </button>
    </div>
  );
}

export default NotFound;
