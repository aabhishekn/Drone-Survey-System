import React, { useState, useEffect } from "react";
import { fetchReports } from "../services/surveyReports";

const SurveyReporting = () => {
  const [surveyStats, setSurveyStats] = useState({
    totalSurveys: 0,
    flightHours: 0,
    successRate: 0,
    totalDistance: 0,
  });

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchReports();

        if (!response.data || !response.data.success) {
          throw new Error(response.data?.error || "Failed to fetch data");
        }

        const reports = response.data.data || [];
        setReports(reports);

        if (reports.length === 0) {
          setSurveyStats({
            totalSurveys: 0,
            flightHours: 0,
            successRate: 0,
            totalDistance: 0,
          });
          return;
        }

        // Calculate stats from reports
        const totalStats = reports.reduce(
          (acc, curr) => ({
            totalSurveys: acc.totalSurveys + 1,
            flightHours: acc.flightHours + (curr.duration || 0) / 60,
            totalDistance: acc.totalDistance + (curr.distance || 0),
          }),
          { totalSurveys: 0, flightHours: 0, totalDistance: 0 }
        );

        const completed = reports.filter(
          (r) => r.status === "completed"
        ).length;

        setSurveyStats({
          ...totalStats,
          flightHours: Math.round(totalStats.flightHours * 10) / 10,
          successRate: reports.length
            ? Math.round((completed / reports.length) * 100)
            : 0,
        });
      } catch (error) {
        console.error("Error fetching survey data:", error);
        setError(error.message || "Failed to load survey data");
        setReports([]);
        setSurveyStats({
          totalSurveys: 0,
          flightHours: 0,
          successRate: 0,
          totalDistance: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, []);

  if (loading) return <div className="p-6">Loading survey data...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Survey Reports</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600">Total Surveys</h3>
          <p className="text-2xl font-bold">{surveyStats.totalSurveys}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600">Flight Hours</h3>
          <p className="text-2xl font-bold">{surveyStats.flightHours}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600">Success Rate</h3>
          <p className="text-2xl font-bold">{surveyStats.successRate}%</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-gray-600">Total Distance</h3>
          <p className="text-2xl font-bold">{surveyStats.totalDistance} km</p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mission Name
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
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No reports available
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{report.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.drone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.area} m²
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.distance} km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        report.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyReporting;
