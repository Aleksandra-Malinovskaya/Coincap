import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery } from "@tanstack/react-query";
import { getAssets } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TablePage = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const {
    data: response,
    isPending,
    error,
  } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
    staleTime: 60000,
  });
  const assetsMas = response?.data || [];
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedData = assetsMas?.slice(startIndex, startIndex + itemsPerPage);

  const handleChangePage = (value) => {
    setPage(value);
  };
  const formatNum = (val, decimals = 2) => {
    return parseFloat(val).toFixed(decimals);
  };
  if (isPending)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>Ошибка при загрузке данных: {error.message}</div>;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell>№</TableCell>
              <TableCell></TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">VWAP (24Hr)</TableCell>
              <TableCell align="right">Change (24Hr)</TableCell>
              <TableCell align="right">Market Cap</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((asset) => (
              <TableRow
                key={asset.id}
                hover
                onClick={() => navigate(`/coin/${asset.id}`)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{asset.rank}</TableCell>
                <TableCell>{asset.symbol}</TableCell>
                <TableCell>{asset.id}</TableCell>
                <TableCell align="right">
                  {formatNum(asset.vwap24Hr, 2)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    color:
                      asset.changePercent24Hr < 0
                        ? "error.main"
                        : "success.main",
                  }}
                >
                  {formatNum(asset.changePercent24Hr, 2)}%
                </TableCell>
                <TableCell align="right">
                  {formatNum(asset.marketCapUsd, 1)}
                </TableCell>
                <TableCell align="right">
                  ${formatNum(asset.priceUsd, 2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Открыть модалку для:", asset.id);
                    }}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(assetsMas.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
          variant="outlined"
        />
      </Box>
    </Box>
  );
};

export { TablePage };
