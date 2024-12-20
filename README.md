# Documentation

## Project Overview
This project is a full-stack application designed to manage and verify data integrity. It consists of a **frontend** (React + TypeScript) and a **backend** (Express + TypeScript). It allows users to perform operations such as viewing current data, verifying data integrity, updating data, creating backups, and restoring data. The application is styled using Tailwind CSS and communicates with the backend via REST APIs.

---

## Features
1. **View Current Data**: Displays the current data fetched from the backend.
2. **Verify Data Integrity**: Checks if the current data has been tampered with or is valid.
3. **Update Data**: Allows users to input new data and update it on the backend.
4. **Create Backup**: Saves the current data as a backup on the backend.
5. **Restore Data**: Restores data from the most recent backup on the backend.


---

## Workflow
### 1. Frontend Workflow
- User interacts with the UI to perform operations such as data updates, integrity verification, backups, and restores.
- The frontend communicates with the backend via REST API endpoints.
- State management ensures data consistency, and feedback is provided to the user through visual updates and alerts.

### 2. Backend Workflow
- The backend processes requests received from the frontend.
- Data integrity is managed using hashing techniques.
- Backups and restores are handled through file operations, ensuring data persistence.


---

## Problems solved

### 1. How does the client ensure that their data has not been tampered with?
This project uses a robust data verification system to ensure data integrity. The process involves the following steps:

1. **Hashing for Integrity Verification**:
   - The backend generates a hash value (checksum) for the data when it is created or updated.
   - This hash is stored securely alongside the data.

2. **Client-Side Verification**:
   - The client triggers a `GET /verify` API call, which instructs the backend to recompute the hash for the current data.
   - The backend compares the newly computed hash with the stored hash.
   - If the hashes match, the data is considered valid; otherwise, it is flagged as tampered.

3. **Frontend Feedback**:
   - The verification status is displayed on the client UI with visual indicators:
     - ✅ **Valid Data**: A green status indicating the data has not been tampered with.
     - ❌ **Tampered Data**: A red status indicating possible tampering.

4. **Automated Alerts**:
   - The system can be configured to notify administrators or users if tampering is detected, enabling swift action.

---

### 2. If the data has been tampered with, how can the client recover the lost data?
This project includes a backup and restore mechanism to recover from data tampering or loss. The workflow is as follows:

1. **Backup Creation**:
   - The client can create backups by triggering the `POST /backup` API call.
   - The backend saves the current data snapshot to a storage location (i.e, file system), in production environment it should be stored in database or some other secured location.

2. **Data Recovery**:
   - In case of tampering, the client can restore the last valid backup by calling the `POST /restore` endpoint.
   - The backend fetches the most recent backup and replaces the tampered data with the valid backup.

3. **Frontend Interaction**:
   - The client UI provides dedicated buttons for backup and restore operations, ensuring ease of use.
   - A confirmation dialog is displayed before restoring data to prevent accidental overwrites.

4. **Error Handling**:
   - If no valid backup exists, the system informs the client with an appropriate error message.

---


---

## Best Practices
1. **Folder Structure**:
   - Organized codebase with dedicated directories for components, utilities, and APIs.
2. **Error Handling**:
   - Comprehensive error messages for invalid requests or data issues.
3. **Type Safety**:
   - Consistent use of TypeScript interfaces for better code clarity.
4. **Modular Design**:
   - Reusable components and utilities for scalability.
5. **Cross-Origin Support**:
   - Enabled CORS to allow frontend-backend communication.

---

## Tech Stack
### Frontend
- **React**: User interface library.
- **TypeScript**: Ensures type safety in development.
- **Tailwind CSS**: Utility-first CSS framework for styling.

### Backend
- **Express.js**: Lightweight web framework.
- **TypeScript**: Enhances code maintainability and reliability.
- **Node.js**: Runtime environment for the backend.
- **Axios**: HTTP client for API requests.

---


## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Steps to Run Locally
1. Clone the repository:

   **Note** - cd to  client and server separately to install packages for both

   ```bash
   git clone https://github.com/YogeshManni/bequest-interview-question-3
   cd client 
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run start
   # or
   yarn start
   ```

