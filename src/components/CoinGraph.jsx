import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box } from "@mui/material";
const CoinGraph = ({historyData}) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 300,
        display: "flex",
        justifyContent: "center",
        my: 4,
      }}
    >
      <Box
        sx={{
          width: "40%",
          height: 300,
          bgcolor: "#fff",
          p: 2,
          borderRadius: 2,
          minWidth: 0,
          position: "relative",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={historyData || []}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#eee"
            />
            <XAxis
              dataKey="time"
              type="number"
              domain={["dataMin", "dataMax"]}
              tickFormatter={(unixTime) =>
                new Date(unixTime).toLocaleString("ru-RU", {
                  hour: "2-digit",
                })
              }
              minTickGap={30}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              dataKey="priceUsd"
              orientation="left"
              domain={["auto", "auto"]}
              tickFormatter={(value) =>
                `$${parseFloat(value).toLocaleString()}`
              }
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleTimeString()}
              formatter={(value) => [
                `$${parseFloat(value).toFixed(2)}`,
                "Цена",
              ]}
            />
            <Line
              type="monotone"
              dataKey="priceUsd"
              stroke="#2196f3"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};
export { CoinGraph };
