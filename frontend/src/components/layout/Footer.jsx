const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-4 text-center text-gray-400 text-sm border-t border-slate-700/30">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 hover:text-gray-300 transition-colors duration-300">
          <span className="opacity-90">
            &copy; {new Date().getFullYear()} Drone Survey. All rights reserved.
          </span>
          <span className="flex items-center gap-1 group">
            Made by
            <svg
              className="w-4 h-4 group-hover:text-blue-400 group-hover:rotate-12 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className="group-hover:text-blue-400 transition-colors duration-300">
              abhisheknikam20@gmail.com
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
