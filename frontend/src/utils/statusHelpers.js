export const getStatusColor = (status) => {
  switch (status) {
    case "available":
    case "completed":
      return "bg-green-500";
    case "in-mission":
    case "in-progress":
      return "bg-blue-500";
    case "maintenance":
      return "bg-yellow-500";
    case "scheduled":
      return "bg-purple-500";
    default:
      return "bg-gray-500";
  }
};
