# Weather Sphere

Weather Sphere is a responsive web application that provides historical weather forecasts based on user-input location and date ranges. It visualizes data in charts and tables with pagination, offering an intuitive user experience.

## Features

- **Search Weather Data**: Fetch weather data using latitude, longitude, and date range.
- **Charts and Graphs**: Display weather trends visually.
- **Paginated Tables**: View detailed weather data with pagination for better accessibility.
- **Caching**: Optimized data caching to reduce redundant API calls.
- **Responsive Design**: Fully responsive across different screen sizes.
- **State Management**: Uses Redux Toolkit for global state management.

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend API**: Open-Meteo API
- **State Management**: Redux Toolkit
- **Chart Library**: Chart.js

## Installation

1. **Clone the Repository:**

```bash
git clone https://github.com/kirankumar-Matham96/WeatherSphere-react.git
```

2. **Navigate to the Project Directory:**

```bash
cd weather-sphere
```

3. **Install Dependencies:**

```bash
npm install
```

4. **Start the Development Server:**

```bash
npm run dev
```

5. **Open in Browser:**

```
http://localhost:5173/
```

## Usage

1. Enter latitude, longitude, start date, and end date in the input form.
2. Click on **Get Data** to fetch weather information.
3. View data in the chart and table format.
4. Use pagination controls to navigate through table rows.
5. Click **Clear** to reset the form.

## Folder Structure

```
weather-sphere/
├── public/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable UI components
│   ├── pages/          # Application pages (Dashboard, Home)
│   ├── redux/          # Redux slices and store
│   ├── App.jsx         # Main application component
│   └── main.jsx        # Entry point
├── .gitignore
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## API Reference

- **Weather Data API**: [Open-Meteo API](https://open-meteo.com/)

## Dependencies

- **React**: JavaScript framework for building UI.
- **Redux Toolkit**: Simplified state management.
- **Chart.js**: For visualizing weather data.
- **Tailwind CSS**: Utility-first CSS framework.
- **Axios**: HTTP client for API calls.
- **React Router**: Navigation and routing.

## Contributing

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Commit changes:

```bash
git commit -m 'Add feature'
```

4. Push to the branch:

```bash
git push origin feature-name
```

5. Create a Pull Request.

## License

This project is licensed under the MIT License.

---

Enjoy using Weather Sphere!
