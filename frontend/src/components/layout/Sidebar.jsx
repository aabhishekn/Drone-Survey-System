import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`bg-slate-900 text-white w-64 fixed transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-30 shadow-xl top-16 h-[calc(100vh-64px-56px)]`}
    >
      <div className="p-5 overflow-y-auto h-full">
        <h2 className="text-xl font-semibold mb-8 text-gray-100">Navigation</h2>

        <nav className="space-y-6">
          <div>
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">
              Main
            </h3>
            <Link
              to="/"
              className={`block py-2.5 px-4 rounded transition-colors duration-200 flex items-center ${
                isActiveRoute("/")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <svg
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Dashboard</span>
            </Link>
          </div>

          <div>
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">
              Missions
            </h3>
            <Link
              to="/mission-planning"
              className={`block py-2.5 px-4 rounded transition-colors duration-200 flex items-center ${
                isActiveRoute("/mission-planning")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <svg
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <span>Mission Planning</span>
            </Link>
            <Link
              to="/mission-monitoring"
              className={`block py-2.5 px-4 rounded transition-colors duration-200 flex items-center mt-2 ${
                isActiveRoute("/mission-monitoring")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <svg
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <span>Mission Monitoring</span>
            </Link>
          </div>

          <div>
            <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3 font-semibold">
              Reports
            </h3>
            <Link
              to="/survey-reporting"
              className={`block py-2.5 px-4 rounded transition-colors duration-200 flex items-center ${
                isActiveRoute("/survey-reporting")
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <svg
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Survey Reports</span>
            </Link>
          </div>
        </nav>
      </div>

      <div className="px-5 py-4 border-t border-slate-700 absolute bottom-0 left-0 right-0">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-sm font-semibold">
            U
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@example.com</p>
          </div>
        </div>
        <button className="w-full flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md text-sm transition-colors">
          <svg
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
