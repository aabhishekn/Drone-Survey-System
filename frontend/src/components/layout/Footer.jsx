const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white h-14 border-t border-slate-700">
      <div className="container mx-auto h-full px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-blue-400"
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
            <span className="font-medium">
              Drone Survey &copy; {new Date().getFullYear()}
            </span>
          </div>
        </div>
        <div className="flex space-x-6">
          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-xs"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-xs"
          >
            Contact
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-xs"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
