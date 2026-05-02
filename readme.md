
# Campus Notification System

A full-stack application that fetches, prioritizes, and displays campus notifications in a clean, modern UI.

---

## Features

### 🔹 Backend

* 🔐 Secure API integration with authentication
* 🔄 Automatic token generation & refresh
* 📊 Priority-based sorting:
  * Placement > Result > Event
* ⏱ Timestamp-based sorting (latest first)
* 🔍 Filtering by notification type
* 📄 Pagination support
* 🧾 Centralized logging middleware

---

### 🔹 Frontend

* 🌙 Clean dark-themed UI
* 🎯 Filter notifications by type
* 📑 Paginated results
* ⚡ Smooth user experience
* 📱 Responsive layout

---

## Tech Stack

**Frontend**

* React.js
* Axios
* CSS (custom styling)

**Backend**

* Node.js
* Express.js
* Axios
* dotenv

---

## Project Structure

```
RA2311003040085/
│
├── logging_middleware/
│   └── logger.js
│
├── notification_app_be/
│   ├── server.js
│   ├── auth.js
│   ├── .env
│
├── notification_app_fe/
│   ├── src/
│   ├── public/
│
├── notification_system_design.md
├── package.json
└── .gitignore
```

---

## Setup Instructions

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/your-username/YOUR_ROLL_NUMBER.git
cd YOUR_ROLL_NUMBER
```

---

### 🔹 2. Backend Setup

```bash
cd notification_app_be
npm install
```

Create `.env` file:

```
EMAIL=your_email
NAME=your_name
ROLL_NO=your_roll_number
ACCESS_CODE=your_access_code
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
```

Run backend:

```bash
node server.js
```

---

### 🔹 3. Frontend Setup

```bash
cd ../notification_app_fe
npm install
npm start
```

---

## Authentication Flow

1. Backend requests token from `/auth`
2. Token is cached for performance
3. Automatically refreshed when expired
4. Used for all API calls

---

## Sorting Logic

Notifications are sorted based on:

1. **Priority**
   * Placement (3)
   * Result (2)
   * Event (1)
2. **Timestamp**
   * Latest notifications first

---

## Time Complexity

* Sorting: `O(n log n)`
* Filtering: `O(n)`
* Overall: Efficient for real-time usage

---

## Logging Middleware

Custom logging function:

```js
Log(stack, level, package, message)
```

Logs:

* API calls
* Errors
* Processing steps

---

## Screenshots


---

## Notes

* `.env` file is excluded from version control for security
* Tokens are dynamically generated (not hardcoded)
* No database is used (as per requirements)

---

## Outcome

* Fully functional full-stack system
* Clean UI + optimized backend
* Production-level authentication handling
* Ready for evaluation and demonstration

---

## Author

Kunal Meshram
Roll No: RA2311003040085

---
