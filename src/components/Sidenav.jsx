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

    dispatch(fetchWeatherData({ latitude, longitude, startDate, endDate }));
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
    <div className="bg-gray-400 w-full h-full flex flex-col p-2 ">
      <h1 className="mt-6 md:text-[2.5rem] font-semibold drop-shadow-2xl text-black">
        Dashboard
      </h1>
      <form
        className=" flex flex-col justify-start items-center w-full pt-32"
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
        <div className="w-full flex justify-between mt-2">
          <button
            className="text-xl border-0 rounded-md p-3 bg-orange-600 text-green-50"
            type="button"
            onClick={clearData}
          >
            Clear
          </button>
          <button
            className="text-xl border-0 rounded-md p-3 bg-green-600 text-red-50"
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
        <div className="text-red-500 bg-white mt-8 rounded-md py-4 px-2">
          <h3>Input Error:</h3>
          <ul className="list-disc ps-5">
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
