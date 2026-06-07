import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAssetById } from "../api";
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
  Paper,
  Container,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const InfoCoinPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["asset", id],
    queryFn: () => getAssetById(id),
    staleTime: 60000,
  });
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
            {asset.symbol}
          </Typography>
        </Box>
        <Typography variant="h3" sx={{ color: "#2196f3" }}>
          {asset.name}
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
          variant="outlined"
          size="small"
          sx={{ bgcolor: "white", width: 200 }}
        />
        <Button
          variant="contained"
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
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px dashed #ccc",
          mb: 4,
        }}
      >
        <Typography color="text.secondary">
          График истории (используйте библиотеку для визуализации)
        </Typography>
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
