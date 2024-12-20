import fs from "fs";
import path from "path";
import { DataPayload } from "../app";

const backupDir = path.join(__dirname, "../../backups");

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir);
}

/**
 * Creates a backup of the given data.
 * @param filename - The name of the backup file.
 * @param data - The data to back up.
 */
export const createBackup = (filename: string, data: object): void => {
  const filePath = path.join(backupDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Backup created at ${filePath}`);
};

/**
 * Restores data from a backup file.
 * @param filename - The name of the backup file.
 * @returns The restored data as DataPayload, or null if the file does not exist or is invalid.
 */
export const restoreBackup = (filename: string): DataPayload | null => {
  const filePath = path.join(backupDir, filename);

  if (fs.existsSync(filePath)) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const parsedData = JSON.parse(fileContent);

      // Validate the structure of the parsed data
      if (
        typeof parsedData === "object" &&
        typeof parsedData.data === "string"
      ) {
        return parsedData as DataPayload;
      } else {
        console.error(`Invalid data structure in backup file: ${filename}`);
        return null;
      }
    } catch (error) {
      console.error(`Error reading or parsing backup file: ${filename}`, error);
      return null;
    }
  }

  console.error(`Backup not found: ${filename}`);
  return null;
};
