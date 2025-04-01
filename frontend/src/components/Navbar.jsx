import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/missions" className="text-gray-800 hover:text-blue-600">
              Missions
            </Link>
            <Link
              to="/mission-planning"
              className="text-gray-800 hover:text-blue-600"
            >
              Plan Mission
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
