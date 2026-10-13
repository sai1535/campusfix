# CampusFix – Smart Campus Issue Management System

CampusFix is a web-based campus issue management platform designed to simplify how students report and track problems within their college. It provides a centralized system for reporting issues such as classroom maintenance, electrical faults, cleanliness, and other campus facilities problems.

The platform helps administrators manage reported issues, monitor their status, and improve communication between students and campus management.

## 🚀 Features

* **Issue Reporting:** Students can submit campus-related complaints and maintenance requests.
* **Issue Tracking:** Track reported issues and their progress through the system.
* **User Authentication:** Secure authentication and validation for user-related operations.
* **Role-Based Access:** Support for separating student and administrative functionality, where configured.
* **Issue Management:** Organize and manage reported campus problems.
* **Dashboard:** Provide an overview of issues and relevant activity.
* **REST API:** Backend endpoints support communication between the frontend and server.
* **Modular Backend:** Organized routes, middleware, models, services, and utility modules.

## 🛠️ Technology Stack

Update this section to match the technologies actually used in your project.

* **Frontend:** Add your actual frontend framework and styling tools.
* **Backend:** Node.js, Express.js, TypeScript
* **Database:** Add your actual database technology.
* **Authentication:** Authentication middleware and token utilities, as implemented.
* **API Architecture:** REST APIs
* **Development Tools:** Git, GitHub, npm

## 📁 Project Structure

```text
CampusFix/
├── client/                  # Frontend application (if applicable)
├── server/
│   ├── src/
│   │   ├── middleware/      # Authentication and validation
│   │   ├── models/          # User, issue and vote models
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Issue and ML-related services
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Token and utility functions
│   └── tsconfig.json
├── .gitignore
└── README.md
```

*Note: Adjust the folder names above if your actual repository uses a different structure.*

## ⚙️ Getting Started

### Prerequisites

Install the following tools before running the project:

* Node.js
* npm
* Your configured database
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/sai1535/CampusFix.git
cd CampusFix
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory if required by your application.

Example configuration:

```env
PORT=5000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
```

Replace these example values with the configuration required by your application. Never commit real passwords, API keys, or secrets to GitHub.

### 4. Start the Backend

Use the development command configured in your `server/package.json`. For example, if your project uses `ts-node-dev`:

```bash
npm run dev
```

If your project uses a different script, run the appropriate command from `package.json`.

### 5. Run the Frontend

If your project has a separate frontend directory, open another terminal, navigate to that directory, install its dependencies, and run its configured development script.

## 🔌 API Overview

The backend source structure includes route modules for authentication, dashboards, and issues.

| Module         | Purpose                                    |
| -------------- | ------------------------------------------ |
| Authentication | User authentication and related operations |
| Issues         | Issue-related API operations               |
| Dashboard      | Dashboard data and summaries               |
| Index          | Central route registration                 |

Refer to the implementation in `server/src/routes/` for the actual endpoints, HTTP methods, request formats, and response structures.

## 🔒 Security

* Validate incoming requests.
* Protect restricted routes with authentication middleware.
* Store secrets in environment variables.
* Avoid committing credentials and sensitive configuration files.
* Apply appropriate authorization checks to administrative operations.

## 🎯 Project Objectives

* Simplify campus complaint reporting.
* Improve visibility into maintenance requests.
* Centralize issue management.
* Reduce communication gaps between students and administrators.
* Support more efficient campus facility management.

## 🔮 Future Enhancements

* Real-time issue status notifications.
* Image uploads for issue evidence.
* Priority-based issue classification.
* AI-assisted categorization and duplicate issue detection.
* Analytics dashboard for identifying recurring campus problems.
* Mobile-friendly interface and deployment.

## 👨‍💻 Author

**Sai Kumar Sidramaina**

* GitHub: [sai1535](https://github.com/sai1535)
* Project: [CampusFix](https://github.com/sai1535/CampusFix)

## 📄 License

Choose a license appropriate for your project before distributing or reusing the source code. If you have not selected one, you can leave this section out until you decide.
