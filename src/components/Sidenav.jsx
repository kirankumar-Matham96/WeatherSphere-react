/**
 * Sidenav Component
 *
 * This component renders a sidebar with a form that allows users to input latitude, longitude,
 * and a date range (start and end dates) to fetch weather data. The form includes validation for
 * the latitude, longitude, and date fields, using the Zod library for schema validation.
 *
 * Props:
 * - None (this component does not accept any props).
 *
 * State:
 * - latitude (float): Stores the latitude input value (default is 52.52).
 * - longitude (float): Stores the longitude input value (default is 13.41).
 * - startDate (string): Stores the selected start date in the format YYYY-MM-DD (default is "2024-12-09").
 * - endDate (string): Stores the selected end date in the format YYYY-MM-DD (default is "2024-12-23").
 * - startDateMax (string): The maximum selectable start date, set to the current date.
 * - endDateMin (string): The minimum selectable end date, initially set to the start date.
 * - errors (object or null): Stores validation errors for the form fields, null if no errors.
 *
 * useEffect Hook:
 * - On component mount, triggers the `fetchWeatherData` action with the default values for latitude, longitude, 
 *   start date, and end date.
 *
 * Event Handlers:
 * - handleSubmit: Handles form submission, performs validation, and dispatches `fetchWeatherData` if validation passes.
 * - handleStartDate: Updates the start date and adjusts the minimum end date based on the selected start date.
 * - handleEndDate: Updates the end date and adjusts the maximum start date based on the selected end date.
 * - clearData: Clears all form fields and resets the date constraints.
 *
 * Zod Validation:
 * - The form data is validated using Zod schema, which checks:
 *   - Latitude and longitude are numbers and within valid ranges.
 *   - The start and end dates are required and are formatted correctly.
 *
 * Form:
 * - The form contains input fields for latitude, longitude, start date, and end date.
 * - The latitude and longitude fields are text inputs with required validation.
 * - The start and end date fields are date inputs, with the start date field's maximum date dynamically set to the current date.
 * - On form submission, if validation fails, error messages are displayed.
 *
 * Error Handling:
 * - If any input fields fail validation, an error message is displayed with details about the specific issue(s).
 * - Error messages are shown in a styled container below the form.
 *
 * Usage:
 * - This component is typically used as a sidebar in a weather dashboard where users can input location and date range 
 *   to fetch weather data.
 */
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherData } from "../redux/dashboardSlice";
import { useState, useEffect } from "react";
import { z } from "zod";

const Sidenav = () => {
  const dispatch = useDispatch();

  const schema = z.object({
    latitude: z
      .number({
        invalid_type_error: "Latitude must be a number",
      })
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    longitude: z
      .number({
        invalid_type_error: "Longitude must be a number",
      })
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "Start date is required"),
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [latitude, setLatitude] = useState(52.52);
  const [longitude, setLongitude] = useState(13.41);
  const [startDate, setStartDate] = useState("2024-12-09");
  const [endDate, setEndDate] = useState("2024-12-23");
  const [startDateMax, setStartDateMax] = useState(formatDate(new Date()));
  const [endDateMin, setEndDateMin] = useState("2024-12-09");

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    dispatch(fetchWeatherData({ latitude, longitude, startDate, endDate }));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    const formData = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      startDate,
      endDate,
    };
    const validationResult = schema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(validationResult.error.format());
      return;
    } else {
      setErrors(null);
    }

    dispatch(fetchWeatherData(formData));
  };

  const handleStartDate = (date) => {
    setStartDate(date);
    setEndDateMin(date);
  };

  const handleEndDate = (date) => {
    setEndDate(date);
    setStartDateMax(date);
  };

  const clearData = () => {
    setLatitude("");
    setLongitude("");
    setStartDate("");
    setEndDate("");
    setStartDateMax(formatDate(new Date()));
    setEndDateMin("2022-06-12");
  };

  return (
    <div className="bg-gray-400 w-full h-full flex flex-col p-4 md:p-8">
      <h1 className="mt-6 text-2xl md:text-[2.5rem] font-semibold drop-shadow-2xl text-black text-center">
        Dashboard
      </h1>

      <form
        className="flex flex-col justify-start items-center w-full pt-4 md:pt-8 lg:pt-12"
        onSubmit={handleSubmit}
      >
        <label htmlFor="latitude" className="w-full text-black">
          Latitude:
          <input
            className="rounded-md bg-gray-50 text-gray-800 outline-none p-2 my-2 w-full"
            type="text"
            required
            id="latitude"
            value={latitude}
            placeholder="Latitude"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>

        <label htmlFor="longitude" className="w-full text-black">
          Longitude:
          <input
            className="rounded-md bg-gray-50 text-gray-800 outline-none p-2 my-2 w-full"
            required
            id="longitude"
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>

        <label htmlFor="startDate" className="w-full text-black">
          Start Date:
          <input
            className="rounded-md bg-gray-50 text-gray-800 outline-none p-2 my-2 w-full"
            required
            id="startDate"
            type="date"
            min={"2022-06-12"}
            max={startDateMax}
            value={startDate}
            onChange={(e) => handleStartDate(e.target.value)}
          />
        </label>

        <label htmlFor="endDate" className="w-full text-black">
          End Date:
          <input
            className="rounded-md bg-gray-50 text-gray-800 outline-none p-2 my-2 w-full"
            required
            id="endDate"
            type="date"
            min={endDateMin}
            max={formatDate(new Date())}
            value={endDate}
            onChange={(e) => handleEndDate(e.target.value)}
          />
        </label>

        <div className="w-full flex justify-between mt-4">
          <button
            className="text-lg md:text-xl border-0 rounded-md p-3 bg-orange-600 text-green-50 hover:bg-orange-700 transition-all"
            type="button"
            onClick={clearData}
          >
            Clear
          </button>
          <button
            className="text-lg md:text-xl border-0 rounded-md p-3 bg-green-600 text-red-50 hover:bg-green-700 transition-all"
            type="submit"
          >
            Get Data
          </button>
        </div>
      </form>

      {(errors?.latitude ||
        errors?.longitude ||
        errors?.startDate ||
        errors?.endDate) && (
        <div className="text-red-500 bg-white mt-8 rounded-md py-4 px-4 sm:px-6 lg:px-8">
          <h3 className="font-semibold text-lg">Input Error:</h3>
          <ul className="list-disc pl-5 text-sm sm:text-base">
            {errors?.latitude && <li>{errors.latitude._errors[0]}</li>}
            {errors?.longitude && <li>{errors.longitude._errors[0]}</li>}
            {errors?.startDate && <li>{errors.startDate._errors[0]}</li>}
            {errors?.endDate && <li>{errors.endDate._errors[0]}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
export default Sidenav;
