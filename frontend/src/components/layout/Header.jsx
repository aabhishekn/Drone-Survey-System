import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://www.kindpng.com/picc/m/53-536873_uav-icon-drone-png-transparent-png.png"
              alt="Drone Logo"
              className="w-8 h-8"
            />
            <span className="font-bold text-xl text-gray-800 hover:text-blue-600 transition-colors">
              Drone Survey System
            </span>
          </Link>
          <div className="flex space-x-6">
            {[
              { path: "/", label: "Dashboard" },
              { path: "/missions", label: "Missions" },
              { path: "/mission-planning", label: "Plan Mission" },
              { path: "/fleet-management", label: "Drone" },
              { path: "/survey-reporting", label: "Reports" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-2 py-1 text-sm font-medium transition-all duration-200
                  ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }
                  before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5
                  before:bg-blue-600 before:transform before:scale-x-0 before:transition-transform
                  before:duration-200 hover:before:scale-x-100
                  ${
                    location.pathname === item.path ? "before:scale-x-100" : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
