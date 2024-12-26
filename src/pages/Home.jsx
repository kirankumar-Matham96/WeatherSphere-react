import React from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto h-screen bg-gray-950">
      <section className="h-full flex justify-evenly text-center text-gray-50 pt-20">
        <div className="pt-[12rem]">
          <h1 className="text-6xl mb-1">Weather Sphere</h1>
          <h2 className="text-3xl mb-1">Find the forecast at your place</h2>
          <Link to={"/weather"}>
            <button className="mt-20 p-4 bg-gray-700 rounded-md text-xl">
              Let's Start
            </button>
          </Link>
        </div>
        <div className="w-1/2 h-full">
          <Spline scene="https://prod.spline.design/lsfH3y-A3bxST9jO/scene.splinecode" />
        </div>
      </section>
    </div>
  );
};

export default Home;
