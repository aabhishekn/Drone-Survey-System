import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./contexts/AppContext";

// Components
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Dashboard from "./pages/Dashboard";
import FleetManagement from "./pages/FleetManagement";
import MissionPlanning from "./pages/MissionPlanning";
import MissionMonitoring from "./pages/MissionMonitoring";
import SurveyReporting from "./pages/SurveyReporting";
import NotFound from "./pages/NotFound";
import Missions from "./pages/Missions";

function App() {
  return (
    <AppProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
          <main className="flex-1 p-6 overflow-auto min-h-[calc(100vh-64px-56px)] mt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/missions" element={<Missions />} />
              <Route path="/mission-planning" element={<MissionPlanning />} />
              <Route
                path="/mission-monitoring/:id"
                element={<MissionMonitoring />}
              />
              <Route path="/fleet-management" element={<FleetManagement />} />
              <Route path="/survey-reporting" element={<SurveyReporting />} />
              <Route path="/survey-reports" element={<SurveyReporting />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
