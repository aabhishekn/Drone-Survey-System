import { useState, useEffect } from "react";

const SurveyReporting = () => {
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({});
  const [filterMonth, setFilterMonth] = useState("all");
  const [filterDrone, setFilterDrone] = useState("all");
  const [filterArea, setFilterArea] = useState("all");

  // Mock data for completed missions
  const mockReports = [
    {
      id: 101,
      name: "Factory South Perimeter",
      date: "2023-03-15",
      month: "March",
      drone: "Alpha-1",
      area: "South Building",
      duration: "45 minutes",
      distance: "2.4 km",
      coverage: "0.8 km²",
      images: 145,
      status: "completed",
      findings: "No anomalies detected",
    },
    {
      id: 98,
      name: "North Campus Monthly",
      date: "2023-03-08",
      month: "March",
      drone: "Delta-4",
      area: "North Campus",
      duration: "72 minutes",
      distance: "3.7 km",
      coverage: "1.2 km²",
      images: 218,
      status: "completed",
      findings: "Vegetation encroachment on east side",
    },
    {
      id: 95,
      name: "Warehouse Roof Inspection",
      date: "2023-03-01",
      month: "March",
      drone: "Beta-2",
      area: "Main Warehouse",
      duration: "34 minutes",
      distance: "1.2 km",
      coverage: "0.3 km²",
      images: 89,
      status: "completed",
      findings: "Possible drainage issue identified",
    },
    {
      id: 92,
      name: "Main Office Building",
      date: "2023-02-25",
      month: "February",
      drone: "Alpha-1",
      area: "Central Campus",
      duration: "51 minutes",
      distance: "1.8 km",
      coverage: "0.5 km²",
      images: 124,
      status: "completed",
      findings: "All clear",
    },
    {
      id: 89,
      name: "Perimeter Security Inspection",
      date: "2023-02-15",
      month: "February",
      drone: "Gamma-3",
      area: "Full Perimeter",
      duration: "96 minutes",
      distance: "5.2 km",
      coverage: "1.8 km²",
      images: 276,
      status: "completed",
      findings: "Security fence damaged in NW corner",
    },
  ];

  // Process data for statistics
  useEffect(() => {
    setTimeout(() => {
      setReports(mockReports);

      // Calculate aggregate statistics
      const totalMissions = mockReports.length;
      const totalFlightTime = mockReports.reduce((sum, report) => {
        const minutes = parseInt(report.duration.split(" ")[0]);
        return sum + minutes;
      }, 0);
      const totalDistance = mockReports.reduce((sum, report) => {
        const km = parseFloat(report.distance.split(" ")[0]);
        return sum + km;
      }, 0);
      const totalCoverage = mockReports.reduce((sum, report) => {
        const km2 = parseFloat(report.coverage.split(" ")[0]);
        return sum + km2;
      }, 0);
      const totalImages = mockReports.reduce(
        (sum, report) => sum + report.images,
        0
      );

      // Find unique drones and areas for filters
      const uniqueDrones = [
        ...new Set(mockReports.map((report) => report.drone)),
      ];
      const uniqueAreas = [
        ...new Set(mockReports.map((report) => report.area)),
      ];
      const uniqueMonths = [
        ...new Set(mockReports.map((report) => report.month)),
      ];

      setStats({
        totalMissions,
        totalFlightTime,
        totalDistance: totalDistance.toFixed(1),
        totalCoverage: totalCoverage.toFixed(1),
        totalImages,
        uniqueDrones,
        uniqueAreas,
        uniqueMonths,
      });

      setLoading(false);
    }, 800);
  }, []);

  // Filter reports based on selected filters
  const filteredReports = reports.filter((report) => {
    let matchesMonth = filterMonth === "all" || report.month === filterMonth;
    let matchesDrone = filterDrone === "all" || report.drone === filterDrone;
    let matchesArea = filterArea === "all" || report.area === filterArea;

    return matchesMonth && matchesDrone && matchesArea;
  });

  const handleExport = (format) => {
    // In a real app, this would generate and download a file
    alert(`Exporting data as ${format.toUpperCase()}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Survey Reporting</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => handleExport("pdf")}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Export PDF
          </button>
          <button
            onClick={() => handleExport("csv")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Total Missions</h2>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalMissions}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Flight Time</h2>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalFlightTime} min
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Distance Covered</h2>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalDistance} km
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-2">Area Surveyed</h2>
          <div className="text-3xl font-bold text-blue-600">
            {stats.totalCoverage} km²
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Filter Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="month-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Month
            </label>
            <select
              id="month-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
            >
              <option value="all">All Months</option>
              {stats.uniqueMonths &&
                stats.uniqueMonths.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="drone-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Drone
            </label>
            <select
              id="drone-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterDrone}
              onChange={(e) => setFilterDrone(e.target.value)}
            >
              <option value="all">All Drones</option>
              {stats.uniqueDrones &&
                stats.uniqueDrones.map((drone) => (
                  <option key={drone} value={drone}>
                    {drone}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="area-filter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Area
            </label>
            <select
              id="area-filter"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterArea}
              onChange={(e) => setFilterArea(e.target.value)}
            >
              <option value="all">All Areas</option>
              {stats.uniqueAreas &&
                stats.uniqueAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Mission Reports Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Mission Reports</h2>
          <p className="text-sm text-gray-500">
            Showing {filteredReports.length} of {reports.length} reports
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mission
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Area
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Distance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Images
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Findings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {report.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.drone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.area}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.distance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {report.images}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-xs truncate">
                    {report.findings}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SurveyReporting;
