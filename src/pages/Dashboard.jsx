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
    <main className="w-full flex h-screen">
      <nav className="w-1/6 h-full">
        <Sidenav />
      </nav>
      <section className="w-5/6 h-full overflow-auto flex flex-col items-center ">
        <h2 className="text-2xl font-semibold text-center my-4">
          Temperature Details
        </h2>
        {loading ? (
          <div className="h-full flex justify-center mt-[20rem]">
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
          <div className="px-16 pb-8">
            {data && <Chart weatherData={data} />}
            {data && <Table weatherData={data} />}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
