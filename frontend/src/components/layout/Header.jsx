import { Link } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-slate-800 text-white shadow-lg h-16">
      <div className="container mx-auto h-full px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            className="md:hidden mr-4 text-white focus:outline-none hover:text-gray-300 transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link
            to="/"
            className="text-2xl font-bold text-white flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <span>Drone Survey</span>
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/mission-planning"
            className="hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            Mission Planning
          </Link>
          <Link
            to="/mission-monitoring"
            className="hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            Mission Monitoring
          </Link>
          <Link
            to="/survey-reporting"
            className="hover:text-blue-300 transition-colors duration-200 font-medium"
          >
            Survey Reporting
          </Link>
        </nav>

        <div className="flex items-center">
          <div className="relative">
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-lg font-semibold shadow-md">
                U
              </div>
              <span className="ml-2 hidden sm:inline">Admin</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
