import axios from "axios";

const API_BASE = "http://localhost:8080";

// Fetch the current data
export const getData = async (): Promise<{ data: string }> => {
  const response = await axios.get(`${API_BASE}/data`);
  return response.data;
};

// Verify data integrity
export const verifyData = async (): Promise<{ isValid: boolean }> => {
  const response = await axios.get(`${API_BASE}/verify`);
  return response.data;
};

// Update/tamper with the data
export const updateData = async (data: string): Promise<void> => {
  await axios.post(`${API_BASE}/data`, { data });
};

// Create a backup of the current data
export const createBackup = async (): Promise<void> => {
  await axios.post(`${API_BASE}/backup`);
};

// Restore data from a backup
export const restoreData = async (): Promise<void> => {
  await axios.post(`${API_BASE}/restore`);
};
