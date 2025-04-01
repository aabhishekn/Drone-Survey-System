const MissionConfirmationModal = ({
  show,
  onClose,
  onPlanAnother,
  onGoToMissions,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">
          Mission Created Successfully!
        </h3>
        <p className="text-gray-600 mb-6">What would you like to do next?</p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={onPlanAnother}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Plan Another Mission
          </button>

          <button
            onClick={onGoToMissions}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            Go to Missions Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionConfirmationModal;
