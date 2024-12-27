import React from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto h-screen bg-gray-950">
      <section className="h-full flex flex-col-reverse lg:flex-row justify-evenly items-center text-center text-gray-50 md:pt-20 px-4 md:px-12">
        <div className="lg:pt-20 md:pt-12 pt-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
            Weather Sphere
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl mb-4">
            Find the forecast at your place
          </h2>
          <Link to={"/dashboard"}>
            <button className="mt-8 md:mt-12 p-3 md:p-4 bg-gray-700 rounded-md text-lg md:text-xl hover:bg-gray-600 transition-all duration-300">
              Let's Start
            </button>
          </Link>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 h-[20rem] md:h-[30rem] lg:h-[35rem]">
          <Spline scene="https://prod.spline.design/lsfH3y-A3bxST9jO/scene.splinecode" />
        </div>
      </section>
    </div>
  );
};

export default Home;
