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
