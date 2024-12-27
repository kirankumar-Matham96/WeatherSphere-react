/**
 * Table Component
 *
 * This component renders a table that displays weather data, such as maximum, minimum, and mean temperatures,
 * along with the apparent temperatures for each day. The data is paginated, with the pagination controls 
 * provided by the `Pagination` component.
 *
 * Props:
 * - weatherData (object): Contains the weather data and units for displaying temperatures.
 *   - data (array): An array of weather data objects, each representing a day's weather.
 *   - units (object): Contains the units for each weather measurement (temperature, apparent temperature).
 *
 * State:
 * - None (this component does not use local state).
 *
 * Redux:
 * - Uses `useSelector` to access the `currentPage` and `rowsPerPage` values from the Redux store, which are used for pagination.
 *
 * Computed Values:
 * - `indexOfLastRow`: The index of the last row to display on the current page, calculated using `currentPage` and `rowsPerPage`.
 * - `indexOfFirstRow`: The index of the first row to display on the current page.
 * - `currentRows`: A subset of the data for the current page, determined by slicing the `data` array based on the page and rows per page.
 *
 * Table Structure:
 * - The table has headers for the following columns: Date, Max Temperature, Min Temperature, Mean Temperature, 
 *   Max Apparent Temperature, Min Apparent Temperature, and Mean Apparent Temperature.
 * - Each data row corresponds to a day, displaying the relevant weather data.
 *
 * Pagination:
 * - The `Pagination` component is used to display pagination controls for navigating between pages of weather data.
 * - The total number of rows is passed as a prop to `Pagination`, which uses it to calculate the total number of pages.
 *
 * Error Handling:
 * - The component assumes that the `data` and `units` passed in as props are correctly formatted.
 *
 * Usage:
 * - This component is typically used to display weather data in a paginated table format within a larger dashboard or weather app.
 */

import { useSelector } from "react-redux";
import { dashboardSelector } from "../redux/dashboardSlice";
import Pagination from "./Pagination";

const Table = ({ weatherData }) => {
  const { data, units } = weatherData;
  const { currentPage, rowsPerPage } = useSelector(dashboardSelector);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data?.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <table className="border-2 border-gray-600 border-solid w-[100%]">
        <thead>
          <tr className="border-2 border-gray-600 border-solid">
            <th className="border-2 border-gray-600 border-solid">Date</th>
            <th className="border-2 border-gray-600 border-solid">
              Max Temperature ({units?.temperature_2m_max})
            </th>
            <th className="border-2 border-gray-600 border-solid">
              Min Temperature ({units?.temperature_2m_min})
            </th>
            <th className="border-2 border-gray-600 border-solid">
              Mean Temperature ({units?.temperature_2m_mean})
            </th>
            <th className="border-2 border-gray-600 border-solid">
              Max Apparent Temperature ({units?.apparent_temperature_max})
            </th>
            <th className="border-2 border-gray-600 border-solid">
              Min Apparent Temperature ({units?.apparent_temperature_min})
            </th>
            <th className="border-2 border-gray-600 border-solid">
              Mean Apparent Temperature ({units?.apparent_temperature_mean})
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows?.map((data) => (
            <tr
              className="text-center border-2 border-gray-500 border-solid"
              key={data?.time}
            >
              <td className="border-2 border-gray-500 border-solid">
                {data?.time}
              </td>
              <td className="border-2 border-gray-500 border-solid">
                {data?.temp2MMax}
              </td>
              <td className="border-2 border-gray-500 border-solid">
                {data?.temp2MMin}
              </td>
              <td className="border-2 border-gray-500 border-solid">
                {data?.temp2MMean}
              </td>
              <td className="border-2 border-gray-500 border-solid">
                {data?.apparentTempMax}
              </td>
              <td className="border-2 border-gray-500 border-solid">
                {data?.apparentTempMin}
              </td>
              <td className="border-2 border-gray-500 border-solid">
                {data?.apparentTempMean}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
        <Pagination totalRows={data?.length || 0} />
      </div>
    </>
  );
};

export default Table;