4. Client will run at port 3000:
   ```
   http://localhost:3000
   ```

5. Server will run at port 8080:
   ```
   http://localhost:8080
   ```  

---

## Folder Structure

### Project Root

```
Root
|
├── client/               # Frontend source code
├── server/               # Backend source code
├── README.md             # Project documentation
```

### Client
```
project-root/
|├── src/
|   |├── api/
|   |   |├── index.ts  # Contains API functions for backend communication
|   |├── components/
|   |   |├── DataIntegrity.tsx  # Main component for managing data integrity
|     
|├── public/
|   |├── index.html  # Main HTML file
|
|├── index.tsx  # Main entry point of App
|├── index.css  # Tailwind and other styling
|├── package.json  # Project dependencies and scripts
|├── tsconfig.json  # TypeScript configuration
|└── README.md  # Documentation
```

### Server
```
server/
|
|├── utils/
|   |├── backup.ts   
|   |├── integrity.ts
|
|├── app.ts # Main entry point of App
|├── package.json  # Project dependencies and scripts
```


---

## Components
### **DataIntegrity.tsx**
This is the main React component that:
- Fetches the current data on load.
- Provides buttons for verifying, updating, backing up, and restoring data.
- Displays the current data and its integrity status.

#### State Management
- `data`: Stores the current data fetched from the backend.
- `isValid`: Tracks whether the data is valid or tampered.

#### API Interactions
- **GET /data**: Fetches current data.
- **GET /verify**: Verifies data integrity.
- **POST /data**: Updates data.
- **POST /backup**: Creates a backup.
- **POST /restore**: Restores data from backup.

#### Styling
The component uses Tailwind CSS for:
- Responsive layout.
- Consistent button styling.
- Conditional rendering for status messages.

---

## API Integration
### Endpoints
1. **GET /data**
   - Fetches the current data.
   - Response Example:
     ```json
     {
       "data": "Hello Dev World"
     }
     ```

2. **GET /verify**
   - Verifies the integrity of the data.
   - Response Example:
     ```json
     {
       "isValid": true
     }
     ```

3. **POST /data**
   - Updates the current data.
   - Request Body:
     ```json
     {
       "data": "New Data"
     }
     ```
   - Response Example:
     ```json
     {
       "message": "Data updated",
       "data": "New Data"
     }
     ```

4. **POST /backup**
   - Creates a backup of the current data.
   - Response Example:
     ```json
     {
       "message": "Backup created"
     }
     ```

5. **POST /restore**
   - Restores data from the backup.
   - Response Example:
     ```json
     {
       "message": "Data restored",
       "data": "Restored Data"
     }
     ```

---

## Alternative Methods to ensure Data Integrity and recovery - 

### 1. Ensuring Data Has Not Been Tampered With  

### Digital Signatures  
- Use asymmetric encryption to sign data.  
- The client or server generates a signature using a private key, and the recipient verifies it with the corresponding public key.  
- Tampering invalidates the signature, ensuring data integrity.  

### Immutable Storage  
- Store data in append-only systems like blockchain or immutable database tables.  
- Any unauthorized modification creates a trace that can be easily detected.  

### Audit Logs  
- Maintain detailed logs of all operations performed on the data.  
- Regular audits of these logs can help detect and trace unauthorized changes.  

### Version Control  
- Store multiple versions of data over time.  
- Comparing these versions can help identify when and how data was tampered with.  

---

### 2. Recovering Lost or Tampered Data  

### Periodic Backups  
- Automate regular backups to remote storage locations.  
- Ensure redundancy by using cloud storage services to provide additional reliability.  

### Data Replication  
- Implement real-time data replication across multiple nodes or locations.  
- If data on one node is tampered with, another valid copy can be used for recovery.  

### Erasure Coding  
- Use techniques like RAID or erasure coding to split and store data redundantly across different systems.  
- Enables recovery from partial corruption or hardware failures.  

### Snapshotting  
- Take regular snapshots of the data at specific points in time.  
- Allows rollback to a previous valid state if tampering or corruption is detected.  


