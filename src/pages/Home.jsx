/**
 * Home Component
 *
 * This component represents the homepage of the application. It includes a 3D scene rendered using Spline and a call-to-action
 * button that navigates to the dashboard. The page is designed with a clean, centered layout and is fully responsive.
 *
 * Layout:
 * - The layout is divided into two sections: a text section and a 3D scene section.
 * - The text section includes a title, a subtitle, and a button that directs users to the dashboard (`/dashboard` route).
 * - The 3D scene is rendered using the `Spline` component, which displays a visual representation related to the weather theme.
 *
 * Responsiveness:
 * - The page layout is responsive: on larger screens, the content is displayed in a horizontal row (`lg:flex-row`), while on smaller screens, it stacks vertically (`flex-col-reverse`).
 * - The `Spline` scene is displayed with varying sizes based on the screen width, providing an optimal viewing experience across devices.
 *
 * Navigation:
 * - The `Link` component from `react-router-dom` is used to navigate to the `/dashboard` route when the user clicks the "Let's Start" button.
 *
 * Styles:
 * - The page uses Tailwind CSS for styling, with classes for text size, background colors, padding, margin, and responsive layout.
 * - The button has hover effects and smooth transitions for an interactive user experience.
 *
 * Usage:
 * - This component is typically used as the landing page or the entry point to the weather app, inviting users to explore the weather forecast.
 */

import React from "react";
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="mx-auto h-screen bg-gray-800 sm:bg-gray-950">
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
