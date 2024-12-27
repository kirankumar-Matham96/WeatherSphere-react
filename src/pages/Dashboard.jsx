import React from "react";
import Sidenav from "../components/Sidenav";

const Dashboard = () => {
  return (
    <main className="w-full flex h-screen">
      <nav className="w-1/6 h-full">
        <Sidenav />
      </nav>
      <section className="w-5/6 h-full overflow-auto">
        <h2>Chart</h2>
        <h2>Table</h2>
      </section>
    </main>
  );
};

export default Dashboard;
