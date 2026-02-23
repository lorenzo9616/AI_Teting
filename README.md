# Restaurant Scheduling App

A full-stack employee scheduling application for restaurants, featuring role-based access, shift management, and an interactive calendar.

## Project Structure

- **`/client`**: Frontend application (React + TypeScript + Vite).
- **`/server`**: Backend API (Node.js + Express + TypeScript + MySQL).

## 🚀 Local Development Setup

Follow these steps to set up and run the application on your local machine.

### Prerequisites

1.  **Node.js**: Download and install [Node.js](https://nodejs.org/) (v16 or higher).
2.  **MySQL**: Download and install [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).
    -   During installation, set a root password and remember it.
    -   Create a new database named `scheduling_app` (or whatever you prefer).

### 1. Database Setup

Open your MySQL command line or a tool like MySQL Workbench and run:

```sql
CREATE DATABASE scheduling_app;
```

### 2. Backend Setup (`/server`)

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a file named `.env` in the `server` folder and add the following:
    ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_mysql_password
    DB_NAME=scheduling_app
    JWT_SECRET=super_secure_secret_key_change_this
    CLIENT_URL=http://localhost:5173
    ```
    *Replace `your_mysql_password` with your actual MySQL password.*

4.  **Run Migrations/Seed (First Time Only)**:
    (Scripts will be provided to automatically create tables and a default admin user).
    ```bash
    npm run db:init
    ```

5.  **Start the Server**:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

### 3. Frontend Setup (`/client`)

1.  Open a new terminal and navigate to the client directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    Create a file named `.env` in the `client` folder:
    ```env
    VITE_API_URL=http://localhost:5000/api
    ```
4.  **Start the Client**:
    ```bash
    npm run dev
    ```
    The app will open at `http://localhost:5173`.

## Default Login

After running the database initialization, you can log in with:
-   **Email**: `admin@restaurant.com`
-   **Password**: `password123`

## Features

-   **Admin**: Manage employees, roles, and all shifts.
-   **Manager**: Create schedules and approve time off.
-   **Employee**: View personal schedule and request time off.
