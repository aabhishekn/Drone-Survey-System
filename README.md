# Drone Survey Management System

A comprehensive system designed for corporate facility managers to plan, manage, and monitor autonomous drone surveys across global locations.

## Features

- **Mission Planning**: Define survey areas, design flight paths, and schedule one-time or recurring missions.
- **Fleet Management**: Dashboard of drone inventory showing real-time statuses and vital stats.
- **Mission Monitoring**: Real-time visualization of drone flight paths on a map with mission progress and control actions.
- **Survey Reporting**: Generate detailed survey summaries with flight statistics and organizational metrics.

## Tech Stack

### Frontend

- React (with Vite)
- Tailwind CSS
- React Router
- Mapbox GL JS (for mapping)
- Axios (for API requests)

### Backend

- Node.js
- Express
- MongoDB/Mongoose (database schema ready, using mock data for demo)

## Project Structure

```
drone-survey-management/
├── frontend/             # React frontend
│   ├── public/
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # Main page components
│       └── ...
├── backend/              # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/drone-survey-management.git
cd drone-survey-management
```

2. Install Backend dependencies

```bash
cd backend
npm install
```

3. Set up environment variables in backend
   Create a `.env` file in the backend directory with:

```
NODE_ENV=development
PORT=5000
```

4. Install Frontend dependencies

```bash
cd ../frontend
npm install
```

5. Replace Mapbox token
   In `frontend/src/pages/MissionMonitoring.jsx`, replace the Mapbox access token with your own from [Mapbox](https://www.mapbox.com/).

### Running the application

1. Start the backend server

```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend

```bash
cd frontend
npm run dev
```

3. Access the application at `http://localhost:5173`

## Usage

1. **Dashboard**: View overall fleet and mission statistics
2. **Mission Planning**: Create new missions with waypoints and settings
3. **Mission Monitoring**: Track active missions on the map and control them
4. **Survey Reporting**: View completed mission reports and analytics

## Notes

- This is a demonstration project using mock data
- In a production environment, you would:
  - Set up a real MongoDB database
  - Implement proper authentication and authorization
  - Add WebSocket support for real-time updates
  - Implement a proper data pipeline for image and sensor data

## License

This project is licensed under the MIT License - see the LICENSE file for details.
