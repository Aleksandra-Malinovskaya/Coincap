import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAssetById, getAssetHistory } from "../api/api";
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  Button,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMemo, useState } from "react";
import { addAssetinPortfolio } from "../helpers/addAssentInPortfolio";
import { TableInfoCoin } from "../components/TableInfoCoin";
import { CoinGraph } from "../components/CoinGraph";

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

      <TableInfoCoin asset={asset} />

      <CoinGraph historyData={historyData} />

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
