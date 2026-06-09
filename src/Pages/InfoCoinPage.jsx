import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAssetById, getAssetHistory } from "../api";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { addAssetinPortfolio } from "../addAssentInPortfolio";

const InfoCoinPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState("");
  const { id } = useParams();
  const { start, end } = useMemo(() => {
    const now = Date.now();
    return {
      end: now,
      start: now - 10 * 60 * 60 * 1000,
    };
  }, [id]);

  const { data: response } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => getAssetById(id),
    staleTime: 60000,
  });

  const {
    data: history,
    isPending,
    error,
  } = useQuery({
    queryKey: ["assetHistory", id, "h2", start, end],
    queryFn: () => getAssetHistory(id, "h2", start, end),
    staleTime: 60000,
  });
  const historyData = history?.data;

  const asset = response?.data[0];
  const formatNum = (val, dec = 2) =>
    parseFloat(val).toLocaleString(undefined, {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  if (isPending)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Ошибка при загрузке данных: {error.message}</div>;
  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <Box
          sx={{
            border: "3px solid #2196f3",
            px: 2,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#2196f3", fontWeight: "bold" }}
          >
            {asset?.symbol}
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ color: "#2196f3" }}>
          {asset.id}
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "#f5f5f5",
          p: 3,
          borderRadius: 4,
          textAlign: "center",
          mb: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h6">Введите количество:</Typography>
        <TextField
          value={count}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d*\.?\d*$/.test(value)) {
              setCount(value);
            }
          }}
          variant="outlined"
          size="small"
          sx={{ bgcolor: "white", width: 200 }}
        />
        <Button
          variant="contained"
          onClick={() => {
            addAssetinPortfolio(asset, count);
            setCount("");
          }}
          sx={{
            bgcolor: "#e0e0e0",
            color: "black",
            "&:hover": { bgcolor: "#d0d0d0" },
          }}
        >
          Купить
        </Button>
      </Box>

      <Table sx={{ mb: 4 }}>
        <TableBody>
          <TableRow sx={{ bgcolor: "#fafafa" }}>
            <TableCell sx={{ fontWeight: "bold" }}>Информация</TableCell>
            <TableCell align="right" sx={{ fontWeight: "bold" }}>
              Данные о валюте
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Цена</TableCell>
            <TableCell align="right">{formatNum(asset.priceUsd)} $</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Доступное предложение для торговли</TableCell>
            <TableCell align="right">
              {formatNum(asset.supply / 1000000, 1)} млн
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Общее кол-во выпущенных активов</TableCell>
            <TableCell align="right">
              {formatNum(asset.maxSupply / 1000000, 1)} млн
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Объем торгов за последние 24 часа</TableCell>
            <TableCell align="right">
              {formatNum(asset.volumeUsd24Hr / 1000000000, 1)} млрд
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              Процентное изменения цены за последние 24 часа
            </TableCell>
            <TableCell
              align="right"
              sx={{
                color:
                  asset.changePercent24Hr < 0 ? "error.main" : "success.main",
              }}
            >
              {formatNum(asset.changePercent24Hr)} %
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Сайт</TableCell>
            <TableCell align="right">{asset.explorer}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

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

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "#fce4ec",
            color: "#2196f3",
            borderRadius: 10,
            px: 4,
            bgcolor: "rgba(33, 150, 243, 0.1)",
            "&:hover": { bgcolor: "rgba(33, 150, 243, 0.2)" },
          }}
        >
          Назад
        </Button>
      </Box>
    </Container>
  );
};

export { InfoCoinPage };
