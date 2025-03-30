import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Components
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import MissionPlanning from "./pages/MissionPlanning";
import MissionMonitoring from "./pages/MissionMonitoring";
import SurveyReporting from "./pages/SurveyReporting";
import NotFound from "./pages/NotFound";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-1 pt-16">
          <Sidebar isOpen={sidebarOpen} />

          <main className="flex-1 p-6 bg-slate-100 overflow-auto min-h-[calc(100vh-64px-56px)] mt-2 mb-14 md:ml-64">
            <div className="container mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/mission-planning" element={<MissionPlanning />} />
                <Route
                  path="/mission-monitoring"
                  element={<MissionMonitoring />}
                />
                <Route path="/survey-reporting" element={<SurveyReporting />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
