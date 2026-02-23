Here’s a revised prompt for Gemini Pro based on your specific requirements:

---

**Prompt:**

Create a **simple employee scheduling app** for a restaurant that supports **adjustable roles** and **areas of designation** for **2-100 employees**. The app should allow **easy management of schedules**, **employee roles**, and **assignments** while being easy to scale with a paid option later. The database should only use **MySQL** for storage.

### Features:

1. **Employee Management**:

   * Add and manage up to 100 employees.
   * Assign each employee a **role** (e.g., server, chef, manager, dishwasher, bartender, etc.).
   * Assign employees to specific **areas of designation** (e.g., front of house, kitchen, bar).
2. **Scheduling System**:

   * Managers can **create, edit, and delete shifts** for employees.
   * Employees can **view their shifts**, request **time off**, and mark their **availability**.
   * **Shift assignment notifications** sent via email or app notifications.
3. **Role-Based Access Control**:

   * **Admin/Manager Role**: Full access to manage employees, schedules, and approve time off requests.
   * **Employee Role**: Can view their own schedules, request time off, and update their availability.
4. **Visual Calendar**:

   * **Interactive calendar view** for both **weekly** and **monthly** scheduling.
5. **Paid Option**:

   * Build the app to be free initially, with the **ability to upgrade to a paid plan** for **additional features** (e.g., advanced scheduling, team management, analytics, etc.) later.

### Technologies to Use:

* **Backend**: Node.js with **Express.js** or Python with **Flask/Django**.
* **Frontend**: React or Vue.js for dynamic and interactive UI.
* **Database**: **MySQL** (Ensure the schema is simple and scalable for the restaurant’s needs).
* **Authentication**: Implement **JWT** or **OAuth** for role-based access control.

### Hosting & Deployment:

1. **Frontend Deployment (Free)**:

   * Use **Vercel** or **Netlify** to host the frontend for **free** (no need for a custom DNS at the moment).
   * Ensure the frontend connects with the backend via RESTful API calls.
   * Configure environment variables for backend URLs and any authentication keys.

2. **Backend Deployment (Free)**:

   * Use **Heroku (free tier)** to host the Node.js or Flask/Django server.
   * Deploy the backend with **MySQL** using **ClearDB MySQL** (free MySQL hosting on Heroku) or use **Railway** or **Render** for MySQL hosting if ClearDB exceeds limits.
   * Configure backend settings like database connection and authentication keys in **Heroku environment variables**.

3. **MySQL Database**:

   * Use **ClearDB MySQL** or **Railway** (for free MySQL hosting).
   * Ensure the schema is simple, containing tables for **employees, schedules, roles, and shifts**.
   * Set up automatic backups for the database if necessary.

4. **Authentication Setup**:

   * Implement **JWT-based authentication** for users logging into the system.
   * Make sure to differentiate user roles (Admin, Manager, Employee) by JWT payloads.

5. **Add Paid Option (for Later Expansion)**:

   * Add the option to upgrade to a **paid plan** later, which will offer extra features (e.g., more complex scheduling rules, reporting, analytics, or team management).
   * Allow the system to switch between free and paid plans by adding a feature flag or plan identifier in the database schema.

### Step-by-Step Guide to Deploy:

1. **Frontend**:

   * Build the **React** or **Vue.js** app with components for viewing and managing shifts.
   * Deploy to **Vercel** or **Netlify**:

     * Create an account on Vercel/Netlify.
     * Link the repository to the service.
     * Set up environment variables for API base URLs and authentication.
     * Deploy the app with automatic deployment on every push to the repository.

2. **Backend**:

   * Develop a REST API with **Express.js** or **Flask/Django** for scheduling and employee management.
   * Deploy to **Heroku** (free tier):

     * Create an account on **Heroku**.
     * Set up the Node.js app or Python app.
     * Set environment variables for the MySQL database connection.
     * Add **ClearDB MySQL** or **Railway** for free database hosting.
     * Push the app to Heroku and deploy automatically.

3. **Database Setup**:

   * Set up **ClearDB MySQL** on Heroku or use **Railway** for free MySQL hosting.
   * Migrate the schema (employees, roles, shifts, time-off requests) to the MySQL database.
   * Ensure the database is connected to the backend server.

4. **Authentication**:

   * Implement **JWT authentication** for users (with roles for Admin, Manager, and Employee).
   * Secure routes for creating, editing, and viewing schedules based on roles.
   * Ensure authentication flows are working and that users cannot access other users’ schedules.

5. **Test the App**:

   * Test user login and role-based access (Admin, Manager, Employee).
   * Create a few employees, assign shifts, and ensure the calendar is functional.
   * Ensure the notification system sends updates for new shifts or time-off requests.

6. **Final Steps**:

   * Ensure the app works across different devices.
   * Test the frontend’s connection with the backend API (check API calls, authentication flow, and UI updates).
   * Finalize the deployment on **Vercel/Netlify** for frontend and **Heroku** for backend.

---

This setup ensures the app is **free** to start with and easy to expand to a **paid option** later. The deployment is optimized for **free hosting solutions** like Heroku, Vercel, or Netlify, with a simple **MySQL** backend.

Let me know if you'd like any more details or adjustments!
