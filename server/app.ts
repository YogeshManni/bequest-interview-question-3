import express, { Request, Response } from "express";
import { generateHash, verifyHash } from "./utils/integrity";
import { createBackup, restoreBackup } from "./utils/backup";
import cors from "cors";

// Define the data payload structure
export interface DataPayload {
  data: string; // Represents the data stored in the simulated database
}

// In-memory simulated database
let database: DataPayload = { data: "Hello Dev World" }; // Initial database content
let storedHash: string = generateHash(database.data); // Generate hash for initial data

const app = express();
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Endpoint to get the current data
app.get("/data", (req: Request, res: Response) => {
  // Return the current data from the in-memory database
  res.json({ data: database.data });
});

// Endpoint to verify data integrity
app.get("/verify", (req: Request, res: Response) => {
  // Check if the stored hash matches the current data's hash
  const isValid = verifyHash(database.data, storedHash);
  // Respond with the verification result
  res.json({ isValid });
});

// Endpoint to update or tamper with the data
app.post("/data", (req: Request, res: Response) => {
  const { data }: DataPayload = req.body;

  // Validate the incoming data
  if (!data || typeof data !== "string") {
    return res.status(400).json({ error: "Invalid data format" });
  }

  // Update the in-memory database with the new data
  database.data = data;
  // Respond with a confirmation message and the updated data
  res.json({ message: "Data updated", data: database.data });
});

// Endpoint to create a backup of the data
app.post("/backup", (req: Request, res: Response) => {
  // Save the current database state to a backup file
  createBackup("database_backup.json", database);
  // Respond with a confirmation message
  res.json({ message: "Backup created" });
});

// Endpoint to restore data from the backup
app.post("/restore", (req: Request, res: Response) => {
  // Restore data from the backup file
  const restoredData = restoreBackup("database_backup.json");

  // Check if the restoration was successful and valid
  if (restoredData && typeof restoredData.data === "string") {
    database = restoredData as DataPayload; // Update the database with restored data
    storedHash = generateHash(database.data); // Regenerate the hash for the restored data
    res.json({ message: "Data restored", data: database.data });
  } else {
    // Respond with an error if the backup is not found or invalid
    res.status(404).json({ error: "Backup not found or invalid" });
  }
});

// Start the server
const PORT = 8080; // Define the server's port
app.listen(PORT, () => {
  // Log a message indicating the server is running
  console.log(`Server is running on http://localhost:${PORT}`);
});
