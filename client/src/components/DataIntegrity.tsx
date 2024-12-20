import React, { useState, useEffect } from "react";
import {
  getData,
  verifyData,
  updateData,
  createBackup,
  restoreData,
} from "../api";


const DataIntegrity: React.FC = () => {
  // State for storing current data
  const [data, setData] = useState<string>("");
  // State for tracking the validity of the data
  const [isValid, setIsValid] = useState<boolean | null>(null);

  // Fetch the current data from the backend when the component loads
  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(); // Call API to get data
      setData(result.data);
    };
    fetchData(); // Execute fetch function
  }, []);

  // Handle verifying the integrity of the data
  const handleVerify = async () => {
    const result = await verifyData(); // Call API to verify data integrity
    setIsValid(result.isValid); // Update the validity state
  };

  // Handle updating the data
  const handleUpdate = async () => {
    // Prompt the user for new data input
    const newData = prompt("Enter new data:", data);
    if (newData !== null && newData.trim() !== "") {
      await updateData(newData.trim()); // Call API to update the data
      setData(newData.trim()); // Update the state with the new data
      alert("Data updated"); // Notify the user
    }
  };

  // Handle creating a backup of the current data
  const handleBackup = async () => {
    await createBackup(); // Call API to create a backup
    alert("Backup created"); // Notify the user
  };

  // Handle restoring data from the backup
  const handleRestore = async () => {
    await restoreData(); // Call API to restore data from backup
    const result = await getData(); // Fetch the restored data
    setData(result.data); // Update the state with the restored data
    alert("Data restored"); // Notify the user
  };

  // Render the component UI
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Data Integrity Management
      </h1>
      {/* Display current data */}
      <p className="mb-4 text-gray-600">
        <span className="font-semibold">Current Data:</span>{" "}
        <span className="text-gray-800">{data}</span>
      </p>
      {/* Buttons for various operations */}
      <div className="flex flex-wrap gap-4 mb-4">
        {/* Verify Data Button */}
        <button
          onClick={handleVerify}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Verify Data
        </button>
        {/* Update Data Button */}
        <button
          onClick={handleUpdate}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
        >
          Update Data
        </button>
        {/* Create Backup Button */}
        <button
          onClick={handleBackup}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg shadow hover:bg-yellow-600"
        >
          Create Backup
        </button>
        {/* Restore Data Button */}
        <button
          onClick={handleRestore}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600"
        >
          Restore Data
        </button>
      </div>
      {/* Display data integrity status */}
      {isValid !== null && (
        <p className="text-lg">
          <span className="font-semibold">Data Integrity:</span>{" "}
          <span
            className={`${
              isValid ? "text-green-500" : "text-red-500"
            } font-bold`}
          >
            {isValid ? "✅ Valid" : "❌ Tampered"}
          </span>
        </p>
      )}
    </div>
  );
};

export default DataIntegrity;
