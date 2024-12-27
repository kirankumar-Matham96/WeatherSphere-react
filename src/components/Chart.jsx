/**
 * Chart Component
 * 
 * This component renders a responsive line chart that visualizes weather data, 
 * including apparent and regular temperature values over time. The chart uses 
 * the recharts library to display multiple lines for different temperature metrics 
 * and custom tooltips to provide detailed information when hovering over the chart.
 *
 * Props:
 * - weatherData (object): The weather data to be visualized, containing:
 *   - data (array): An array of objects with weather data, where each object includes
 *     time, apparent temperature (max, min, mean), and regular temperature (max, min, mean).
 *   - units (object): An object containing the units for each temperature metric.
 *
 * Custom Tooltip:
 * - Displays detailed temperature values for each metric (max, min, mean) when hovering over the chart.
 * - Shows the date (label) and values for the apparent and regular temperatures with corresponding units.
 *
 * Lines:
 * - Each line represents a different temperature metric: apparentTempMax, apparentTempMin, 
 *   apparentTempMean, temp2MMax, temp2MMin, temp2MMean.
 * - Each line is styled with a unique color and has an active dot to indicate the point of focus.
 * - Each line also has a label positioned at the top of the line for better visibility.
 *
 * Responsive Container:
 * - The chart is wrapped in a `ResponsiveContainer` to make it adapt to different screen sizes.
 *
 * Usage:
 * - The chart is rendered inside a `ResponsiveContainer` component that adjusts the width and height 
 *   based on the container's size.
 * - The X-axis represents the time, and the Y-axis represents the temperature values.
 * - The tooltip displays detailed information about each point on hover, showing maximum, 
 *   minimum, and mean values for both apparent and regular temperatures.
 */
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList,
  } from "recharts";
  const Chart = ({ weatherData }) => {
    const { data, units } = weatherData;

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip bg-lime-50 p-1">
            <p className="label text-[red]">Date: {label}</p>
            <p className="desc text-[#003f5c]">
              Max Apparent Temperature (2m): {payload[0]?.value}{" "}
              {units?.apparent_temperature_max}
            </p>
            <p className="desc text-[#ff6361]">
              Min Apparent Temperature (2m): {payload[1]?.value}{" "}
              {units?.apparent_temperature_min}
            </p>
            <p className="desc text-[#58508d]">
              Mean Apparent Temperature (2m): {payload[2]?.value}{" "}
              {units?.apparent_temperature_mean}
            </p>
            <p className="desc text-[#ff8c00]">
              Max Temperature: {payload[3]?.value} {units?.temperature_2m_max}
            </p>
            <p className="desc text-[#bc5090]">
              Min Temperature: {payload[4]?.value} {units?.temperature_2m_min}
            </p>
            <p className="desc text-[#395c1d]">
              Mean Temperature: {payload[5]?.value} {units?.temperature_2m_mean}
            </p>
          </div>
        );
      }
  
      return null;
    };
  
    return (
      <ResponsiveContainer
        width={"100%"}
        height={410}
        className="mb-16 border-2 border-solid border-gray-500"
      >
        <LineChart data={data} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 30, right: 30 }}>
            <LabelList position="bottom" />
          </XAxis>
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="apparentTempMax"
            stroke="#003f5c"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
          <Line
            type="monotone"
            dataKey="apparentTempMin"
            stroke="#ff6361"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
          <Line
            type="monotone"
            dataKey="apparentTempMean"
            stroke="#58508d"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
          <Line
            type="monotone"
            dataKey="temp2MMax"
            stroke="#ff8c00"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
          <Line
            type="monotone"
            dataKey="temp2MMin"
            stroke="#bc5090"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
          <Line
            type="monotone"
            dataKey="temp2MMean"
            stroke="#395c1d"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    );
  };
  export default Chart;