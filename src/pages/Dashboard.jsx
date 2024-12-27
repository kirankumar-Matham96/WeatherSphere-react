/**
 * Dashboard Component
 *
 * This component represents the main dashboard for displaying temperature details. It includes a sidebar navigation
 * (`Sidenav`), a chart displaying the weather data (`Chart`), and a table showing detailed weather data (`Table`).
 * It handles loading states by showing a loading spinner while fetching data.
 *
 * Redux:
 * - Uses `useSelector` to access `data` (weather data) and `loading` state from the Redux store, sourced from `dashboardSelector`.
 *
 * Layout:
 * - The layout consists of two main sections: a sidebar navigation on the left (`Sidenav`), and the main content area on the right.
 * - The content area includes a heading, a chart, and a table.
 *
 * State Management:
 * - The `loading` state determines whether the weather data is still being fetched. If `loading` is `true`, a loading spinner is displayed.
 * - Once the data is available (`loading` is `false`), the `Chart` and `Table` components are rendered with the weather data.
 *
 * Conditional Rendering:
 * - A loading spinner (`Blocks` component from `react-loader-spinner`) is displayed while the `loading` state is `true`.
 * - Once the data is loaded, the `Chart` and `Table` components are rendered to display the weather information.
 *
 * Responsiveness:
 * - The component layout adapts for different screen sizes: on larger screens (`lg`), the sidebar takes up one-sixth of the screen width,
 *   and the main content area takes up the remaining space. On smaller screens, the layout stacks vertically.
 *
 * Usage:
 * - This component is typically used as part of a weather dashboard to display temperature details and trends.
 */

import React from "react";
import Sidenav from "../components/Sidenav";
import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { dashboardSelector } from "../redux/dashboardSlice";
import Table from "../components/Table";
import { Blocks } from "react-loader-spinner";

const Dashboard = () => {
  const { data, loading } = useSelector(dashboardSelector);
  return (
    <main className="w-full flex h-screen flex-col lg:flex-row">
      <nav className="w-full lg:w-1/6 h-auto lg:h-full border-r border-gray-300">
        <Sidenav />
      </nav>

      <section className="w-full lg:w-5/6 h-full lg:overflow-auto flex flex-col items-center p-4 lg:p-8">
        <h2 className="text-xl sm:text-2xl font-semibold text-center my-4">
          Temperature Details
        </h2>

        {loading ? (
          <div className="h-full flex justify-center items-center">
            <Blocks
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </div>
        ) : (
          <div className="w-full max-w-6xl px-4 sm:px-8 pb-8">
            {data && (
              <div className="mb-8">
                <Chart weatherData={data} />
              </div>
            )}

            {data && (
              <div className="overflow-x-auto">
                <Table weatherData={data} />
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
