import React from "react";
import Sidenav from "../components/Sidenav";
import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { dashboardSelector } from "../redux/dashboardSlice";
import Table from "../components/Table";

const Dashboard = () => {
  const { data } = useSelector(dashboardSelector);
  console.log("🚀 ~ Dashboard ~ data:", data);

  return (
    <main className="w-full flex h-screen">
      <nav className="w-1/6 h-full">
        <Sidenav />
      </nav>
      <section className="w-5/6 h-full overflow-auto">
        {data && <Chart weatherData={data} />}
        {data && <Table weatherData={data} />}
      </section>
    </main>
  );
};

export default Dashboard;
